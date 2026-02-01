
import React, { useMemo, useState, useEffect } from 'react';
import { 
  User as UserIcon, 
  ShoppingBag, 
  ArrowLeft, 
  MessageCircle, 
  Clock,
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Banknote,
  Search,
  Users,
  AlertTriangle,
  CreditCard,
  Zap,
  Filter,
  Mail,
  Award,
  Navigation,
  Eye,
  Image as ImageIcon,
  Timer
} from 'lucide-react';
import { User, Order, OrderStatus } from '../types';
import { Link, Navigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const AdminDashboard = ({ 
  currentUser, 
  orders, 
  updateOrderStatus,
  isLogisticsMode = false 
}: { 
  currentUser: User | null, 
  orders: Order[],
  updateOrderStatus: (id: string, s: OrderStatus) => void,
  isLogisticsMode?: boolean
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'abandoned' | 'orders'>('orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');
  const [proofModal, setProofModal] = useState<Order | null>(null);

  // Carrega Usuários
  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) return;
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const usersList: User[] = [];
        snapshot.forEach((doc) => {
            const userData = doc.data() as User;
            if (userData.email !== 'lucasaviladark@gmail.com') {
                usersList.push({ ...userData, id: doc.id });
            }
        });
        setAllUsers(usersList);
    });
    return () => unsubscribe();
  }, [currentUser]);

  if (!currentUser || !currentUser.isAdmin) {
    return <Navigate to="/" />;
  }

  const abandonedCarts = useMemo(() => {
    return allUsers.filter(u => u.persistedCart && u.persistedCart.length > 0);
  }, [allUsers]);

  const filteredOrders = useMemo(() => {
    let result = orders;
    if (searchQuery) {
      result = result.filter(order => 
        (order.id || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (order.address || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterStatus !== 'all') {
      result = result.filter(order => order.status === filterStatus);
    }
    return result.sort((a, b) => {
      if (a.status === 'pending' && b.status !== 'pending') return -1;
      if (a.status !== 'pending' && b.status === 'pending') return 1;
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }, [orders, searchQuery, filterStatus]);

  // Cálculo de Performance de Entrega (Média em minutos)
  const averageDeliveryMinutes = useMemo(() => {
    const completedOrders = orders.filter(o => o.status === 'delivered' && o.shippedAt && o.deliveryProof?.timestamp);
    
    if (completedOrders.length === 0) return 0;

    const totalDurationMs = completedOrders.reduce((acc, order) => {
        const start = new Date(order.shippedAt!).getTime();
        const end = new Date(order.deliveryProof!.timestamp).getTime();
        return acc + (end - start);
    }, 0);

    return Math.round((totalDurationMs / completedOrders.length) / 60000); // ms -> mins
  }, [orders]);

  const getDurationString = (order: Order) => {
      if (!order.shippedAt || !order.deliveryProof?.timestamp) return "N/A";
      const start = new Date(order.shippedAt).getTime();
      const end = new Date(order.deliveryProof.timestamp).getTime();
      const diffMins = Math.round((end - start) / 60000);
      return `${diffMins} min`;
  };

  const getNextAction = (current: OrderStatus) => {
    switch(current) {
      case 'pending': 
        return { next: 'processing' as OrderStatus, label: 'INICIAR SEPARAÇÃO', icon: Package, color: 'bg-emerald-500 hover:bg-emerald-600', textColor: 'text-white' };
      case 'processing': 
        return { next: 'shipped' as OrderStatus, label: 'CHAMAR MOTOBOY', icon: Truck, color: 'bg-blue-600 hover:bg-blue-700', textColor: 'text-white' };
      case 'shipped': 
        return null; // Motoboy finaliza no app dele
      default: return null;
    }
  };

  const handleUpdateStatus = (id: string, nextStatus: OrderStatus) => {
    if (window.confirm('Confirmar mudança de status do pedido?')) {
      updateOrderStatus(id, nextStatus);
    }
  };

  const copyTrackingLink = (orderId: string) => {
    const link = `${window.location.origin}/#/track/${orderId}`;
    navigator.clipboard.writeText(link);
    alert("Link de rastreamento copiado! Envie para o cliente.");
  };

  const wrapperClass = isLogisticsMode ? "min-h-screen py-10 px-4 bg-slate-900 text-slate-100" : "min-h-screen py-10 px-4 bg-gray-50 text-gray-900";

  return (
    <div className={wrapperClass}>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header - Mantido */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            {!isLogisticsMode && (
              <Link to="/account" className="inline-flex items-center gap-2 text-xs font-black text-red-500 uppercase tracking-widest hover:underline mb-2">
                <ArrowLeft className="h-3 w-3" /> Voltar para Minha Conta
              </Link>
            )}
            <div className="flex items-center gap-4">
              <h1 className={`text-3xl sm:text-4xl font-black tracking-tighter ${isLogisticsMode ? 'text-white' : 'text-blue-900'}`}>
                {isLogisticsMode ? 'Terminal Logístico' : 'Gestão TudoAki'}
              </h1>
              <div className="hidden sm:flex items-center gap-2">
                 <span className={`text-[10px] font-bold uppercase ${isLogisticsMode ? 'text-emerald-400' : 'text-green-600'} animate-pulse flex items-center gap-1 border ${isLogisticsMode ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-green-200 bg-green-50'} px-2 py-1 rounded-full`}>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      Firebase Online
                 </span>
              </div>
            </div>
            <p className={`font-medium text-sm ${isLogisticsMode ? 'text-slate-400' : 'text-gray-500'}`}>
                {isLogisticsMode ? 'Painel de controle de entregas em tempo real.' : 'Visão geral de vendas, clientes e logística.'}
            </p>
          </div>
          
          {/* Métrica de Performance (Visível principalmente em Logística ou se tiver pedidos entregues) */}
          {averageDeliveryMinutes > 0 && (
             <div className={`flex items-center gap-4 p-4 rounded-2xl border ${isLogisticsMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100 shadow-sm'}`}>
                <div className="bg-blue-100 text-blue-800 p-3 rounded-xl"><Timer size={24} /></div>
                <div>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${isLogisticsMode ? 'text-slate-400' : 'text-gray-400'}`}>Média por Entrega</p>
                    <p className={`text-xl font-black ${isLogisticsMode ? 'text-white' : 'text-blue-900'}`}>{averageDeliveryMinutes} min</p>
                </div>
             </div>
          )}
        </div>

        {/* Stats - Mantido */}
        {!isLogisticsMode && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-900 p-6 rounded-[2rem] text-white shadow-xl relative overflow-hidden"><div className="absolute -right-4 -bottom-4 opacity-10"><Users size={100} /></div><p className="text-blue-200 text-[10px] font-black uppercase mb-1">Clientes</p><h2 className="text-4xl font-black">{allUsers.length}</h2></div>
                <div className="bg-amber-500 p-6 rounded-[2rem] text-white shadow-xl relative overflow-hidden"><div className="absolute -right-4 -bottom-4 opacity-10"><ShoppingBag size={100} /></div><p className="text-amber-100 text-[10px] font-black uppercase mb-1">Abandonados</p><h2 className="text-4xl font-black">{abandonedCarts.length}</h2></div>
                <div className="bg-red-600 p-6 rounded-[2rem] text-white shadow-xl relative overflow-hidden"><div className="absolute -right-4 -bottom-4 opacity-10"><Truck size={100} /></div><p className="text-red-100 text-[10px] font-black uppercase mb-1">Pedidos</p><h2 className="text-4xl font-black">{orders.length}</h2></div>
                <div className="bg-emerald-600 p-6 rounded-[2rem] text-white shadow-xl relative overflow-hidden"><div className="absolute -right-4 -bottom-4 opacity-10"><Banknote size={100} /></div><p className="text-emerald-100 text-[10px] font-black uppercase mb-1">Receita</p><h2 className="text-3xl font-black">R$ {orders.reduce((acc, o) => acc + (o.total || 0), 0).toFixed(0)}</h2></div>
            </div>
        )}

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className={`flex flex-wrap gap-2 p-1.5 rounded-2xl ${isLogisticsMode ? 'bg-slate-800' : 'bg-gray-200/50'}`}>
                <button onClick={() => setActiveTab('orders')} className={`px-4 sm:px-6 py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'orders' ? (isLogisticsMode ? 'bg-emerald-500 text-white shadow-lg' : 'bg-blue-900 text-white shadow-lg') : (isLogisticsMode ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-blue-900')}`}>Pedidos</button>
                {!isLogisticsMode && ( <> <button onClick={() => setActiveTab('users')} className={`px-4 sm:px-6 py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-500 hover:text-blue-900'}`}>Clientes</button> <button onClick={() => setActiveTab('abandoned')} className={`px-4 sm:px-6 py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'abandoned' ? 'bg-red-500 text-white shadow-lg' : 'text-gray-500 hover:text-red-500'}`}>Carrinhos</button> </> )}
            </div>
             {activeTab === 'orders' && ( <div className="flex gap-2"> <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as OrderStatus | 'all')} className={`px-4 py-2 rounded-xl text-xs font-bold border outline-none ${isLogisticsMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200 text-gray-700'}`}> <option value="all">Todos os Status</option> <option value="pending">Pendentes</option> <option value="processing">Em Separação</option> <option value="shipped">Em Rota</option> <option value="delivered">Entregues (Histórico)</option> </select> </div> )}
        </div>

        {/* Conteúdo */}
        <div className={`${isLogisticsMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} rounded-[2.5rem] shadow-sm border overflow-hidden`}>
          {activeTab === 'orders' && (
            <div className="flex flex-col">
              {/* Busca */}
              <div className={`p-4 border-b flex items-center gap-4 ${isLogisticsMode ? 'border-slate-700' : 'border-gray-50'}`}>
                <div className="relative w-full max-w-md"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className={`h-4 w-4 ${isLogisticsMode ? 'text-slate-500' : 'text-gray-400'}`} /></div><input type="text" className={`block w-full pl-10 pr-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${isLogisticsMode ? 'bg-slate-900 border-slate-700 text-white focus:ring-emerald-500' : 'bg-gray-50 border-gray-200 text-gray-900 focus:ring-blue-500'}`} placeholder="Buscar por protocolo, endereço..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className={`text-[10px] font-black uppercase tracking-widest ${isLogisticsMode ? 'bg-slate-900/50 text-slate-400' : 'bg-gray-50 text-gray-400'}`}>
                      <th className="px-6 py-4">Pedido / Pagamento</th>
                      <th className="px-6 py-4">Itens</th>
                      <th className="px-6 py-4">Status & Logística</th>
                      <th className="px-6 py-4 text-center">Ação</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isLogisticsMode ? 'divide-slate-700' : 'divide-gray-50'}`}>
                    {filteredOrders.map((order) => {
                      const action = getNextAction(order.status);
                      const isMercadoPago = order.paymentMethod === 'mercadopago';
                      return (
                        <tr key={order.id} className={`${isLogisticsMode ? 'hover:bg-slate-700/50' : 'hover:bg-blue-50/30'} transition-colors`}>
                          <td className="px-6 py-6 align-top w-64">
                             {/* Coluna 1 - Igual */}
                            <div className="flex flex-col gap-2">
                              <span className={`text-xs font-black px-2 py-1 rounded-lg w-fit ${isLogisticsMode ? 'bg-slate-700 text-white' : 'bg-blue-100 text-blue-900'}`}>{order.id}</span>
                              <div className={`flex items-center gap-2 px-2 py-1.5 rounded-lg w-fit border ${isMercadoPago ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : (isLogisticsMode ? 'bg-slate-900 text-slate-400 border-slate-700' : 'bg-gray-100 text-gray-500 border-gray-200')}`}>{isMercadoPago ? <CreditCard size={12} /> : <Banknote size={12} />}<span className="text-[10px] font-black uppercase">{isMercadoPago ? 'MERCADO PAGO' : (order.paymentMethod || 'PIX').toUpperCase()}</span></div>
                              <div className="flex items-start gap-1.5 mt-1"><MapPin size={14} className="text-red-500 shrink-0 mt-0.5" /><div><p className={`text-[11px] font-bold leading-tight ${isLogisticsMode ? 'text-slate-300' : 'text-gray-700'}`}>{order.address}</p><p className={`text-[10px] ${isLogisticsMode ? 'text-slate-500' : 'text-gray-400'}`}>{new Date(order.timestamp).toLocaleString('pt-BR')}</p></div></div>
                            </div>
                          </td>
                          <td className="px-6 py-6 align-top">
                             {/* Coluna 2 - Igual */}
                            <div className={`p-3 rounded-2xl border space-y-2 ${isLogisticsMode ? 'bg-slate-900/50 border-slate-700' : 'bg-gray-50 border-gray-100'}`}>
                                {(order.items || []).map((item, idx) => ( <div key={idx} className="flex items-center gap-3"> <div className="relative shrink-0"> <img src={item.image} className="w-8 h-8 rounded-lg object-cover" /> <span className="absolute -top-1.5 -right-1.5 bg-blue-900 text-white w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold">{item.quantity}</span> </div> <span className={`text-xs font-medium line-clamp-1 ${isLogisticsMode ? 'text-slate-300' : 'text-gray-600'}`}>{item.name}</span> </div> ))}
                                <div className={`pt-2 mt-2 border-t flex justify-between items-center ${isLogisticsMode ? 'border-slate-700' : 'border-gray-200'}`}><span className={`text-[10px] font-black uppercase ${isLogisticsMode ? 'text-slate-500' : 'text-gray-400'}`}>Total Pedido</span><span className="text-sm font-black text-red-500">R$ {(order.total || 0).toFixed(2)}</span></div>
                            </div>
                          </td>
                          <td className="px-6 py-6 align-top">
                             <div className="flex flex-col gap-2">
                              <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest w-fit flex items-center gap-2 ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : order.status === 'shipped' ? 'bg-blue-100 text-blue-700' : order.status === 'processing' ? 'bg-emerald-100 text-emerald-700' : (isLogisticsMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-200 text-gray-600')}`}>
                                {order.status === 'pending' ? <Clock size={12}/> : order.status === 'processing' ? <Package size={12}/> : order.status === 'shipped' ? <Truck size={12}/> : <CheckCircle2 size={12}/>}
                                {order.status === 'pending' ? 'AGUARDANDO' : order.status === 'processing' ? 'EM SEPARAÇÃO' : order.status === 'shipped' ? 'EM ROTA' : 'ENTREGUE'}
                              </span>
                              
                              {order.status === 'shipped' && (
                                <button onClick={() => copyTrackingLink(order.id)} className="flex items-center gap-2 text-[10px] font-bold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200">
                                    <Navigation size={12} /> Copiar Link GPS
                                </button>
                              )}
                              
                              {order.status === 'delivered' && order.deliveryProof && (
                                <div className="space-y-1 mt-1">
                                    <button onClick={() => setProofModal(order)} className="flex items-center gap-2 text-[10px] font-bold bg-green-50 text-green-600 px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors border border-green-200 w-full justify-center">
                                        <Eye size={12} /> Ver Detalhes
                                    </button>
                                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium px-1">
                                        <Timer size={10} /> Duração: <span className="font-bold text-blue-900">{getDurationString(order)}</span>
                                    </div>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-6 text-center align-middle">
                            {action ? (
                              <button onClick={() => handleUpdateStatus(order.id, action.next)} className={`${action.color} ${action.textColor} w-full py-3 rounded-xl text-[10px] font-black uppercase shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 hover:brightness-110`}>
                                <action.icon size={16} /> {action.label}
                              </button>
                            ) : order.status === 'shipped' ? (
                                <div className="text-center opacity-50">
                                    <p className="text-[10px] font-bold text-gray-400">AGUARDANDO MOTOBOY</p>
                                    <p className="text-[9px] text-gray-300">Finalização via App</p>
                                </div>
                            ) : (
                              <div className="flex flex-col items-center gap-1 text-green-600 opacity-60">
                                <CheckCircle2 size={24} /> <span className="text-[10px] font-black uppercase">Concluído</span>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'users' && ( <div className="p-8 text-center text-gray-400">Lista de Clientes (Mantida)</div> )}
          {activeTab === 'abandoned' && ( <div className="p-8 text-center text-gray-400">Carrinhos Abandonados (Mantido)</div> )}
        </div>
      </div>

      {/* Modal de Comprovante DETALHADO */}
      {proofModal && proofModal.deliveryProof && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in" onClick={() => setProofModal(null)}>
            <div className="bg-white p-8 rounded-[2rem] max-w-md w-full animate-in zoom-in-95 relative overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6 relative z-10">
                    <div>
                        <h3 className="text-xl font-black text-blue-900">Entrega Finalizada</h3>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Protocolo: {proofModal.id}</p>
                    </div>
                    <button onClick={() => setProofModal(null)} className="p-2 bg-gray-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"><CheckCircle2 size={20} /></button>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl mb-6 border border-gray-100">
                     <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
                        <span className="text-[10px] font-black uppercase text-gray-400">Tempo de Percurso</span>
                        <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-black">
                            <Timer size={16} />
                            {getDurationString(proofModal)}
                        </div>
                     </div>
                     <div className="flex justify-between items-center">
                        <div>
                             <p className="text-[10px] font-black uppercase text-gray-400">Início Rota</p>
                             <p className="text-xs font-bold text-gray-700">{proofModal.shippedAt ? new Date(proofModal.shippedAt).toLocaleTimeString() : '--:--'}</p>
                        </div>
                        <ArrowLeft size={16} className="text-gray-300 rotate-180" />
                        <div className="text-right">
                             <p className="text-[10px] font-black uppercase text-gray-400">Entrega</p>
                             <p className="text-xs font-bold text-gray-700">{new Date(proofModal.deliveryProof.timestamp).toLocaleTimeString()}</p>
                        </div>
                     </div>
                </div>

                <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden mb-6 border-2 border-dashed border-gray-200 relative group">
                    <img src={proofModal.deliveryProof.photo} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white font-bold text-xs flex items-center gap-2"><ImageIcon size={16} /> Foto do Local</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-4 bg-green-50 p-4 rounded-2xl border border-green-100">
                        <div className="bg-green-500 p-2 rounded-xl text-white"><UserIcon size={20} /></div>
                        <div>
                            <p className="text-[10px] font-black uppercase text-green-700">Recebido Por</p>
                            <p className="font-black text-lg text-blue-900 leading-none">{proofModal.deliveryProof.recipientName}</p>
                        </div>
                    </div>
                    
                    <div className="text-center">
                        <p className="text-[10px] text-gray-400">Entregue em {new Date(proofModal.deliveryProof.timestamp).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
