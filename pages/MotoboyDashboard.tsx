
import React, { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { User, Order } from '../types';
import { Bike, MapPin, Navigation, Camera, CheckCircle2, User as UserIcon, LogOut, Loader2, Share2, Clock, BellRing, Volume2, RefreshCw, XCircle, Play } from 'lucide-react';
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
  const [gpsError, setGpsError] = useState<string | null>(null);
  
  // Estados de Notificação
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [isRinging, setIsRinging] = useState(false);

  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prevQueueLength = useRef<number>(0);

  // Filtra pedidos disponíveis (Shipped = Disponível para Motoboy nesta lógica, ou Pending se for lógica direta)
  // Assumindo: status 'shipped' significa "Pronto para coleta/Em rota" mas ainda não assumido por este motoboy especificamente (a menos que já tenha courierId)
  const deliveryQueue = orders.filter(o => o.status === 'shipped');

  // SEGURANÇA
  if (!user || !user.isCourier) {
    return <Navigate to="/" />;
  }

  // --- SISTEMA DE ALERTA ---

  useEffect(() => {
    // Som de sirene/alerta persistente
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audioRef.current.loop = true; // IMPORTANTE: Toca em loop até atender

    // Verifica permissão inicial
    if ("Notification" in window && Notification.permission === "granted") {
      // Apenas marca visualmente, o som precisa de clique do usuário
    }
    
    // Seta tamanho inicial
    prevQueueLength.current = deliveryQueue.length;

    return () => {
        if(audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
    }
  }, []);

  // Monitora novos pedidos
  useEffect(() => {
    // Se a fila aumentou E o som está habilitado (plantão ativo)
    if (deliveryQueue.length > prevQueueLength.current && isSoundEnabled) {
      startRinging();
    }
    prevQueueLength.current = deliveryQueue.length;
  }, [deliveryQueue.length, isSoundEnabled]);

  const startRinging = () => {
    setIsRinging(true);
    
    // 1. Toca o Som em Loop
    if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 1.0;
        audioRef.current.play().catch(e => console.error("Audio blocked:", e));
    }

    // 2. Vibração Insistente
    if (navigator.vibrate) {
        // Vibra 1s, para 0.5s, repete (navegadores limitam o tempo total, então o loop ajuda)
        navigator.vibrate([1000, 500, 1000, 500, 1000]); 
    }

    // 3. Notificação Push
    if ("Notification" in window && Notification.permission === "granted") {
        try {
            navigator.serviceWorker.getRegistration().then(reg => {
                if (reg) {
                    reg.showNotification("🔥 NOVA ENTREGA DISPONÍVEL!", {
                        body: "Toque para aceitar a corrida.",
                        icon: "/favicon.ico",
                        vibrate: [1000, 500, 1000],
                        tag: 'new-order'
                    } as any);
                } else {
                     new Notification("🔥 NOVA ENTREGA DISPONÍVEL!");
                }
            });
        } catch (e) { console.log(e); }
    }
  };

  const stopRinging = () => {
    setIsRinging(false);
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }
    if (navigator.vibrate) navigator.vibrate(0);
  };

  const enableDutyMode = () => {
    // Pede permissão de notificação
    if ("Notification" in window) {
        Notification.requestPermission();
    }
    
    // Toca um som mudo/curto para desbloquear o AudioContext do navegador
    if (audioRef.current) {
        const dummyPlay = audioRef.current.play();
        if (dummyPlay !== undefined) {
            dummyPlay.then(() => {
                audioRef.current?.pause();
                setIsSoundEnabled(true);
            }).catch(error => {
                console.error("Autoplay prevent", error);
                alert("Por favor, habilite o som nas configurações do site.");
            });
        }
    }
  };

  // --- FIM DO SISTEMA DE ALERTA ---

  // Lógica de GPS (Tracker) - Inicia quando há uma ordem ativa
  useEffect(() => {
    if (activeOrder) {
      if (!navigator.geolocation) {
        setGpsError("GPS não suportado neste navegador.");
        return;
      }

      console.log("Iniciando rastreamento GPS para ordem:", activeOrder.id);
      setGpsError(null);

      const id = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, heading, speed } = position.coords;
          
          setCurrentLocation({ lat: latitude, lng: longitude });
          setGpsError(null);

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
        (error) => {
            console.error("Erro GPS:", error);
            setGpsError("Sinal GPS fraco ou bloqueado.");
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0
        }
      );
      setWatchId(id);
    } else {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        setWatchId(null);
      }
      setCurrentLocation(null);
      setGpsError(null);
    }

    return () => {
        if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    };
  }, [activeOrder?.id]);

  // Inicialização do Mapa
  useEffect(() => {
    if (!activeOrder) return;

    const timer = setTimeout(() => {
        const container = document.getElementById('motoboy-map');
        if (!container) return;

        if (mapRef.current) {
            mapRef.current.invalidateSize();
            return;
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
    }, 100);

    return () => clearTimeout(timer);
  }, [activeOrder]);

  useEffect(() => {
      return () => {
        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
            markerRef.current = null;
        }
      }
  }, []);

  // Atualização do Marcador
  useEffect(() => {
    if (!activeOrder || !currentLocation || !mapRef.current) return;

    const latLng = [currentLocation.lat, currentLocation.lng];

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

    mapRef.current.panTo(latLng, { animate: true });

  }, [currentLocation]);


  const handleStartDelivery = async (order: Order) => {
    stopRinging(); // Para o som se estiver tocando
    if (window.confirm(`Iniciar rota para ${order.address}? Isso registrará o horário de saída.`)) {
        setActiveOrder(order);
        
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
            const MAX_WIDTH = 600; 
            const scaleSize = MAX_WIDTH / img.width;
            canvas.width = MAX_WIDTH;
            canvas.height = img.height * scaleSize;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.5);
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
    } catch (e: any) {
        console.error("Erro ao finalizar:", e);
        alert("Erro ao finalizar. Tente novamente.");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-slate-900 text-white pb-20 font-sans relative">
      
      {/* ALERTA DE NOVO PEDIDO (TELA CHEIA) */}
      {isRinging && (
        <div className="fixed inset-0 z-[200] bg-red-600 flex flex-col items-center justify-center p-8 animate-pulse text-center" onClick={stopRinging}>
            <div className="bg-white p-6 rounded-full mb-8 shadow-2xl animate-bounce">
                <BellRing className="w-20 h-20 text-red-600" />
            </div>
            <h1 className="text-4xl font-black text-white mb-4">NOVO PEDIDO!</h1>
            <p className="text-xl text-red-100 font-bold mb-12">Toque na tela para aceitar</p>
            <button onClick={stopRinging} className="bg-white text-red-600 px-12 py-6 rounded-3xl font-black text-2xl shadow-xl active:scale-95 transition-transform">
                VER AGORA
            </button>
        </div>
      )}

      {/* Header Fixo */}
      <div className="bg-slate-800 p-6 shadow-lg flex justify-between items-center sticky top-0 z-50 border-b border-slate-700">
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${isSoundEnabled ? 'bg-emerald-500' : 'bg-gray-600'}`}>
                <Bike className="text-white" size={24} />
            </div>
            <div>
                <h1 className="font-black text-xl leading-none">TudoAki Moto</h1>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Painel Logístico</p>
            </div>
        </div>
        <div className="flex items-center gap-2">
           <button onClick={logout} className="bg-red-500/20 text-red-400 p-2 rounded-xl hover:bg-red-500 hover:text-white transition-colors">
              <LogOut size={20} />
           </button>
        </div>
      </div>
      
      {/* Botão de Plantão (Ativar Som) */}
      {!isSoundEnabled && (
        <div className="p-4">
            <button onClick={enableDutyMode} className="w-full bg-blue-600 hover:bg-blue-500 text-white p-6 rounded-3xl shadow-xl flex items-center justify-center gap-4 group transition-all">
                <div className="bg-white/20 p-4 rounded-full group-hover:scale-110 transition-transform">
                    <Play size={32} className="fill-white" />
                </div>
                <div className="text-left">
                    <h2 className="text-xl font-black uppercase">Entrar em Plantão</h2>
                    <p className="text-sm text-blue-100">Toque para ativar o som de chamados</p>
                </div>
            </button>
        </div>
      )}

      {isSoundEnabled && !activeOrder && (
          <div className="px-4 py-2">
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-xl text-center text-xs font-bold uppercase tracking-widest animate-pulse">
                 🟢 Plantão Ativo • Aguardando Chamados
              </div>
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

                    <div className="relative w-full h-80 mb-6 rounded-[2rem] border-4 border-emerald-500/30 shadow-inner overflow-hidden bg-emerald-800/50">
                        <div id="motoboy-map" className="w-full h-full z-0" />
                        
                        {!currentLocation && !gpsError && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-emerald-100 bg-emerald-900/80 z-10 backdrop-blur-sm">
                                <Loader2 className="animate-spin mb-2 w-8 h-8" /> 
                                <span className="font-bold text-sm">Buscando sinal GPS...</span>
                            </div>
                        )}

                        {gpsError && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-red-200 bg-red-900/90 z-20 backdrop-blur-sm p-4 text-center">
                                <span className="font-bold mb-2">⚠️ {gpsError}</span>
                                <button onClick={() => window.location.reload()} className="bg-white text-red-900 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                                    <RefreshCw size={14} /> Tentar Novamente
                                </button>
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
