
import React, { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { User, Order } from '../types';
import { Bike, MapPin, Navigation, Camera, CheckCircle2, User as UserIcon, LogOut, Loader2 } from 'lucide-react';
import { db } from '../firebase';
import { doc, updateDoc, setDoc } from 'firebase/firestore';

const MotoboyDashboard = ({ user, orders, logout }: { user: User | null, orders: Order[], logout: () => void }) => {
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [watchId, setWatchId] = useState<number | null>(null);

  // Filtra apenas pedidos que estão "Em Rota" (Shipped)
  const deliveryQueue = orders.filter(o => o.status === 'shipped');

  // SEGURANÇA
  if (!user || !user.isCourier) {
    return <Navigate to="/" />;
  }

  // Lógica de GPS (Tracker)
  useEffect(() => {
    if (activeOrder) {
      if (!navigator.geolocation) {
        alert("Seu navegador não suporta geolocalização.");
        return;
      }

      const id = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, heading } = position.coords;
          
          // Atualiza no Firebase para o cliente ver
          const locationRef = doc(db, "tracking", activeOrder.id);
          setDoc(locationRef, {
             lat: latitude,
             lng: longitude,
             heading: heading || 0,
             timestamp: Date.now(),
             orderId: activeOrder.id
          }, { merge: true });
        },
        (error) => console.error("Erro GPS:", error),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
      setWatchId(id);
    } else {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        setWatchId(null);
      }
    }

    return () => {
        if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    };
  }, [activeOrder]);

  const handleStartDelivery = (order: Order) => {
    if (window.confirm(`Iniciar rota para ${order.address}?`)) {
        setActiveOrder(order);
    }
  };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Redimensionar imagem para não estourar o banco (Canvas)
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
        alert("Preencha o nome e tire a foto.");
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

        // Limpa tracking
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
    <div className="min-h-screen bg-slate-900 text-white pb-20">
      {/* Header */}
      <div className="bg-slate-800 p-6 shadow-lg flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-2 rounded-full animate-pulse">
                <Bike className="text-white" size={24} />
            </div>
            <div>
                <h1 className="font-black text-xl leading-none">TudoAki Moto</h1>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Painel do Entregador</p>
            </div>
        </div>
        <button onClick={logout} className="bg-red-500/20 text-red-400 p-2 rounded-xl hover:bg-red-500 hover:text-white transition-colors">
            <LogOut size={20} />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Status Ativo */}
        {activeOrder ? (
             <div className="bg-emerald-600 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden animate-in slide-in-from-top">
                <div className="absolute top-0 right-0 p-4 opacity-20"><Navigation size={100} /></div>
                <div className="relative z-10">
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">GPS Ativo • Rastreando</span>
                    <h2 className="text-3xl font-black mt-4 mb-2">Em Rota</h2>
                    <p className="text-emerald-100 font-medium text-lg mb-6">{activeOrder.address}</p>
                    
                    <button 
                        onClick={() => setShowDeliveryModal(true)}
                        className="w-full bg-white text-emerald-700 py-4 rounded-xl font-black text-lg shadow-lg flex items-center justify-center gap-2"
                    >
                        <CheckCircle2 /> FINALIZAR ENTREGA
                    </button>
                    <button 
                         onClick={() => setActiveOrder(null)}
                         className="w-full mt-3 text-emerald-200 text-xs font-bold uppercase tracking-widest underline"
                    >
                        Cancelar Rota (Erro)
                    </button>
                </div>
             </div>
        ) : (
            <div className="bg-slate-800 rounded-2xl p-6 text-center border border-slate-700">
                <h2 className="text-xl font-bold text-slate-200">Aguardando Rotas</h2>
                <p className="text-slate-400 text-sm mt-1">Selecione um pedido abaixo para iniciar.</p>
            </div>
        )}

        {/* Lista de Pedidos */}
        <div className="space-y-4">
            <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest ml-2">Fila de Entrega ({deliveryQueue.length})</h3>
            
            {deliveryQueue.length === 0 ? (
                <div className="text-center py-10 opacity-30">
                    <Bike size={48} className="mx-auto mb-2" />
                    <p>Nenhuma entrega pendente.</p>
                </div>
            ) : (
                deliveryQueue.map(order => (
                    <div key={order.id} className={`bg-white text-slate-900 p-5 rounded-3xl shadow-lg border-l-8 ${activeOrder?.id === order.id ? 'border-emerald-500 opacity-50 pointer-events-none' : 'border-blue-500'}`}>
                        <div className="flex justify-between items-start mb-3">
                            <span className="bg-slate-100 px-2 py-1 rounded-md text-xs font-black">{order.id}</span>
                            <span className="text-xs font-bold text-slate-400">{new Date(order.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                        <div className="flex items-start gap-3 mb-4">
                            <MapPin className="text-red-500 shrink-0 mt-1" />
                            <p className="font-bold text-lg leading-tight">{order.address}</p>
                        </div>
                        <div className="flex items-center gap-2 mb-4 bg-slate-50 p-3 rounded-xl">
                            <UserIcon size={16} className="text-slate-400" />
                            <span className="text-sm font-medium">{order.items.length} volumes • {order.paymentMethod.toUpperCase()}</span>
                        </div>
                        
                        {!activeOrder && (
                            <button 
                                onClick={() => handleStartDelivery(order)}
                                className="w-full bg-blue-600 text-white py-3 rounded-xl font-black uppercase tracking-wide hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                <Navigation size={18} /> INICIAR ROTA
                            </button>
                        )}
                    </div>
                ))
            )}
        </div>
      </div>

      {/* Modal de Finalização */}
      {showDeliveryModal && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-white text-slate-900 w-full sm:max-w-md rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 animate-in slide-in-from-bottom duration-300">
                <h2 className="text-2xl font-black text-blue-900 mb-6">Comprovante de Entrega</h2>
                
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-black uppercase text-gray-400 mb-2">Quem recebeu?</label>
                        <input 
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            className="w-full bg-gray-100 border-none rounded-xl p-4 font-bold text-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            placeholder="Nome do recebedor"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase text-gray-400 mb-2">Foto do Local / Pacote</label>
                        <label className="block w-full aspect-video bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors relative overflow-hidden">
                            {photoPreview ? (
                                <img src={photoPreview} className="absolute inset-0 w-full h-full object-cover" />
                            ) : (
                                <>
                                    <Camera size={32} className="text-gray-400 mb-2" />
                                    <span className="text-xs font-bold text-gray-500">Toque para tirar foto</span>
                                </>
                            )}
                            <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handlePhotoCapture} />
                        </label>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button 
                            onClick={() => setShowDeliveryModal(false)}
                            className="flex-1 py-4 rounded-xl font-bold text-gray-500 bg-gray-100"
                        >
                            Voltar
                        </button>
                        <button 
                            onClick={finalizeDelivery}
                            disabled={isSubmitting || !photoPreview || !recipientName}
                            className="flex-1 py-4 rounded-xl font-black text-white bg-emerald-500 shadow-lg shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" /> : 'CONFIRMAR'}
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
