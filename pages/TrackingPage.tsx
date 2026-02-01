
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { CourierLocation, Order } from '../types';
import { MapPin, Navigation, Phone, User, Clock, CheckCircle2 } from 'lucide-react';

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
        mapRef.current = L.map('map').setView([-24.9555, -53.4552], 13); // Default Cascavel
        
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
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
            html: `<div style="background-color: #ef4444; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.3); border: 3px solid white;">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>
                   </div>`,
            className: '',
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });

        if (markerRef.current) {
            markerRef.current.setLatLng(latLng);
        } else {
            markerRef.current = L.marker(latLng, { icon: motoIcon }).addTo(mapRef.current);
        }

        mapRef.current.setView(latLng, 16);
    }
  }, [location]);

  if (!order) return <div className="h-screen flex items-center justify-center">Carregando pedido...</div>;

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Mapa (Fundo) */}
      <div id="map" className="flex-1 w-full bg-gray-100 z-0" />

      {/* Painel Inferior (Overlay) */}
      <div className="bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-8 relative z-10 -mt-6">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
        
        <div className="flex justify-between items-start mb-6">
            <div>
                <h1 className="text-xl font-black text-blue-900">
                    {order.status === 'delivered' ? 'Entrega Finalizada' : 'Entrega em Andamento'}
                </h1>
                <p className="text-sm text-gray-500 font-medium mt-1">
                    {order.status === 'delivered' ? 'Seu pedido foi entregue com sucesso.' : 'O motoboy está a caminho do seu endereço.'}
                </p>
            </div>
            <div className={`p-3 rounded-2xl ${order.status === 'delivered' ? 'bg-green-100 text-green-600' : 'bg-red-50 text-red-500 animate-pulse'}`}>
                {order.status === 'delivered' ? <CheckCircle2 size={24} /> : <Navigation size={24} />}
            </div>
        </div>

        {order.status !== 'delivered' && (
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-6">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <User size={24} className="text-gray-400" />
                </div>
                <div className="flex-1">
                    <p className="text-xs font-black uppercase text-gray-400">Entregador</p>
                    <p className="text-sm font-bold text-blue-900">Motoboy Flash</p>
                </div>
                <div className="text-right">
                    <p className="text-xs font-black uppercase text-gray-400">Previsão</p>
                    <p className="text-sm font-bold text-blue-900">~15 min</p>
                </div>
            </div>
        )}

        {/* Detalhes da Entrega Realizada (Comprovante) */}
        {order.status === 'delivered' && order.deliveryProof && (
             <div className="bg-green-50 p-6 rounded-2xl border border-green-100 mb-6">
                <h3 className="text-green-800 font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 size={18} /> Comprovante Digital
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-[10px] font-black uppercase text-green-600 mb-1">Recebido Por</p>
                        <p className="text-sm font-bold text-blue-900">{order.deliveryProof.recipientName}</p>
                        <p className="text-[10px] font-black uppercase text-green-600 mb-1 mt-3">Horário</p>
                        <p className="text-sm font-bold text-blue-900">
                            {new Date(order.deliveryProof.timestamp).toLocaleTimeString()}
                        </p>
                    </div>
                    {order.deliveryProof.photo && (
                        <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-white shadow-md cursor-pointer" onClick={() => window.open(order.deliveryProof?.photo)}>
                            <img src={order.deliveryProof.photo} className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>
             </div>
        )}

        <div className="space-y-3">
            <div className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 bg-gray-300 rounded-full" />
                <div>
                    <p className="text-xs text-gray-400">Loja TudoAki Express</p>
                    <p className="text-xs font-bold text-gray-600">Cascavel, PR</p>
                </div>
            </div>
            <div className="h-4 border-l-2 border-dashed border-gray-200 ml-1" />
            <div className="flex items-start gap-3">
                <MapPin size={16} className="text-red-500 -ml-1" />
                <div>
                    <p className="text-xs text-gray-400">Seu Endereço</p>
                    <p className="text-sm font-bold text-blue-900">{order.address}</p>
                </div>
            </div>
        </div>

        <Link to="/" className="block w-full bg-blue-900 text-white text-center py-4 rounded-2xl font-black mt-8 hover:bg-blue-800 transition-colors">
            Voltar para Loja
        </Link>
      </div>
    </div>
  );
};

export default TrackingPage;
