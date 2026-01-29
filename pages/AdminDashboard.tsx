
import React, { useMemo, useState } from 'react';
import { 
  User as UserIcon, 
  Smartphone, 
  Mail, 
  Calendar, 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  ArrowLeft, 
  MessageCircle, 
  Copy,
  Clock,
  AlertCircle,
  Zap,
  CheckCircle2,
  Package,
  Truck
} from 'lucide-react';
import { User, Order, OrderStatus } from '../types';
import { Link, Navigate } from 'react-router-dom';

const AdminDashboard = ({ 
  currentUser, 
  orders = [],
  updateOrderStatus 
}: { 
  currentUser: User | null, 
  orders: Order[],
  updateOrderStatus: (id: string, s: OrderStatus) => void
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'abandoned' | 'orders'>('users');

  if (!currentUser || !currentUser.isAdmin) {
    return <Navigate to="/" />;
  }

  const allUsers: User[] = useMemo(() => {
    const users = JSON.parse(localStorage.getItem('aki_users') || '[]');
    return users.filter((u: any) => u.email !== 'lucasaviladark@gmail.com');
  }, []);

  const abandonedCarts = useMemo(() => {
    return allUsers.filter(u => u.persistedCart && u.persistedCart.length > 0);
  }, [allUsers]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copiado para a área de transferência!');
  };

  const getAbandonedTime = (timestamp?: string) => {
    if (!timestamp) return 'Tempo desconhecido';
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    
    if (hours > 0) return `${hours}h ${mins % 60}min atrás`;
    return `${mins}min atrás`;
  };

  const sendReminder = (user: User) => {
    const message = `Olá ${user.name}! 🛒 Notamos que você deixou alguns itens incríveis no seu carrinho na TudoAki Express Cascavel. 

Finalize sua compra agora e garanta sua entrega hoje mesmo! 

Acesse seu carrinho aqui: ${window.location.origin}/#/checkout

Dúvidas? Estamos aqui para ajudar!`;
    
    const encoded = encodeURIComponent(message);
    const whatsapp = user.whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/55${whatsapp}?text=${encoded}`, '_blank');
  };

  const nextStatus = (current: OrderStatus): OrderStatus | null => {
    switch(current) {
      case 'pending': return 'processing';
      case 'processing': return 'shipped';
      case 'shipped': return 'delivered';
      default: return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link to="/account" className="inline-flex items-center gap-2 text-xs font-black text-red-500 uppercase tracking-widest hover:underline mb-2">
              <ArrowLeft className="h-3 w-3" /> Painel da Minha Conta
            </Link>
            <h1 className="text-4xl font-black text-blue-900 tracking-tighter">Gestão de Vendas Cascavel</h1>
            <p className="text-gray-500 font-medium">Controle total de clientes, leads e logística.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10"><Users size={120} /></div>
            <p className="text-blue-200 text-xs font-black uppercase mb-2">Total Clientes</p>
            <h2 className="text-5xl font-black">{allUsers.length}</h2>
          </div>
          <div className="bg-amber-500 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10"><ShoppingBag size={120} /></div>
            <p className="text-amber-100 text-xs font-black uppercase mb-2">Carrinhos Abandonados</p>
            <h2 className="text-5xl font-black">{abandonedCarts.length}</h2>
          </div>
          <div className="bg-red-600 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10"><Truck size={120} /></div>
            <p className="text-red-100 text-xs font-black uppercase mb-2">Pedidos Totais</p>
            <h2 className="text-5xl font-black">{orders.length}</h2>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 bg-gray-200/50 p-1.5 rounded-2xl w-fit">
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-500 hover:text-blue-900'}`}
          >
            Clientes
          </button>
          <button 
            onClick={() => setActiveTab('abandoned')}
            className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'abandoned' ? 'bg-red-500 text-white shadow-lg' : 'text-gray-500 hover:text-red-500'}`}
          >
            Carrinhos Abandonados
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'orders' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500 hover:text-blue-900'}`}
          >
            Logística / Entregas {orders.filter(o => o.status !== 'delivered').length > 0 && <span className="bg-white text-blue-900 px-2 py-0.5 rounded-md text-[9px]">{orders.filter(o => o.status !== 'delivered').length}</span>}
          </button>
        </div>

        <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
          {activeTab === 'users' ? (
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <th className="px-8 py-5">Cliente</th>
                      <th className="px-8 py-5">WhatsApp</th>
                      <th className="px-8 py-5 text-center">Status</th>
                      <th className="px-8 py-5 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {allUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-900 text-white rounded-xl flex items-center justify-center font-black">{user.name.charAt(0)}</div>
                            <span className="text-sm font-bold text-blue-900">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6"><span className="text-sm font-black text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg">{user.whatsapp}</span></td>
                        <td className="px-8 py-6 text-center"><span className="px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-[10px] font-black uppercase">{user.tier}</span></td>
                        <td className="px-8 py-6 text-center"><a href={`https://wa.me/55${user.whatsapp.replace(/\D/g, '')}`} target="_blank" className="text-green-500 hover:bg-green-50 p-2 rounded-lg inline-block"><MessageCircle /></a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          ) : activeTab === 'abandoned' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <th className="px-8 py-5">Cliente / Tempo</th>
                      <th className="px-8 py-5">Valor Carrinho</th>
                      <th className="px-8 py-5 text-center">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {abandonedCarts.map((user) => (
                      <tr key={user.id} className="hover:bg-red-50/30 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="text-sm font-black text-blue-900">{user.name}</span>
                            <div className="flex items-center gap-1 mt-1 text-[10px] text-amber-600 font-bold uppercase"><Clock size={12}/> {getAbandonedTime(user.lastCartUpdate)}</div>
                          </div>
                        </td>
                        <td className="px-8 py-6"><span className="text-sm font-black text-blue-900">R$ {user.persistedCart.reduce((acc, i) => acc + (i.price * i.quantity), 0).toFixed(2)}</span></td>
                        <td className="px-8 py-6 text-center"><button onClick={() => sendReminder(user)} className="bg-red-500 text-white px-4 py-2 rounded-xl font-black text-[10px] uppercase hover:bg-red-600 transition-all">Notificar WhatsApp</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <th className="px-8 py-5">Protocolo / Data</th>
                    <th className="px-8 py-5">Destino</th>
                    <th className="px-8 py-5">Status Atual</th>
                    <th className="px-8 py-5 text-center">Gestão Logística</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-blue-900">{order.id}</span>
                          <span className="text-[10px] text-gray-400 font-bold">{new Date(order.timestamp).toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-700 truncate w-48">{order.address}</span>
                          <span className="text-[10px] text-blue-500 font-black uppercase">R$ {order.total.toFixed(2)}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'processing' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {order.status === 'pending' ? 'Pendente' : 
                           order.status === 'processing' ? 'Separando' : 
                           order.status === 'shipped' ? 'Em Rota' : 'Entregue'}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        {nextStatus(order.status) ? (
                          <button 
                            onClick={() => updateOrderStatus(order.id, nextStatus(order.status)!)}
                            className="bg-blue-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-red-500 transition-all flex items-center gap-2 mx-auto"
                          >
                            <Zap size={14} className="fill-white" /> Avançar Etapa
                          </button>
                        ) : (
                          <span className="text-green-500 font-black text-[10px] uppercase flex items-center justify-center gap-2">
                            <CheckCircle2 size={16} /> Finalizado
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr><td colSpan={4} className="py-20 text-center opacity-20 font-black uppercase tracking-widest">Nenhum pedido no sistema</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
