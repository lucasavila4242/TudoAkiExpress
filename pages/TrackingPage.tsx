
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { CourierLocation, Order } from '../types';
import { MapPin, Navigation, User, Clock, CheckCircle2, Package, Loader2 } from 'lucide-react';

declare const L: any; // Leaflet Global

const TrackingPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [location, setLocation] = useState<CourierLocation | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  // 1. Carrega Dados do Pedido
  useEffect(() => {
    if (!orderId) return;
    const unsub = onSnapshot(doc(db, "orders", orderId), (doc) => {
        if (doc.exists()) {
            setOrder({ id: doc.id, ...doc.data() } as Order);
        }
    });
    return () => unsub();
  }, [orderId]);

  // 2. Carrega Posição do Motoboy
  useEffect(() => {
    if (!orderId) return;
    // Escuta a coleção tracking/orderId
    const unsub = onSnapshot(doc(db, "tracking", orderId), (doc) => {
        if (doc.exists()) {
            setLocation(doc.data() as CourierLocation);
        }
    });
    return () => unsub();
  }, [orderId]);

  // 3. Renderiza o Mapa (Leaflet)
  useEffect(() => {
    // Inicializa Mapa apenas uma vez
    if (!mapRef.current && document.getElementById('map')) {
        // Centro inicial padrão (Cascavel)
        mapRef.current = L.map('map', { zoomControl: false }).setView([-24.9555, -53.4552], 13);
        
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(mapRef.current);
    }

    // Atualiza Marcador do Motoboy
    if (location && mapRef.current) {
        const { lat, lng } = location;
        const latLng = [lat, lng];

        // Ícone de Moto Customizado
        const motoIcon = L.divIcon({
            html: `<div style="background-color: #ef4444; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 20px rgba(239, 68, 68, 0.4); border: 4px solid white; position: relative;">
                     <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; border: 4px solid #ef4444; animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite; opacity: 0.5;"></div>
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>
                   </div>`,
            className: 'custom-div-icon',
            iconSize: [48, 48],
            iconAnchor: [24, 24]
        });

        if (markerRef.current) {
            markerRef.current.setLatLng(latLng);
        } else {
            markerRef.current = L.marker(latLng, { icon: motoIcon }).addTo(mapRef.current);
        }

        // Suave pan para a nova posição
        mapRef.current.flyTo(latLng, 16, { animate: true, duration: 1 });
    }
  }, [location]);

  if (!order) return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-4">
        <Loader2 className="w-12 h-12 text-blue-900 animate-spin mb-4" />
        <h2 className="text-xl font-black text-blue-900">Localizando seu Pedido...</h2>
        <p className="text-gray-500">Estamos conectando aos satélites.</p>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden relative">
      {/* Botão Flutuante Voltar */}
      <div className="absolute top-4 left-4 z-[999]">
         <Link to="/" className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:text-blue-900 transition-colors">
            <Package size={20} />
         </Link>
      </div>

      {/* Mapa (Fundo) */}
      <div id="map" className="flex-1 w-full bg-gray-100 z-0" />

      {/* Painel Inferior (Overlay) */}
      <div className="bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] p-8 relative z-10 -mt-10 animate-in slide-in-from-bottom duration-500">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8" />
        
        <div className="flex justify-between items-start mb-8">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-md">#{order.id}</span>
                    {order.status === 'delivered' && <span className="bg-green-100 text-green-700 text-[10px] font-black uppercase px-2 py-0.5 rounded-md">Entregue</span>}
                </div>
                <h1 className="text-2xl font-black text-blue-900 leading-none">
                    {order.status === 'delivered' ? 'Chegou!' : 'Em Movimento'}
                </h1>
                <p className="text-sm text-gray-500 font-medium mt-1">
                    {order.status === 'delivered' ? 'Pedido entregue com sucesso.' : 'Acompanhe o deslocamento em tempo real.'}
                </p>
            </div>
            <div className={`p-4 rounded-2xl shadow-lg ${order.status === 'delivered' ? 'bg-green-500 text-white' : 'bg-red-500 text-white animate-pulse'}`}>
                {order.status === 'delivered' ? <CheckCircle2 size={28} /> : <Navigation size={28} />}
            </div>
        </div>

        {order.status !== 'delivered' ? (
            <div className="flex items-center gap-4 bg-gradient-to-r from-gray-50 to-white p-5 rounded-3xl border border-gray-100 mb-6 shadow-sm">
                <div className="w-14 h-14 bg-blue-900 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                    <User size={24} className="text-white" />
                </div>
                <div className="flex-1">
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Entregador</p>
                    <p className="text-lg font-black text-blue-900 leading-none mt-0.5">{location?.courierName || 'Motoboy Flash'}</p>
                </div>
                <div className="text-right bg-white px-3 py-2 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-[10px] font-black uppercase text-gray-400">Velocidade</p>
                    <p className="text-sm font-black text-blue-900">{location?.speed ? Math.round(location.speed * 3.6) : 0} km/h</p>
                </div>
            </div>
        ) : (
            order.deliveryProof && (
             <div className="bg-green-50 p-6 rounded-[2rem] border border-green-100 mb-6 relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 opacity-10"><CheckCircle2 size={100} /></div>
                <h3 className="text-green-800 font-bold mb-4 flex items-center gap-2 relative z-10">
                    <CheckCircle2 size={18} /> Comprovante Digital
                </h3>
                <div className="flex gap-4 relative z-10">
                    <div className="flex-1">
                        <p className="text-[10px] font-black uppercase text-green-600 mb-1">Recebido Por</p>
                        <p className="text-base font-black text-blue-900 leading-tight">{order.deliveryProof.recipientName}</p>
                        <p className="text-[10px] font-black uppercase text-green-600 mb-1 mt-3">Horário</p>
                        <p className="text-sm font-bold text-blue-900">
                            {new Date(order.deliveryProof.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                    </div>
                    {order.deliveryProof.photo && (
                        <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white shadow-md cursor-pointer hover:scale-105 transition-transform" onClick={() => window.open(order.deliveryProof?.photo)}>
                            <img src={order.deliveryProof.photo} className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>
             </div>
            )
        )}

        <div className="space-y-4 relative">
            {/* Linha pontilhada conectora */}
            <div className="absolute left-[15px] top-[15px] bottom-[15px] w-0.5 border-l-2 border-dashed border-gray-200" />
            
            <div className="flex items-start gap-4 relative z-10">
                <div className="w-8 h-8 rounded-full bg-gray-100 border-4 border-white shadow-sm flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                </div>
                <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Origem</p>
                    <p className="text-sm font-black text-gray-800">Loja TudoAki Express</p>
                </div>
            </div>
            
            <div className="flex items-start gap-4 relative z-10">
                <div className="w-8 h-8 rounded-full bg-red-100 border-4 border-white shadow-sm flex items-center justify-center shrink-0 animate-pulse">
                    <MapPin size={14} className="text-red-500" />
                </div>
                <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Destino</p>
                    <p className="text-sm font-black text-blue-900 leading-tight">{order.address}</p>
                </div>
            </div>
        </div>

        <div className="mt-8 text-center">
             <p className="text-[10px] text-gray-300 uppercase font-black tracking-[0.2em]">TudoAki Logistics © 2024</p>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;
