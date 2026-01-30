
import React, { useMemo, useState, useEffect } from 'react';
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
  Truck,
  MapPin,
  Banknote,
  RefreshCcw,
  Search
} from 'lucide-react';
import { User, Order, OrderStatus } from '../types';
import { Link, Navigate } from 'react-router-dom';

const AdminDashboard = ({ 
  currentUser, 
  orders: propOrders = [], // Renomeado para diferenciar do estado local
  updateOrderStatus 
}: { 
  currentUser: User | null, 
  orders: Order[],
  updateOrderStatus: (id: string, s: OrderStatus) => void
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'abandoned' | 'orders'>('users');
  const [localOrders, setLocalOrders] = useState<Order[]>(propOrders);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sincroniza com as props iniciais, mas permite atualização manual
  useEffect(() => {
    fetchOrdersFromDB();
  }, [propOrders]);

  // Função para ler diretamente do "Banco de Dados" (LocalStorage)
  const fetchOrdersFromDB = () => {
    setIsRefreshing(true);
    try {
      const savedOrders = localStorage.getItem('aki_orders');
      if (savedOrders) {
        const parsed: Order[] = JSON.parse(savedOrders);
        // Ordena do mais recente para o mais antigo
        parsed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setLocalOrders(parsed);
      } else {
        setLocalOrders([]);
      }
    } catch (error) {
      console.error("Erro ao sincronizar pedidos:", error);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500); // Feedback visual rápido
    }
  };

  if (!currentUser || !currentUser.isAdmin) {
    return <Navigate to="/" />;
  }

  const allUsers: User[] = useMemo(() => {
    const users = JSON.parse(localStorage.getItem('aki_users') || '[]');
    return users.filter((u: any) => u.email !== 'lucasaviladark@gmail.com');
  }, [isRefreshing]); // Recarrega usuários também ao atualizar

  const abandonedCarts = useMemo(() => {
    return allUsers.filter(u => u.persistedCart && u.persistedCart.length > 0);
  }, [allUsers]);

  const filteredOrders = useMemo(() => {
    if (!searchQuery) return localOrders;
    return localOrders.filter(order => 
      order.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [localOrders, searchQuery]);

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

  // Lógica de Avanço de Status Personalizada
  const getNextAction = (current: OrderStatus) => {
    switch(current) {
      case 'pending': 
        return { 
          next: 'processing' as OrderStatus, 
          label: 'Aprovar & Separar', 
          icon: Package,
          color: 'bg-emerald-600 hover:bg-emerald-700',
          desc: 'Liberar para Estoque'
        };
      case 'processing': 
        return { 
          next: 'shipped' as OrderStatus, 
          label: 'Despachar Entrega', 
          icon: Truck,
          color: 'bg-amber-500 hover:bg-amber-600',
          desc: 'Enviar Motoboy'
        };
      case 'shipped': 
        return { 
          next: 'delivered' as OrderStatus, 
          label: 'Confirmar Entrega', 
          icon: CheckCircle2,
          color: 'bg-blue-600 hover:bg-blue-700',
          desc: 'Finalizar Pedido'
        };
      default: return null;
    }
  };

  const handleUpdateStatus = (id: string, nextStatus: OrderStatus) => {
    updateOrderStatus(id, nextStatus);
    // Pequeno delay para permitir que o React propague a mudança e salvamento no LocalStorage
    setTimeout(() => fetchOrdersFromDB(), 100); 
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link to="/account" className="inline-flex items-center gap-2 text-xs font-black text-red-500 uppercase tracking-widest hover:underline mb-2">
              <ArrowLeft className="h-3 w-3" /> Painel da Minha Conta
            </Link>
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-black text-blue-900 tracking-tighter">Gestão de Vendas Cascavel</h1>
              <button 
                onClick={fetchOrdersFromDB} 
                className={`p-2 rounded-full bg-white border border-gray-200 text-blue-900 shadow-sm hover:bg-blue-50 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
                title="Sincronizar Banco de Dados"
              >
                <RefreshCcw size={20} />
              </button>
            </div>
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
            <h2 className="text-5xl font-black">{localOrders.length}</h2>
          </div>
          <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10"><Banknote size={120} /></div>
            <p className="text-emerald-100 text-xs font-black uppercase mb-2">Receita Total</p>
            <h2 className="text-5xl font-black">R$ {localOrders.reduce((acc, o) => acc + o.total, 0).toFixed(0)}</h2>
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
            Controle Logístico {localOrders.filter(o => o.status !== 'delivered').length > 0 && <span className="bg-white text-blue-900 px-2 py-0.5 rounded-md text-[9px]">{localOrders.filter(o => o.status !== 'delivered').length}</span>}
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
            <div className="flex flex-col">
              <div className="p-6 border-b border-gray-50 bg-gray-50/30 flex items-center gap-4">
                <div className="relative w-full max-w-md">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <Search className="h-4 w-4 text-gray-400" />
                   </div>
                   <input
                     type="text"
                     className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                     placeholder="Buscar pedido por Protocolo (Ex: ORD-AB12)"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                   />
                </div>
                {searchQuery && (
                  <span className="text-xs font-bold text-gray-400 animate-in fade-in">
                    Mostrando {filteredOrders.length} resultados
                  </span>
                )}
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <th className="px-8 py-5">ID / Data</th>
                      <th className="px-8 py-5">Detalhes do Pedido</th>
                      <th className="px-8 py-5">Status Atual</th>
                      <th className="px-8 py-5 text-center">Ação do Proprietário</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredOrders.map((order) => {
                      const action = getNextAction(order.status);
                      
                      return (
                        <tr key={order.id} className="hover:bg-blue-50/30 transition-colors">
                          <td className="px-8 py-6 align-top">
                            <div className="flex flex-col">
                              <span className="text-sm font-black text-blue-900">{order.id}</span>
                              <span className="text-[10px] text-gray-400 font-bold">{new Date(order.timestamp).toLocaleString()}</span>
                              <div className="mt-2 text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md w-fit">
                                {order.paymentMethod.toUpperCase()}
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 align-top">
                            <div className="flex flex-col gap-2">
                              <div className="flex items-start gap-2">
                                <MapPin size={14} className="text-red-500 mt-0.5 shrink-0" />
                                <span className="text-xs font-bold text-gray-700 w-48">{order.address}</span>
                              </div>
                              <div className="space-y-1 mt-1">
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="text-[10px] text-gray-500 flex justify-between w-48 border-b border-gray-100 pb-1">
                                    <span>{item.quantity}x {item.name.substring(0, 20)}...</span>
                                    <span className="font-bold">R$ {(item.price * item.quantity).toFixed(0)}</span>
                                  </div>
                                ))}
                                <div className="flex justify-between w-48 pt-1">
                                  <span className="text-[10px] font-black uppercase text-blue-900">Total</span>
                                  <span className="text-xs font-black text-red-500">R$ {order.total.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 align-top">
                             <div className="flex flex-col gap-2">
                              <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter w-fit flex items-center gap-2 ${
                                order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                order.status === 'processing' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'
                              }`}>
                                {order.status === 'pending' ? <Clock size={12}/> : 
                                 order.status === 'processing' ? <Package size={12}/> : 
                                 order.status === 'shipped' ? <Truck size={12}/> : <CheckCircle2 size={12}/>}
                                
                                {order.status === 'pending' ? 'Pendente' : 
                                 order.status === 'processing' ? 'Em Separação' : 
                                 order.status === 'shipped' ? 'Em Rota' : 'Entregue'}
                              </span>
                              {order.status === 'pending' && <span className="text-[9px] text-red-400 font-bold">Aguardando Pagamento ou Confirmação</span>}
                            </div>
                          </td>
                          <td className="px-8 py-6 text-center align-top">
                            {action ? (
                              <div className="flex flex-col items-center gap-2">
                                <button 
                                  onClick={() => handleUpdateStatus(order.id, action.next)}
                                  className={`${action.color} text-white px-5 py-3 rounded-xl text-[10px] font-black uppercase shadow-lg transition-all flex items-center gap-2 w-full justify-center active:scale-95`}
                                >
                                  <action.icon size={14} className="fill-white/20" /> {action.label}
                                </button>
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{action.desc}</span>
                              </div>
                            ) : (
                              <div className="bg-green-50 p-3 rounded-xl border border-green-100">
                                <span className="text-green-600 font-black text-[10px] uppercase flex items-center justify-center gap-2">
                                  <CheckCircle2 size={16} /> Ciclo Finalizado
                                </span>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                    {filteredOrders.length === 0 && (
                      <tr><td colSpan={4} className="py-20 text-center opacity-20 font-black uppercase tracking-widest">
                        {searchQuery ? 'Nenhum pedido encontrado com este protocolo' : 'Nenhum pedido no sistema'}
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
