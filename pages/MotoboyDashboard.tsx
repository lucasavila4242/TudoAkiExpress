
import React, { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { User, Order } from '../types';
import { Bike, MapPin, Navigation, Camera, CheckCircle2, User as UserIcon, LogOut, Loader2, Share2, Clock, BellRing, Volume2 } from 'lucide-react';
import { db } from '../firebase';
import { doc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';

declare const L: any; // Leaflet Global

const MotoboyDashboard = ({ user, orders, logout }: { user: User | null, orders: Order[], logout: () => void }) => {
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  
  // Referência para controlar o som de notificação
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Referência para rastrear o tamanho anterior da fila e detectar novos pedidos
  const prevQueueLength = useRef<number>(0);

  // Filtra apenas pedidos que estão "Em Rota" (Shipped) mas que ainda não foram assumidos localmente pelo app
  const deliveryQueue = orders.filter(o => o.status === 'shipped');

  // SEGURANÇA
  if (!user || !user.isCourier) {
    return <Navigate to="/" />;
  }

  // --- SISTEMA DE NOTIFICAÇÃO SONORA E PUSH ---
  
  // 1. Inicializa o Audio e pede permissão
  useEffect(() => {
    // Cria o elemento de áudio (Som de notificação curto e alto)
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    
    // Tenta pedir permissão de notificação logo ao carregar
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        setNotificationsEnabled(true);
      }
    }
    
    // Seta o tamanho inicial da fila para não apitar no refresh
    prevQueueLength.current = deliveryQueue.length;
  }, []);

  // 2. Função para ativar notificações manualmente (necessário para desbloquear áudio no navegador)
  const enableNotifications = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          setNotificationsEnabled(true);
          // Toca um som de teste baixo para desbloquear o AudioContext do navegador
          if (audioRef.current) {
            audioRef.current.volume = 0.5;
            audioRef.current.play().catch(e => console.log("Audio play blocked", e));
          }
        }
      });
    }
  };

  // 3. Monitora a fila de entregas
  useEffect(() => {
    // Se o número de pedidos na fila aumentou
    if (deliveryQueue.length > prevQueueLength.current) {
      triggerNewOrderAlert();
    }
    prevQueueLength.current = deliveryQueue.length;
  }, [deliveryQueue.length]);

  const triggerNewOrderAlert = () => {
    // A. Toca o Som
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 1.0;
      audioRef.current.play().catch(e => console.error("Erro ao tocar som:", e));
    }

    // B. Vibra o celular (200ms vibra, 100ms pausa, 200ms vibra)
    if (navigator.vibrate) {
      navigator.vibrate([500, 200, 500]);
    }

    // C. Notificação do Sistema (Aparece mesmo fora do navegador)
    if (Notification.permission === "granted") {
      new Notification("📦 Nova Entrega Disponível!", {
        body: "Um novo pedido acabou de entrar na fila. Toque para ver.",
        icon: "/favicon.ico", // Ícone opcional
      });
    }
  };

  // --- FIM DO SISTEMA DE NOTIFICAÇÃO ---

  // Lógica de GPS (Tracker) - Inicia quando há uma ordem ativa
  useEffect(() => {
    if (activeOrder) {
      if (!navigator.geolocation) {
        alert("Seu navegador não suporta geolocalização. O rastreamento não funcionará.");
        return;
      }

      console.log("Iniciando rastreamento GPS para ordem:", activeOrder.id);

      const id = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, heading, speed } = position.coords;
          
          // 1. Atualiza estado local para o Mapa do Motoboy
          setCurrentLocation({ lat: latitude, lng: longitude });

          // 2. Atualiza no Firebase para o Cliente/Admin
          const locationRef = doc(db, "tracking", activeOrder.id);
          
          setDoc(locationRef, {
             lat: latitude,
             lng: longitude,
             heading: heading || 0,
             speed: speed || 0,
             timestamp: Date.now(),
             orderId: activeOrder.id,
             courierName: user.name
          }, { merge: true }).catch(err => console.error("Erro ao enviar GPS:", err));
        },
        (error) => console.error("Erro GPS:", error),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
      setWatchId(id);
    } else {
      // Se não tem ordem ativa, para o GPS
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        setWatchId(null);
      }
      setCurrentLocation(null);
    }

    return () => {
        if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    };
  }, [activeOrder?.id]);

  // Inicialização e Atualização do Mapa do Motoboy
  useEffect(() => {
    // 1. Limpeza se não houver ordem ativa
    if (!activeOrder) {
        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
            markerRef.current = null;
        }
        return;
    }

    const container = document.getElementById('motoboy-map');

    // 2. Inicializa o mapa (com proteção contra reinicialização)
    if (activeOrder && !mapRef.current && container) {
        // CORREÇÃO CRÍTICA: Verifica se o Leaflet já marcou este container
        // Isso previne a tela branca/crash ao sair e voltar da página
        const containerAny = container as any;
        if (containerAny._leaflet_id) {
            containerAny._leaflet_id = null; // Reseta o ID do leaflet para permitir nova montagem
        }

        try {
          mapRef.current = L.map('motoboy-map', { 
            zoomControl: false, 
            attributionControl: false 
          }).setView([-24.9555, -53.4552], 15);
          
          L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
              maxZoom: 20
          }).addTo(mapRef.current);
        } catch (e) {
          console.error("Erro ao iniciar mapa:", e);
        }
    }

    // 3. Atualiza marcador
    if (activeOrder && currentLocation && mapRef.current) {
        const latLng = [currentLocation.lat, currentLocation.lng];

        // Mesmo ícone do cliente para consistência
        const motoIcon = L.divIcon({
            html: `<div style="background-color: #ef4444; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 3px solid white;">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>
                   </div>`,
            className: 'custom-div-icon',
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });

        if (markerRef.current) {
            markerRef.current.setLatLng(latLng);
        } else {
            markerRef.current = L.marker(latLng, { icon: motoIcon }).addTo(mapRef.current);
        }

        mapRef.current.setView(latLng, 17, { animate: true });
    }

    // Cleanup function para quando o componente desmontar (sair da tela)
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, [activeOrder, currentLocation]);


  const handleStartDelivery = async (order: Order) => {
    if (window.confirm(`Iniciar rota para ${order.address}? Isso registrará o horário de saída.`)) {
        setActiveOrder(order);
        
        // Atualiza o horário de saída no Firebase para métricas
        try {
            const orderRef = doc(db, "orders", order.id);
            await updateDoc(orderRef, {
                shippedAt: new Date().toISOString()
            });
        } catch (e) {
            console.error("Erro ao registrar inicio da rota:", e);
        }
    }
  };

  const handleCopyTrackingLink = () => {
      if(!activeOrder) return;
      const link = `${window.location.origin}/#/track/${activeOrder.id}`;
      navigator.clipboard.writeText(link);
      alert("Link de rastreio copiado! Compartilhe com o cliente.");
  }

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 800;
            const scaleSize = MAX_WIDTH / img.width;
            canvas.width = MAX_WIDTH;
            canvas.height = img.height * scaleSize;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
            setPhotoPreview(compressedBase64);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const finalizeDelivery = async () => {
    if (!activeOrder || !photoPreview || !recipientName) {
        alert("Preencha o nome e tire a foto para comprovar.");
        return;
    }

    setIsSubmitting(true);

    try {
        const orderRef = doc(db, "orders", activeOrder.id);
        
        await updateDoc(orderRef, {
            status: 'delivered',
            deliveryProof: {
                recipientName,
                photo: photoPreview,
                timestamp: new Date().toISOString()
            }
        });

        if (watchId !== null) navigator.geolocation.clearWatch(watchId);
        
        setActiveOrder(null);
        setShowDeliveryModal(false);
        setPhotoPreview(null);
        setRecipientName('');
        alert("Entrega Finalizada com Sucesso! 🚀");
    } catch (e) {
        console.error("Erro ao finalizar:", e);
        alert("Erro ao salvar. Tente novamente.");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20 font-sans">
      {/* Header Fixo */}
      <div className="bg-slate-800 p-6 shadow-lg flex justify-between items-center sticky top-0 z-50 border-b border-slate-700">
        <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-2 rounded-full animate-pulse">
                <Bike className="text-white" size={24} />
            </div>
            <div>
                <h1 className="font-black text-xl leading-none">TudoAki Moto</h1>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Painel Logístico</p>
            </div>
        </div>
        <div className="flex items-center gap-2">
           {!notificationsEnabled && (
             <button onClick={enableNotifications} className="bg-blue-500/20 text-blue-400 p-2 rounded-xl hover:bg-blue-500 hover:text-white transition-colors animate-pulse">
               <BellRing size={20} />
             </button>
           )}
           <button onClick={logout} className="bg-red-500/20 text-red-400 p-2 rounded-xl hover:bg-red-500 hover:text-white transition-colors">
              <LogOut size={20} />
           </button>
        </div>
      </div>
      
      {/* Botão de Aviso de Som */}
      {!notificationsEnabled && (
        <div onClick={enableNotifications} className="bg-blue-600 text-white text-xs font-bold p-3 text-center cursor-pointer hover:bg-blue-700 transition-colors">
          ⚠️ Toque aqui para ativar o SOM de alerta de novos pedidos
        </div>
      )}

      <div className="p-4 space-y-6 max-w-lg mx-auto">
        {/* Painel de Rota Ativa */}
        {activeOrder ? (
             <div className="bg-emerald-600 rounded-[2.5rem] p-6 shadow-2xl relative overflow-hidden animate-in slide-in-from-top duration-500 ring-4 ring-emerald-500/30">
                <div className="relative z-10">
                    <div className="flex justify-between items-center mb-6">
                         <div className="flex items-center gap-2">
                             <span className="bg-white/20 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse flex items-center gap-2">
                                <div className="w-2 h-2 bg-white rounded-full" /> GPS On
                            </span>
                         </div>
                         <button onClick={handleCopyTrackingLink} className="bg-white text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-emerald-50 transition-colors shadow-sm">
                            <Share2 size={14} /> Link Cliente
                        </button>
                    </div>

                    {/* MAPA DO MOTOBOY (Maior e com bordas corrigidas) */}
                    <div id="motoboy-map" className="w-full h-80 bg-emerald-800/50 rounded-[2rem] mb-6 border-4 border-emerald-500/30 shadow-inner relative overflow-hidden z-0">
                        {!currentLocation && (
                            <div className="absolute inset-0 flex items-center justify-center text-emerald-100/50">
                                <Loader2 className="animate-spin mr-2" /> Buscando sinal...
                            </div>
                        )}
                    </div>

                    <h2 className="text-3xl font-black mt-2 mb-1 leading-none">Em Rota</h2>
                    <p className="text-emerald-200 text-sm font-bold uppercase tracking-wide mb-4">Pedido #{activeOrder.id}</p>
                    
                    <div className="bg-black/20 rounded-2xl p-4 mb-4 backdrop-blur-sm">
                        <p className="text-emerald-100 text-xs font-black uppercase mb-1">Destino</p>
                        <p className="text-white font-bold text-lg leading-tight flex items-start gap-2">
                            <MapPin className="shrink-0 mt-1" size={16} /> 
                            {activeOrder.address}
                        </p>
                    </div>
                    
                    <button 
                        onClick={() => setShowDeliveryModal(true)}
                        className="w-full bg-white text-emerald-700 py-4 rounded-xl font-black text-lg shadow-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        <CheckCircle2 size={24} /> FINALIZAR ENTREGA
                    </button>
                    
                    <button 
                         onClick={() => {
                            if(window.confirm("Cancelar rota atual? O GPS será desligado.")) {
                                setActiveOrder(null);
                            }
                         }}
                         className="w-full mt-4 text-emerald-200 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
                    >
                        Cancelar / Ocorrência
                    </button>
                </div>
             </div>
        ) : (
            <div className="bg-slate-800 rounded-[2rem] p-8 text-center border border-slate-700 shadow-xl">
                <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
                    <Navigation size={32} />
                </div>
                <h2 className="text-xl font-black text-slate-200">Aguardando Rotas</h2>
                <p className="text-slate-400 text-sm mt-2 max-w-xs mx-auto">Selecione um pedido da fila abaixo para iniciar o GPS e a entrega.</p>
            </div>
        )}

        {/* Fila de Pedidos */}
        <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between px-2">
                <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest">Fila de Entrega ({deliveryQueue.length})</h3>
                <span className="text-[10px] font-bold bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Cascavel</span>
            </div>
            
            {deliveryQueue.length === 0 ? (
                <div className="text-center py-12 opacity-30 border-2 border-dashed border-slate-700 rounded-3xl">
                    <Bike size={48} className="mx-auto mb-4" />
                    <p className="font-bold">Nenhuma entrega disponível.</p>
                </div>
            ) : (
                deliveryQueue.map(order => (
                    <div key={order.id} className={`bg-white text-slate-900 p-6 rounded-[2rem] shadow-lg border-l-8 transition-all ${activeOrder?.id === order.id ? 'border-emerald-500 opacity-50 pointer-events-none scale-95 grayscale' : 'border-blue-500 hover:scale-[1.02]'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-slate-100 px-3 py-1 rounded-lg text-xs font-black tracking-wide text-slate-600">#{order.id}</span>
                            <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                                <Clock size={12} />
                                {new Date(order.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                        </div>
                        
                        <div className="flex items-start gap-3 mb-5">
                            <MapPin className="text-red-500 shrink-0 mt-1 fill-red-100" size={20} />
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">Entregar em</p>
                                <p className="font-black text-xl leading-tight text-slate-800">{order.address}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mb-5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <div className="bg-white p-2 rounded-lg shadow-sm"><UserIcon size={16} className="text-slate-400" /></div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-slate-400">Detalhes</p>
                                <span className="text-sm font-bold text-slate-700">{order.items.length} volumes • {order.paymentMethod.toUpperCase()}</span>
                            </div>
                        </div>
                        
                        {!activeOrder && (
                            <button 
                                onClick={() => handleStartDelivery(order)}
                                className="w-full bg-blue-600 text-white py-4 rounded-xl font-black uppercase tracking-wide hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
                            >
                                <Navigation size={20} /> INICIAR ROTA
                            </button>
                        )}
                    </div>
                ))
            )}
        </div>
      </div>

      {/* Modal de Finalização (Full Screen Mobile) */}
      {showDeliveryModal && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white text-slate-900 w-full sm:max-w-md rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto">
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
                <h2 className="text-2xl font-black text-blue-900 mb-1">Confirmar Entrega</h2>
                <p className="text-sm text-gray-500 mb-8 font-medium">Preencha os dados para liberar o pedido.</p>
                
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-black uppercase text-gray-400 mb-2 ml-1">Quem recebeu?</label>
                        <input 
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            className="w-full bg-gray-100 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl p-4 font-bold text-lg outline-none transition-all placeholder:font-medium"
                            placeholder="Nome do recebedor"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase text-gray-400 mb-2 ml-1">Foto do Local / Pacote</label>
                        <label className={`block w-full aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden group ${photoPreview ? 'border-emerald-500 bg-white' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}>
                            {photoPreview ? (
                                <img src={photoPreview} className="absolute inset-0 w-full h-full object-cover" />
                            ) : (
                                <div className="text-center p-4">
                                    <div className="bg-white p-3 rounded-full shadow-sm inline-block mb-2 group-hover:scale-110 transition-transform"><Camera size={24} className="text-blue-500" /></div>
                                    <p className="text-xs font-bold text-gray-500">Toque para abrir a câmera</p>
                                </div>
                            )}
                            <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handlePhotoCapture} />
                        </label>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button 
                            onClick={() => setShowDeliveryModal(false)}
                            className="flex-1 py-4 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            Voltar
                        </button>
                        <button 
                            onClick={finalizeDelivery}
                            disabled={isSubmitting || !photoPreview || !recipientName}
                            className="flex-1 py-4 rounded-xl font-black text-white bg-emerald-500 shadow-lg shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all active:scale-95"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" /> : 'FINALIZAR'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default MotoboyDashboard;
