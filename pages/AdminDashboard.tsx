
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
  Filter
} from 'lucide-react';
import { User, Order, OrderStatus } from '../types';
import { Link, Navigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';

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

  // Carrega Usuários do Firestore em Tempo Real
  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) return;

    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const usersList: User[] = [];
        snapshot.forEach((doc) => {
            const userData = doc.data() as User;
            // Filtra o próprio admin da lista se desejar, mas mantém aqui para métricas
            if (userData.email !== 'lucasaviladark@gmail.com') {
                usersList.push({ ...userData, id: doc.id });
            }
        });
        setAllUsers(usersList);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // SEGURANÇA: Exige login e permissão de admin para qualquer modo
  if (!currentUser || !currentUser.isAdmin) {
    return <Navigate to="/" />;
  }

  const abandonedCarts = useMemo(() => {
    return allUsers.filter(u => u.persistedCart && u.persistedCart.length > 0);
  }, [allUsers]);

  const filteredOrders = useMemo(() => {
    let result = orders;
    
    // Filtro de Texto
    if (searchQuery) {
      result = result.filter(order => 
        (order.id || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (order.address || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtro de Status
    if (filterStatus !== 'all') {
      result = result.filter(order => order.status === filterStatus);
    }

    // Ordenação: Pendentes primeiro, depois por data
    return result.sort((a, b) => {
      if (a.status === 'pending' && b.status !== 'pending') return -1;
      if (a.status !== 'pending' && b.status === 'pending') return 1;
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }, [orders, searchQuery, filterStatus]);

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

  // --- LÓGICA DOS BOTÕES DE AÇÃO ---
  const getNextAction = (current: OrderStatus) => {
    switch(current) {
      case 'pending': 
        return { 
          next: 'processing' as OrderStatus, 
          label: 'INICIAR SEPARAÇÃO', 
          icon: Package,
          color: 'bg-emerald-500 hover:bg-emerald-600',
          textColor: 'text-white',
          desc: 'Aprovar Pagamento'
        };
      case 'processing': 
        return { 
          next: 'shipped' as OrderStatus, 
          label: 'SAIR PARA ENTREGA', 
          icon: Truck,
          color: 'bg-blue-600 hover:bg-blue-700',
          textColor: 'text-white',
          desc: 'Enviar Motoboy'
        };
      case 'shipped': 
        return { 
          next: 'delivered' as OrderStatus, 
          label: 'CONFIRMAR ENTREGA', 
          icon: CheckCircle2,
          color: 'bg-green-600 hover:bg-green-700',
          textColor: 'text-white',
          desc: 'Finalizar Pedido'
        };
      default: return null;
    }
  };

  const handleUpdateStatus = (id: string, nextStatus: OrderStatus) => {
    if (window.confirm('Confirmar mudança de status do pedido?')) {
      updateOrderStatus(id, nextStatus);
    }
  };

  const wrapperClass = isLogisticsMode 
    ? "min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-slate-900 text-slate-100" 
    : "min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 text-gray-900";

  return (
    <div className={wrapperClass}>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
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
        </div>

        {/* STATS (Apenas Admin Normal) */}
        {!isLogisticsMode && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-900 p-6 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-10"><Users size={100} /></div>
                <p className="text-blue-200 text-[10px] font-black uppercase mb-1">Clientes</p>
                <h2 className="text-4xl font-black">{allUsers.length}</h2>
            </div>
            <div className="bg-amber-500 p-6 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-10"><ShoppingBag size={100} /></div>
                <p className="text-amber-100 text-[10px] font-black uppercase mb-1">Abandonados</p>
                <h2 className="text-4xl font-black">{abandonedCarts.length}</h2>
            </div>
            <div className="bg-red-600 p-6 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-10"><Truck size={100} /></div>
                <p className="text-red-100 text-[10px] font-black uppercase mb-1">Pedidos</p>
                <h2 className="text-4xl font-black">{orders.length}</h2>
            </div>
            <div className="bg-emerald-600 p-6 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-10"><Banknote size={100} /></div>
                <p className="text-emerald-100 text-[10px] font-black uppercase mb-1">Receita</p>
                <h2 className="text-3xl font-black">R$ {orders.reduce((acc, o) => acc + (o.total || 0), 0).toFixed(0)}</h2>
            </div>
            </div>
        )}

        {/* TABS E FILTROS */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className={`flex flex-wrap gap-2 p-1.5 rounded-2xl ${isLogisticsMode ? 'bg-slate-800' : 'bg-gray-200/50'}`}>
            <button 
                onClick={() => setActiveTab('orders')}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'orders' ? (isLogisticsMode ? 'bg-emerald-500 text-white shadow-lg' : 'bg-blue-900 text-white shadow-lg') : (isLogisticsMode ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-blue-900')}`}
            >
                Pedidos {orders.filter(o => o.status !== 'delivered').length > 0 && <span className={`px-1.5 py-0.5 rounded text-[9px] ${isLogisticsMode ? 'bg-white text-emerald-900' : 'bg-white text-blue-900'}`}>{orders.filter(o => o.status !== 'delivered').length}</span>}
            </button>
            
            {!isLogisticsMode && (
                <>
                    <button 
                        onClick={() => setActiveTab('users')}
                        className={`px-4 sm:px-6 py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-500 hover:text-blue-900'}`}
                    >
                        Clientes
                    </button>
                    <button 
                        onClick={() => setActiveTab('abandoned')}
                        className={`px-4 sm:px-6 py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'abandoned' ? 'bg-red-500 text-white shadow-lg' : 'text-gray-500 hover:text-red-500'}`}
                    >
                        Carrinhos
                    </button>
                </>
            )}
            </div>
            
            {activeTab === 'orders' && (
               <div className="flex gap-2">
                 <select 
                   value={filterStatus}
                   onChange={(e) => setFilterStatus(e.target.value as OrderStatus | 'all')}
                   className={`px-4 py-2 rounded-xl text-xs font-bold border outline-none ${isLogisticsMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200 text-gray-700'}`}
                 >
                   <option value="all">Todos os Status</option>
                   <option value="pending">Pendentes</option>
                   <option value="processing">Em Separação</option>
                   <option value="shipped">Em Rota</option>
                   <option value="delivered">Entregues</option>
                 </select>
               </div>
            )}
        </div>

        {/* CONTEÚDO PRINCIPAL */}
        <div className={`${isLogisticsMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} rounded-[2.5rem] shadow-sm border overflow-hidden`}>
          
          {/* TAB: PEDIDOS */}
          {activeTab === 'orders' && (
            <div className="flex flex-col">
              {/* Barra de Busca */}
              <div className={`p-4 border-b flex items-center gap-4 ${isLogisticsMode ? 'border-slate-700' : 'border-gray-50'}`}>
                <div className="relative w-full max-w-md">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <Search className={`h-4 w-4 ${isLogisticsMode ? 'text-slate-500' : 'text-gray-400'}`} />
                   </div>
                   <input
                     type="text"
                     className={`block w-full pl-10 pr-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${isLogisticsMode ? 'bg-slate-900 border-slate-700 text-white focus:ring-emerald-500' : 'bg-gray-50 border-gray-200 text-gray-900 focus:ring-blue-500'}`}
                     placeholder="Buscar por protocolo, endereço..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                   />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className={`text-[10px] font-black uppercase tracking-widest ${isLogisticsMode ? 'bg-slate-900/50 text-slate-400' : 'bg-gray-50 text-gray-400'}`}>
                      <th className="px-6 py-4">Pedido / Pagamento</th>
                      <th className="px-6 py-4">Itens</th>
                      <th className="px-6 py-4">Status Logístico</th>
                      <th className="px-6 py-4 text-center">Ação Requerida</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isLogisticsMode ? 'divide-slate-700' : 'divide-gray-50'}`}>
                    {filteredOrders.map((order) => {
                      const action = getNextAction(order.status);
                      const isMercadoPago = order.paymentMethod === 'mercadopago';
                      
                      return (
                        <tr key={order.id} className={`${isLogisticsMode ? 'hover:bg-slate-700/50' : 'hover:bg-blue-50/30'} transition-colors`}>
                          <td className="px-6 py-6 align-top w-64">
                            <div className="flex flex-col gap-2">
                              <span className={`text-xs font-black px-2 py-1 rounded-lg w-fit ${isLogisticsMode ? 'bg-slate-700 text-white' : 'bg-blue-100 text-blue-900'}`}>
                                {order.id}
                              </span>
                              
                              <div className={`flex items-center gap-2 px-2 py-1.5 rounded-lg w-fit border ${
                                isMercadoPago 
                                  ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' 
                                  : (isLogisticsMode ? 'bg-slate-900 text-slate-400 border-slate-700' : 'bg-gray-100 text-gray-500 border-gray-200')
                              }`}>
                                {isMercadoPago ? <CreditCard size={12} /> : <Banknote size={12} />}
                                <span className="text-[10px] font-black uppercase">
                                  {isMercadoPago ? 'MERCADO PAGO' : (order.paymentMethod || 'PIX').toUpperCase()}
                                </span>
                              </div>

                              <div className="flex items-start gap-1.5 mt-1">
                                <MapPin size={14} className="text-red-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className={`text-[11px] font-bold leading-tight ${isLogisticsMode ? 'text-slate-300' : 'text-gray-700'}`}>{order.address}</p>
                                    <p className={`text-[10px] ${isLogisticsMode ? 'text-slate-500' : 'text-gray-400'}`}>{new Date(order.timestamp).toLocaleString('pt-BR')}</p>
                                </div>
                              </div>
                            </div>
                          </td>
                          
                          <td className="px-6 py-6 align-top">
                            <div className={`p-3 rounded-2xl border space-y-2 ${isLogisticsMode ? 'bg-slate-900/50 border-slate-700' : 'bg-gray-50 border-gray-100'}`}>
                                {(order.items || []).map((item, idx) => (
                                  <div key={idx} className="flex items-center gap-3">
                                    <div className="relative shrink-0">
                                        <img src={item.image} className="w-8 h-8 rounded-lg object-cover" />
                                        <span className="absolute -top-1.5 -right-1.5 bg-blue-900 text-white w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold">{item.quantity}</span>
                                    </div>
                                    <span className={`text-xs font-medium line-clamp-1 ${isLogisticsMode ? 'text-slate-300' : 'text-gray-600'}`}>{item.name}</span>
                                  </div>
                                ))}
                                <div className={`pt-2 mt-2 border-t flex justify-between items-center ${isLogisticsMode ? 'border-slate-700' : 'border-gray-200'}`}>
                                    <span className={`text-[10px] font-black uppercase ${isLogisticsMode ? 'text-slate-500' : 'text-gray-400'}`}>Total Pedido</span>
                                    <span className="text-sm font-black text-red-500">R$ {(order.total || 0).toFixed(2)}</span>
                                </div>
                            </div>
                          </td>

                          <td className="px-6 py-6 align-top">
                             <div className="flex flex-col gap-2">
                              <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest w-fit flex items-center gap-2 ${
                                order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                order.status === 'processing' ? 'bg-emerald-100 text-emerald-700' : 
                                (isLogisticsMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-200 text-gray-600')
                              }`}>
                                {order.status === 'pending' ? <Clock size={12}/> : 
                                 order.status === 'processing' ? <Package size={12}/> : 
                                 order.status === 'shipped' ? <Truck size={12}/> : <CheckCircle2 size={12}/>}
                                
                                {order.status === 'pending' ? 'AGUARDANDO' : 
                                 order.status === 'processing' ? 'EM SEPARAÇÃO' : 
                                 order.status === 'shipped' ? 'EM ROTA' : 'ENTREGUE'}
                              </span>
                              
                              {order.status === 'pending' && isMercadoPago && (
                                <div className="text-[10px] text-green-600 font-bold flex items-center gap-1 animate-pulse">
                                  <Zap size={12} /> Pagamento MP Confirmado?
                                </div>
                              )}
                            </div>
                          </td>

                          <td className="px-6 py-6 text-center align-middle">
                            {action ? (
                              <button 
                                onClick={() => handleUpdateStatus(order.id, action.next)}
                                className={`${action.color} ${action.textColor} w-full py-3 rounded-xl text-[10px] font-black uppercase shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 hover:brightness-110`}
                              >
                                <action.icon size={16} /> {action.label}
                              </button>
                            ) : (
                              <div className="flex flex-col items-center gap-1 text-green-600 opacity-60">
                                <CheckCircle2 size={24} />
                                <span className="text-[10px] font-black uppercase">Concluído</span>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                    {filteredOrders.length === 0 && (
                      <tr><td colSpan={4} className={`py-20 text-center opacity-30 font-black uppercase tracking-widest ${isLogisticsMode ? 'text-slate-500' : 'text-gray-400'}`}>
                        Nenhum pedido encontrado com este filtro
                      </td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: CLIENTES (Código original mantido para integridade) */}
          {activeTab === 'users' && (
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <th className="px-8 py-5">Cliente</th>
                      <th className="px-8 py-5">WhatsApp</th>
                      <th className="px-8 py-5 text-center">Nível</th>
                      <th className="px-8 py-5 text-center">Contato</th>
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
          )}

          {/* TAB: ABANDONADOS (Código original mantido) */}
          {activeTab === 'abandoned' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <th className="px-8 py-5">Cliente / Tempo</th>
                      <th className="px-8 py-5">Valor Carrinho</th>
                      <th className="px-8 py-5 text-center">Recuperação</th>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
