
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
  RefreshCcw,
  Search,
  Users,
  AlertTriangle
} from 'lucide-react';
import { User, Order, OrderStatus } from '../types';
import { Link, Navigate } from 'react-router-dom';

const AdminDashboard = ({ 
  currentUser, 
  orders: propOrders = [], 
  updateOrderStatus,
  isLogisticsMode = false // Novo modo para acesso operacional
}: { 
  currentUser: User | null, 
  orders: Order[],
  updateOrderStatus: (id: string, s: OrderStatus) => void,
  isLogisticsMode?: boolean
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'abandoned' | 'orders'>('orders');
  const [localOrders, setLocalOrders] = useState<Order[]>(propOrders);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // POLLING AGRESSIVO PARA MODO LOGÍSTICO (1s)
  useEffect(() => {
    fetchOrdersFromDB(); 
    const intervalTime = isLogisticsMode ? 1000 : 3000; 
    const interval = setInterval(() => {
      fetchOrdersFromDB(true); 
    }, intervalTime);
    return () => clearInterval(interval);
  }, [isLogisticsMode]);

  const fetchOrdersFromDB = (silent = false) => {
    if (!silent) setIsRefreshing(true);
    try {
      const savedOrders = localStorage.getItem('aki_orders');
      if (savedOrders) {
        const parsed = JSON.parse(savedOrders);
        if (Array.isArray(parsed)) {
          // Ordena por timestamp de forma segura
          parsed.sort((a: any, b: any) => {
            const timeA = new Date(a.timestamp || 0).getTime();
            const timeB = new Date(b.timestamp || 0).getTime();
            return timeB - timeA;
          });
          setLocalOrders(parsed);
        }
      } else {
        setLocalOrders([]);
      }
    } catch (error) {
      console.error("Erro ao sincronizar pedidos:", error);
    } finally {
      if (!silent) setTimeout(() => setIsRefreshing(false), 300); 
    }
  };

  // Se NÃO for modo logístico E o usuário não for admin, redireciona
  if (!isLogisticsMode && (!currentUser || !currentUser.isAdmin)) {
    return <Navigate to="/" />;
  }

  // Parsing seguro de usuários
  const allUsers: User[] = useMemo(() => {
    try {
      const usersStr = localStorage.getItem('aki_users');
      if (!usersStr) return [];
      const users = JSON.parse(usersStr);
      if (!Array.isArray(users)) return [];
      return users.filter((u: any) => u.email !== 'lucasaviladark@gmail.com');
    } catch (e) {
      console.error("Erro ao ler usuários", e);
      return [];
    }
  }, [isRefreshing]); 

  const abandonedCarts = useMemo(() => {
    return allUsers.filter(u => u.persistedCart && u.persistedCart.length > 0);
  }, [allUsers]);

  const filteredOrders = useMemo(() => {
    if (!searchQuery) return localOrders;
    return localOrders.filter(order => 
      (order.id || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [localOrders, searchQuery]);

  const getAbandonedTime = (timestamp?: string) => {
    if (!timestamp) return 'Tempo desconhecido';
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const mins = Math.floor(diff / 60000);
      const hours = Math.floor(mins / 60);
      
      if (hours > 0) return `${hours}h ${mins % 60}min atrás`;
      return `${mins}min atrás`;
    } catch (e) {
      return 'Data inválida';
    }
  };

  const sendReminder = (user: User) => {
    const message = `Olá ${user.name}! 🛒 Notamos que você deixou alguns itens incríveis no seu carrinho na TudoAki Express Cascavel. 

Finalize sua compra agora e garanta sua entrega hoje mesmo! 

Acesse seu carrinho aqui: ${window.location.origin}/#/checkout

Dúvidas? Estamos aqui para ajudar!`;
    
    const encoded = encodeURIComponent(message);
    const whatsapp = (user.whatsapp || '').replace(/\D/g, '');
    window.open(`https://wa.me/55${whatsapp}?text=${encoded}`, '_blank');
  };

  const getNextAction = (current: OrderStatus) => {
    switch(current) {
      case 'pending': 
        return { 
          next: 'processing' as OrderStatus, 
          label: 'APROVAR PAGAMENTO', 
          icon: Banknote,
          color: 'bg-green-600 hover:bg-green-700',
          desc: 'Confirmar recebimento manual'
        };
      case 'processing': 
        return { 
          next: 'shipped' as OrderStatus, 
          label: 'DESPACHAR MOTOBOY', 
          icon: Truck,
          color: 'bg-amber-500 hover:bg-amber-600',
          desc: 'Enviar para Rota'
        };
      case 'shipped': 
        return { 
          next: 'delivered' as OrderStatus, 
          label: 'CONFIRMAR ENTREGA', 
          icon: CheckCircle2,
          color: 'bg-blue-600 hover:bg-blue-700',
          desc: 'Finalizar Pedido'
        };
      default: return null;
    }
  };

  const handleUpdateStatus = (id: string, nextStatus: OrderStatus) => {
    updateOrderStatus(id, nextStatus);
    setTimeout(() => fetchOrdersFromDB(), 50); 
  };

  // Wrapper Style
  const wrapperClass = isLogisticsMode 
    ? "min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-slate-800" 
    : "min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gray-50";

  return (
    <div className={wrapperClass}>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            {!isLogisticsMode && (
              <Link to="/account" className="inline-flex items-center gap-2 text-xs font-black text-red-500 uppercase tracking-widest hover:underline mb-2">
                <ArrowLeft className="h-3 w-3" /> Painel da Minha Conta
              </Link>
            )}
            <div className="flex items-center gap-4">
              <h1 className={`text-4xl font-black tracking-tighter ${isLogisticsMode ? 'text-white' : 'text-blue-900'}`}>
                {isLogisticsMode ? 'Terminal Logístico' : 'Gestão de Vendas Cascavel'}
              </h1>
              <div className="flex items-center gap-2">
                 <button 
                  onClick={() => fetchOrdersFromDB()} 
                  className={`p-2 rounded-full border border-gray-200 shadow-sm transition-all ${isRefreshing ? 'animate-spin' : ''} ${isLogisticsMode ? 'bg-slate-700 text-white border-slate-600 hover:bg-slate-600' : 'bg-white text-blue-900 hover:bg-blue-50'}`}
                  title="Sincronizar Banco de Dados"
                >
                  <RefreshCcw size={20} />
                </button>
                <div className="flex flex-col">
                    <span className={`text-[10px] font-bold uppercase ${isLogisticsMode ? 'text-emerald-400' : 'text-gray-400'} animate-pulse flex items-center gap-1`}>
                         <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                         DB Online
                    </span>
                </div>
              </div>
            </div>
            <p className={`font-medium ${isLogisticsMode ? 'text-slate-400' : 'text-gray-500'}`}>
                {isLogisticsMode ? 'Operação de Separação e Entrega em Tempo Real' : 'Controle total de clientes, leads e logística.'}
            </p>
          </div>
        </div>

        {/* STATS (Apenas Admin Normal) */}
        {!isLogisticsMode && (
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
                <h2 className="text-5xl font-black">{localOrders.length}</h2>
            </div>
            <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-10"><Banknote size={120} /></div>
                <p className="text-emerald-100 text-xs font-black uppercase mb-2">Receita Total</p>
                <h2 className="text-5xl font-black">R$ {localOrders.reduce((acc, o) => acc + (o.total || 0), 0).toFixed(0)}</h2>
            </div>
            </div>
        )}

        {/* TABS */}
        <div className={`flex flex-wrap gap-2 p-1.5 rounded-2xl w-fit ${isLogisticsMode ? 'bg-slate-700/50' : 'bg-gray-200/50'}`}>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'orders' ? (isLogisticsMode ? 'bg-emerald-500 text-white shadow-lg' : 'bg-blue-900 text-white shadow-lg') : (isLogisticsMode ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-blue-900')}`}
          >
            Terminal de Pedidos {localOrders.filter(o => o.status !== 'delivered').length > 0 && <span className={`px-2 py-0.5 rounded-md text-[9px] ${isLogisticsMode ? 'bg-white text-emerald-900' : 'bg-white text-blue-900'}`}>{localOrders.filter(o => o.status !== 'delivered').length}</span>}
          </button>
          
          {!isLogisticsMode && (
            <>
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
            </>
          )}
        </div>

        {/* TABLE CONTENT */}
        <div className={`${isLogisticsMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'} rounded-[3rem] shadow-sm border overflow-hidden`}>
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
                            <div className="w-10 h-10 bg-blue-900 text-white rounded-xl flex items-center justify-center font-black">{user.name?.charAt(0) || 'U'}</div>
                            <span className="text-sm font-bold text-blue-900">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6"><span className="text-sm font-black text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg">{user.whatsapp}</span></td>
                        <td className="px-8 py-6 text-center"><span className="px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-[10px] font-black uppercase">{user.tier}</span></td>
                        <td className="px-8 py-6 text-center"><a href={`https://wa.me/55${(user.whatsapp || '').replace(/\D/g, '')}`} target="_blank" className="text-green-500 hover:bg-green-50 p-2 rounded-lg inline-block"><MessageCircle /></a></td>
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
                        <td className="px-8 py-6"><span className="text-sm font-black text-blue-900">R$ {(user.persistedCart || []).reduce((acc, i) => acc + (i.price * i.quantity), 0).toFixed(2)}</span></td>
                        <td className="px-8 py-6 text-center"><button onClick={() => sendReminder(user)} className="bg-red-500 text-white px-4 py-2 rounded-xl font-black text-[10px] uppercase hover:bg-red-600 transition-all">Notificar WhatsApp</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          ) : (
            <div className="flex flex-col">
              <div className={`p-6 border-b flex items-center gap-4 ${isLogisticsMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50/30 border-gray-50'}`}>
                <div className="relative w-full max-w-md">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <Search className={`h-4 w-4 ${isLogisticsMode ? 'text-slate-400' : 'text-gray-400'}`} />
                   </div>
                   <input
                     type="text"
                     className={`block w-full pl-10 pr-3 py-3 border rounded-xl leading-5 placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm transition-all ${isLogisticsMode ? 'bg-slate-900 border-slate-700 text-white focus:ring-emerald-500 focus:border-emerald-500' : 'bg-white border-gray-200 text-gray-900 focus:ring-blue-500 focus:border-blue-500'}`}
                     placeholder="Buscar pedido (Protocolo)"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                   />
                </div>
                {searchQuery && (
                  <span className={`text-xs font-bold animate-in fade-in ${isLogisticsMode ? 'text-slate-400' : 'text-gray-400'}`}>
                    Mostrando {filteredOrders.length} resultados
                  </span>
                )}
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className={`text-[10px] font-black uppercase tracking-widest ${isLogisticsMode ? 'bg-slate-800 text-slate-400' : 'bg-gray-50 text-gray-400'}`}>
                      <th className="px-8 py-5">Protocolo / Data</th>
                      <th className="px-8 py-5">Lista de Separação</th>
                      <th className="px-8 py-5">Status Atual</th>
                      <th className="px-8 py-5 text-center">Ação Logística</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isLogisticsMode ? 'divide-slate-800' : 'divide-gray-50'}`}>
                    {filteredOrders.map((order) => {
                      const action = getNextAction(order.status);
                      
                      return (
                        <tr key={order.id} className={`${isLogisticsMode ? 'hover:bg-slate-800/50' : 'hover:bg-blue-50/30'} transition-colors`}>
                          <td className="px-8 py-6 align-top w-48">
                            <div className="flex flex-col">
                              <span className={`text-sm font-black px-2 py-1 rounded-md w-fit mb-1 ${isLogisticsMode ? 'bg-slate-700 text-white' : 'bg-blue-100 text-blue-900'}`}>{order.id}</span>
                              <span className={`text-[10px] font-bold ${isLogisticsMode ? 'text-slate-500' : 'text-gray-400'}`}>
                                {order.timestamp ? new Date(order.timestamp).toLocaleString() : '-'}
                              </span>
                              <div className={`mt-2 text-[10px] font-bold px-2 py-1 rounded-md w-fit ${isLogisticsMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-500'}`}>
                                PGTO: {(order.paymentMethod || '').toUpperCase()}
                              </div>
                               <div className="mt-2 flex items-start gap-1">
                                <MapPin size={12} className="text-red-500 mt-0.5 shrink-0" />
                                <span className={`text-[10px] font-bold leading-tight w-32 ${isLogisticsMode ? 'text-slate-400' : 'text-gray-600'}`}>{order.address}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 align-top">
                            <div className={`rounded-2xl p-4 border ${isLogisticsMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-100'}`}>
                               <div className="space-y-2">
                                {(order.items || []).map((item, idx) => (
                                  <div key={idx} className={`flex items-center gap-3 p-2 rounded-xl border shadow-sm ${isLogisticsMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-100'}`}>
                                    <div className="relative">
                                        <img src={item.image} className="w-10 h-10 rounded-lg object-cover" />
                                        <span className="absolute -top-2 -right-2 bg-blue-900 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black">{item.quantity}x</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`text-xs font-bold line-clamp-1 ${isLogisticsMode ? 'text-white' : 'text-blue-900'}`}>{item.name}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className={`mt-3 pt-2 border-t flex justify-between items-center ${isLogisticsMode ? 'border-slate-700' : 'border-gray-200'}`}>
                                <span className={`text-[10px] font-black uppercase ${isLogisticsMode ? 'text-slate-400' : 'text-blue-900'}`}>Total</span>
                                <span className="text-sm font-black text-red-500">R$ {(order.total || 0).toFixed(2)}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 align-top">
                             <div className="flex flex-col gap-2">
                              <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter w-fit flex items-center gap-2 ${
                                order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                order.status === 'processing' ? 'bg-emerald-100 text-emerald-700' : (isLogisticsMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-200 text-gray-600')
                              }`}>
                                {order.status === 'pending' ? <Clock size={14}/> : 
                                 order.status === 'processing' ? <Package size={14}/> : 
                                 order.status === 'shipped' ? <Truck size={14}/> : <CheckCircle2 size={14}/>}
                                
                                {order.status === 'pending' ? 'AGUARDANDO PGTO' : 
                                 order.status === 'processing' ? 'EM SEPARAÇÃO' : 
                                 order.status === 'shipped' ? 'EM ROTA' : 'ENTREGUE'}
                              </span>
                              {order.status === 'pending' && (
                                <span className="text-[9px] text-red-500 font-bold flex items-center gap-1">
                                  <AlertTriangle size={10} /> Verificar PIX
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-8 py-6 text-center align-top">
                            {action ? (
                              <button 
                                onClick={() => handleUpdateStatus(order.id, action.next)}
                                className={`${action.color} text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase shadow-xl transition-all flex items-center gap-2 w-full justify-center active:scale-95 hover:brightness-110`}
                              >
                                <action.icon size={16} className="fill-white/20" /> {action.label}
                              </button>
                            ) : (
                              <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
                                <span className="text-green-600 font-black text-[10px] uppercase flex items-center justify-center gap-2">
                                  <CheckCircle2 size={20} /> Entregue
                                </span>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                    {filteredOrders.length === 0 && (
                      <tr><td colSpan={4} className={`py-20 text-center opacity-20 font-black uppercase tracking-widest ${isLogisticsMode ? 'text-slate-500' : 'text-gray-300'}`}>
                        {searchQuery ? 'Nenhum pedido encontrado' : 'Nenhum pedido no sistema'}
                      </td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
