
import React, { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { User, Order } from '../types';
import { Bike, MapPin, Navigation, Camera, CheckCircle2, User as UserIcon, LogOut, Loader2, Share2, Clock, BellRing, Volume2, ArrowRight, Zap, BatteryCharging, MoreVertical } from 'lucide-react';
import { db } from '../firebase';
import { doc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';

declare const L: any; // Leaflet Global

// URL do site público para compartilhamento
const PUBLIC_URL = window.location.origin;

const MotoboyDashboard = ({ user, orders, logout }: { user: User | null, orders: Order[], logout: () => void }) => {
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [wakeLock, setWakeLock] = useState<any>(null);

  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prevQueueLength = useRef<number>(0);

  const deliveryQueue = orders.filter(o => o.status === 'shipped');

  // SEGURANÇA
  if (!user || !user.isCourier) {
    return <Navigate to="/" />;
  }

  // CONFIGURAÇÃO DE "APP WEB"
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  // --- WAKE LOCK (MANTER TELA LIGADA NO NAVEGADOR) ---
  const requestWakeLock = async () => {
    if ('wakeLock' in navigator) {
        try {
            const lock = await (navigator as any).wakeLock.request('screen');
            setWakeLock(lock);
            console.log("Tela mantida ligada (WakeLock ativo)");
        } catch (err) {
            console.error("Erro WakeLock (pode ser ignorado em segundo plano):", err);
        }
    }
  };

  const releaseWakeLock = async () => {
    if (wakeLock) {
        try {
            await wakeLock.release();
            setWakeLock(null);
        } catch (e) { console.error(e); }
    }
  };

  // --- SISTEMA DE NOTIFICAÇÃO SONORA ---
  useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    
    // Tenta ativar notificações do navegador
    if ("Notification" in window && Notification.permission === "granted") {
        setNotificationsEnabled(true);
    }
    prevQueueLength.current = deliveryQueue.length;
  }, []);

  const enableNotifications = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          setNotificationsEnabled(true);
          // Toca um som mudo para desbloquear o áudio do navegador
          if (audioRef.current) {
            audioRef.current.volume = 0.5;
            audioRef.current.play().catch(() => {});
          }
        }
      });
    }
  };

  useEffect(() => {
    if (deliveryQueue.length > prevQueueLength.current) {
      triggerNewOrderAlert();
    }
    prevQueueLength.current = deliveryQueue.length;
  }, [deliveryQueue.length]);

  const triggerNewOrderAlert = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 1.0;
      audioRef.current.play().catch(e => console.error("Erro ao tocar som:", e));
    }
    if (navigator.vibrate) navigator.vibrate([500, 200, 500]);
    if (Notification.permission === "granted") {
      new Notification("📦 Nova Entrega!", { body: "Novo pedido na fila." });
    }
  };

  // --- LOGICA DE GPS E MAPA ---
  useEffect(() => {
    if (activeOrder) {
      // 1. Ativa WakeLock para a tela não desligar durante a rota
      requestWakeLock();

      if (!navigator.geolocation) {
        alert("GPS necessário. Ative a localização.");
        return;
      }
      
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, heading, speed } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          
          // Salva no Firebase para o Admin ver
          setDoc(doc(db, "tracking", activeOrder.id), {
             lat: latitude,
             lng: longitude,
             heading: heading || 0,
             speed: speed || 0,
             timestamp: Date.now(),
             orderId: activeOrder.id,
             courierName: user.name
          }, { merge: true }).catch(err => console.error(err));
        },
        (error) => console.error("Erro GPS:", error),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
      setWatchId(id);
    } else {
      // 2. Desativa GPS e WakeLock ao finalizar
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        setWatchId(null);
      }
      setCurrentLocation(null);
      releaseWakeLock();
    }
    return () => { 
        if (watchId !== null) navigator.geolocation.clearWatch(watchId);
        releaseWakeLock();
    };
  }, [activeOrder?.id]);

  // Renderização do Mapa Leaflet
  useEffect(() => {
    if (!activeOrder) {
        if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; markerRef.current = null; }
        return;
    }
    const container = document.getElementById('motoboy-map');
    if (activeOrder && !mapRef.current && container) {
        const containerAny = container as any;
        if (containerAny._leaflet_id) containerAny._leaflet_id = null;
        try {
          mapRef.current = L.map('motoboy-map', { zoomControl: false, attributionControl: false }).setView([-24.9555, -53.4552], 15);
          L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { maxZoom: 20 }).addTo(mapRef.current);
        } catch (e) { console.error(e); }
    }
    if (activeOrder && currentLocation && mapRef.current) {
        const latLng = [currentLocation.lat, currentLocation.lng];
        const motoIcon = L.divIcon({
            html: `<div style="background-color: #ef4444; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 3px solid white;">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>
                   </div>`,
            className: 'custom-div-icon',
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });
        if (markerRef.current) markerRef.current.setLatLng(latLng);
        else markerRef.current = L.marker(latLng, { icon: motoIcon }).addTo(mapRef.current);
        mapRef.current.setView(latLng, 17, { animate: true });
    }
    return () => {
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; markerRef.current = null; }
    };
  }, [activeOrder, currentLocation]);

  const handleStartDelivery = async (order: Order) => {
    if (window.confirm(`Iniciar rota para ${order.address}?`)) {
        setActiveOrder(order);
        try {
            await updateDoc(doc(db, "orders", order.id), { shippedAt: new Date().toISOString() });
        } catch (e) { console.error(e); }
    }
  };

  const handleCopyTrackingLink = () => {
      if(!activeOrder) return;
      const link = `${PUBLIC_URL}/#/track/${activeOrder.id}`;
      
      if (navigator.share) {
        navigator.share({
            title: 'Acompanhe sua entrega',
            text: 'Seu pedido TudoAki saiu para entrega! Acompanhe em tempo real:',
            url: link,
        }).catch(console.error);
      } else {
        navigator.clipboard.writeText(link);
        alert("Link copiado! " + link);
      }
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
            setPhotoPreview(canvas.toDataURL('image/jpeg', 0.7));
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const finalizeDelivery = async () => {
    if (!activeOrder || !photoPreview || !recipientName) { alert("Preencha todos os dados."); return; }
    setIsSubmitting(true);
    try {
        await updateDoc(doc(db, "orders", activeOrder.id), {
            status: 'delivered',
            deliveryProof: { recipientName, photo: photoPreview, timestamp: new Date().toISOString() }
        });
        if (watchId !== null) navigator.geolocation.clearWatch(watchId);
        setActiveOrder(null);
        setShowDeliveryModal(false);
        setPhotoPreview(null);
        setRecipientName('');
        releaseWakeLock();
        alert("Entrega Finalizada!");
    } catch (e) { console.error(e); alert("Erro ao salvar."); } 
    finally { setIsSubmitting(false); }
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-slate-900 text-white font-sans overflow-hidden app-select-none">
      
      {/* HEADER */}
      <div className="bg-slate-800 p-4 shadow-md flex justify-between items-center z-20 border-b border-slate-700 shrink-0">
        <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-1.5 rounded-full">
                <Bike className="text-white h-5 w-5" />
            </div>
            <div>
                <h1 className="font-black text-lg leading-none">TudoAki App</h1>
                <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                   <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"/> Web App
                </p>
            </div>
        </div>
        <div className="flex items-center gap-2">
           {!notificationsEnabled && (
             <button onClick={enableNotifications} className="bg-blue-500/20 text-blue-400 p-2 rounded-xl active:scale-95 transition-transform">
               <BellRing size={18} />
             </button>
           )}
           <button onClick={logout} className="bg-red-500/20 text-red-400 p-2 rounded-xl active:scale-95 transition-transform">
              <LogOut size={18} />
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-900 pb-24">
        
        {/* Aviso de Instalação (Só aparece se não for PWA Standalone) */}
        {!window.matchMedia('(display-mode: standalone)').matches && (
             <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 rounded-2xl shadow-lg border border-blue-400/30">
                <div className="flex items-start gap-3">
                    <div className="bg-white/20 p-2 rounded-lg"><MoreVertical className="text-white" size={20} /></div>
                    <div>
                        <h3 className="font-black text-white text-sm">Instalar Aplicativo</h3>
                        <p className="text-xs text-blue-100 mt-1">
                            Para a melhor experiência, toque nos 3 pontinhos do navegador e selecione <b>"Adicionar à Tela Inicial"</b>.
                        </p>
                    </div>
                </div>
             </div>
        )}

        {/* CARD DE ROTA ATIVA */}
        {activeOrder ? (
             <div className="bg-emerald-600 rounded-[2rem] p-5 shadow-2xl relative overflow-hidden ring-4 ring-emerald-500/20 animate-in fade-in slide-in-from-top">
                <div className="flex justify-between items-center mb-4">
                     <div className="flex items-center gap-2">
                         <span className="bg-black/20 text-white px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> GPS WEB
                        </span>
                        {wakeLock && (
                            <span className="bg-yellow-400/20 text-yellow-200 px-2 py-1 rounded-lg text-[10px] font-black flex items-center gap-1">
                                <Zap size={10} className="fill-yellow-200" /> TELA ON
                            </span>
                        )}
                     </div>
                     <button onClick={handleCopyTrackingLink} className="bg-white/90 text-emerald-800 text-[10px] font-black px-3 py-1.5 rounded-lg flex items-center gap-1 active:scale-95">
                        <Share2 size={12} /> Link
                    </button>
                </div>

                {/* MAPA */}
                <div className="w-full aspect-square bg-emerald-800/50 rounded-3xl mb-4 border-2 border-emerald-400/30 relative overflow-hidden shadow-inner">
                    <div id="motoboy-map" className="absolute inset-0 z-0"></div>
                    {!currentLocation && <div className="absolute inset-0 flex items-center justify-center text-emerald-100/50 z-10"><Loader2 className="animate-spin mr-2" /> Localizando...</div>}
                </div>

                <h2 className="text-2xl font-black leading-none mb-1">Em Rota</h2>
                <div className="bg-black/20 rounded-xl p-3 mb-4">
                    <p className="text-emerald-100 text-[10px] font-black uppercase mb-0.5">Destino</p>
                    <p className="text-white font-bold text-base leading-tight flex items-start gap-1.5">
                        <MapPin className="shrink-0 mt-0.5 text-white" size={14} /> 
                        {activeOrder.address}
                    </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    <button 
                         onClick={() => { if(window.confirm("Cancelar rota?")) { setActiveOrder(null); releaseWakeLock(); } }}
                         className="bg-emerald-800/50 text-emerald-200 py-3 rounded-xl font-bold text-xs uppercase"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={() => setShowDeliveryModal(true)}
                        className="bg-white text-emerald-700 py-3 rounded-xl font-black text-sm uppercase shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
                    >
                        <CheckCircle2 size={16} /> Entregar
                    </button>
                </div>
             </div>
        ) : (
            <div className="bg-slate-800/50 rounded-[2rem] p-6 text-center border-2 border-dashed border-slate-700">
                <div className="w-14 h-14 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-500">
                    <Navigation size={28} />
                </div>
                <h2 className="text-lg font-black text-slate-300">Sem Rota Ativa</h2>
                <p className="text-slate-500 text-xs mt-1">Aguardando novos pedidos...</p>
            </div>
        )}

        {/* LISTA DE PEDIDOS */}
        <div>
            <div className="flex items-center justify-between px-1 mb-3">
                <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest">Disponíveis ({deliveryQueue.length})</h3>
                <Clock size={14} className="text-slate-600" />
            </div>
            
            <div className="space-y-3 pb-safe">
                {deliveryQueue.length === 0 ? (
                    <div className="text-center py-8 opacity-30">
                        <Bike size={32} className="mx-auto mb-2" />
                        <p className="text-sm font-bold">Tudo entregue!</p>
                    </div>
                ) : (
                    deliveryQueue.map(order => (
                        <div key={order.id} className={`bg-white text-slate-900 p-5 rounded-[1.5rem] shadow-sm active:scale-[0.98] transition-transform ${activeOrder ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                            <div className="flex justify-between items-start mb-2">
                                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-[10px] font-black">#{order.id.slice(-6)}</span>
                                <span className="text-[10px] font-bold text-slate-400">{new Date(order.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            </div>
                            
                            <div className="flex gap-3 mb-4">
                                <MapPin className="text-red-500 shrink-0 mt-0.5" size={18} />
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Destino</p>
                                    <p className="font-bold text-base leading-tight text-slate-800">{order.address}</p>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => handleStartDelivery(order)}
                                className="w-full bg-blue-600 text-white py-3 rounded-xl font-black uppercase text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                            >
                                <Navigation size={16} /> Navegar
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
      </div>

      {showDeliveryModal && (
        <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col animate-in slide-in-from-bottom duration-300">
            <div className="p-4 flex justify-between items-center border-b border-slate-800">
                <h2 className="text-lg font-black text-white">Finalizar Entrega</h2>
                <button onClick={() => setShowDeliveryModal(false)} className="p-2 bg-slate-800 rounded-full"><ArrowRight className="rotate-90" /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                    <label className="text-xs font-black uppercase text-slate-400 ml-1">Recebedor</label>
                    <input 
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        className="w-full bg-slate-800 text-white border-none rounded-2xl p-4 font-bold text-lg mt-2 focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-600"
                        placeholder="Nome de quem recebeu"
                    />
                </div>

                <div>
                    <label className="text-xs font-black uppercase text-slate-400 ml-1">Comprovante</label>
                    <label className={`block w-full aspect-video rounded-2xl border-2 border-dashed mt-2 flex flex-col items-center justify-center relative overflow-hidden ${photoPreview ? 'border-emerald-500' : 'border-slate-700 bg-slate-800'}`}>
                        {photoPreview ? (
                            <img src={photoPreview} className="absolute inset-0 w-full h-full object-cover" />
                        ) : (
                            <div className="text-center">
                                <Camera size={32} className="mx-auto mb-2 text-slate-500" />
                                <p className="text-xs font-bold text-slate-500">Tirar Foto</p>
                            </div>
                        )}
                        <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handlePhotoCapture} />
                    </label>
                </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-900">
                <button 
                    onClick={finalizeDelivery}
                    disabled={isSubmitting || !photoPreview || !recipientName}
                    className="w-full py-4 rounded-xl font-black text-white bg-emerald-500 shadow-xl shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : 'CONFIRMAR ENTREGA'}
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default MotoboyDashboard;
