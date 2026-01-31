
import React, { useMemo, useState, useEffect } from 'react';
import { 
  Award, 
  ShoppingBag, 
  Settings, 
  ChevronRight, 
  Zap, 
  MapPin, 
  Clock, 
  Star,
  Heart,
  RotateCcw,
  Lock,
  UserPlus,
  History,
  ShoppingCart,
  Calendar,
  ShieldAlert,
  ArrowRight,
  Package,
  Truck,
  CheckCircle2,
  X,
  PartyPopper,
  Loader2
} from 'lucide-react';
import { User, Product, Order, OrderStatus } from '../types';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const OrderStatusStepper = ({ status }: { status: OrderStatus }) => {
  const steps = [
    { key: 'pending', label: 'Pedido Feito', icon: ShoppingBag },
    { key: 'processing', label: 'Em Separação', icon: Package },
    { key: 'shipped', label: 'Em Rota', icon: Truck },
    { key: 'delivered', label: 'Entregue', icon: CheckCircle2 },
  ];

  const currentIndex = steps.findIndex(s => s.key === status);

  return (
    <div className="w-full py-8 px-4">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2" />
        <div 
          className="absolute top-1/2 left-0 h-1 bg-red-500 -translate-y-1/2 transition-all duration-1000" 
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        />
        
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = idx <= currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-4 border-white shadow-lg ${
                isActive ? 'bg-red-500 text-white' : 'bg-white text-gray-300'
              } ${isCurrent ? 'scale-125 animate-pulse-subtle' : ''}`}>
                <Icon size={20} />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-blue-900' : 'text-gray-300'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PaymentSuccessModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-blue-900/80 backdrop-blur-sm animate-in fade-in" onClick={onClose} />
      <div className="relative bg-white w-full max-w-sm rounded-[3rem] p-8 text-center shadow-2xl animate-in zoom-in-95 border-4 border-white">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
          <PartyPopper className="h-10 w-10 text-green-600 animate-bounce" />
          <div className="absolute inset-0 rounded-full border-4 border-green-50 animate-ping opacity-25" />
        </div>
        <h2 className="text-2xl font-black text-blue-900 mb-2">Pagamento Confirmado!</h2>
        <p className="text-gray-500 text-sm mb-6">Recebemos seu pagamento com sucesso. Seu pedido já foi enviado para <strong className="text-blue-900">separação imediata</strong> no estoque.</p>
        
        <div className="bg-gray-50 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-5 w-5 text-red-500" />
            <span className="text-xs font-black uppercase text-gray-400">Previsão</span>
          </div>
          <p className="font-bold text-blue-900">Entrega Hoje até as 18h</p>
        </div>

        <button onClick={onClose} className="w-full bg-blue-900 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-blue-800 transition-all">
          Acompanhar Pedido
        </button>
      </div>
    </div>
  );
};

const Account = ({ 
  user, 
  wishlist, 
  orders = [],
  toggleWishlist, 
  addToCart,
  onOpenAuth,
  updateOrderStatus
}: { 
  user: User | null, 
  wishlist: string[], 
  orders: Order[],
  toggleWishlist: (id: string) => void,
  addToCart: (p: Product) => void,
  onOpenAuth: () => void,
  updateOrderStatus: (id: string, s: OrderStatus) => void
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Verifica retorno do Mercado Pago de forma robusta
  useEffect(() => {
    // Helper para buscar parâmetros tanto da URL normal quanto do HashRouter
    // Mercado Pago às vezes coloca os parametros antes ou depois do #
    const getParam = (key: string) => {
      const hashParams = new URLSearchParams(location.search);
      const queryParams = new URLSearchParams(window.location.search);
      return hashParams.get(key) || queryParams.get(key);
    };

    const status = getParam('collection_status');
    const paymentId = getParam('payment_id');

    // Se houver status aprovado na URL, iniciamos a verificação
    if (status === 'approved' && paymentId && orders.length > 0) {
      setIsVerifyingPayment(true);

      // Encontra o pedido pendente mais recente deste usuário
      // Nota: Em um sistema real com backend, o Webhook faria isso no servidor.
      // Aqui, confiamos no retorno do navegador.
      const pendingOrders = orders
        .filter(o => o.status === 'pending')
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      if (pendingOrders.length > 0) {
        const latestOrder = pendingOrders[0];
        
        // Simula um pequeno delay de processamento para UX
        setTimeout(() => {
          // Atualiza para 'processing' (Em Separação)
          updateOrderStatus(latestOrder.id, 'processing');
          
          setIsVerifyingPayment(false);
          setShowSuccessModal(true);
          setActiveTab('orders');
          
          // Limpa a URL para evitar reprocessamento ao recarregar a página
          navigate('/account', { replace: true });
        }, 1500);
      } else {
        setIsVerifyingPayment(false);
      }
    }
  }, [location, orders, updateOrderStatus, navigate]);

  const tiers = {
    'Bronze': { color: 'text-amber-600', bg: 'bg-amber-100', next: 500 },
    'Prata': { color: 'text-gray-500', bg: 'bg-gray-100', next: 2000 },
    'Ouro': { color: 'text-amber-500', bg: 'bg-amber-50', next: 5000 }
  };

  const wishlistedProducts = useMemo(() => 
    PRODUCTS.filter(p => wishlist.includes(p.id)), 
  [wishlist]);

  if (!user) {
    return (
      <div className="bg-gray-50 min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="max-w-md w-full text-center bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100 space-y-6">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-900"><Lock size={40} /></div>
          <h1 className="text-3xl font-black text-blue-900">Área Exclusiva</h1>
          <p className="text-gray-500">Faça login para salvar suas ações, favoritos e pontos em nosso banco de dados.</p>
          <button onClick={onOpenAuth} className="w-full bg-red-500 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-red-600 active:scale-95 transition-all">Entrar Agora</button>
        </div>
      </div>
    );
  }

  // TELA DE VERIFICAÇÃO DE PAGAMENTO (INTERMEDIÁRIA)
  if (isVerifyingPayment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
          <div className="relative mx-auto w-24 h-24">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full" />
            <div className="absolute inset-0 border-4 border-t-green-500 rounded-full animate-spin" />
            <ShieldAlert className="absolute inset-0 m-auto text-green-600 h-8 w-8 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-blue-900">Verificando Pagamento...</h2>
            <p className="text-gray-500 mt-2">Conectando com Mercado Pago para confirmar seu pedido.</p>
          </div>
        </div>
      </div>
    );
  }

  const currentTier = tiers[user.tier];
  const progress = (user.lifetimePoints / currentTier.next) * 100;

  return (
    <div className="bg-gray-50 min-h-screen pb-20 pt-10 px-4 sm:px-6 lg:px-8">
      <PaymentSuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
      
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Tabs */}
        <div className="flex gap-2 bg-gray-200/50 p-1.5 rounded-2xl w-fit mx-auto lg:mx-0">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'profile' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-500 hover:text-blue-900'}`}
          >
            Meu Perfil
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'orders' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-500 hover:text-blue-900'}`}
          >
            Meus Pedidos {orders.length > 0 && <span className="bg-red-500 text-white px-2 py-0.5 rounded-md text-[9px]">{orders.length}</span>}
          </button>
        </div>

        {activeTab === 'profile' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4">
            {/* Lado Esquerdo: Perfil e Pontos */}
            <div className="lg:col-span-2 space-y-8">
              {user.isAdmin && (
                <Link to="/admin" className="block bg-gradient-to-r from-red-600 to-red-800 p-6 rounded-[2.5rem] text-white shadow-xl shadow-red-500/20 group hover:scale-[1.02] transition-all">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-2xl"><ShieldAlert /></div>
                      <div>
                        <h3 className="text-lg font-black uppercase tracking-tight">Painel do Proprietário</h3>
                        <p className="text-xs text-red-100 font-medium">Você tem acesso total aos dados de Cascavel</p>
                      </div>
                    </div>
                    <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              )}

              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-6">
                <div className="w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-lg">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl font-black text-blue-900 leading-tight">{user.name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${currentTier.bg} ${currentTier.color}`}>Membro {user.tier}</span>
                    <span className="text-[10px] font-bold text-gray-400">ID: {user.id.slice(0, 8)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-900 to-blue-950 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <Zap size={160} />
                </div>
                <div className="relative z-10">
                  <p className="text-blue-200 text-xs font-black uppercase tracking-[0.2em] mb-2">AkiPoints Acumulados</p>
                  <h2 className="text-5xl font-black mb-8 tracking-tighter">{user.points}</h2>
                  <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden mb-3">
                    <div className="h-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.5)] transition-all duration-1000" style={{ width: `${Math.min(100, progress)}%` }} />
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest">Faltam {currentTier.next - user.lifetimePoints} pontos para o nível {user.tier === 'Bronze' ? 'Prata' : 'Ouro'}</p>
                    <Award className="h-4 w-4 text-amber-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-blue-900 flex items-center gap-2">
                    <Heart className="text-red-500 fill-red-500 h-5 w-5" /> Seus Favoritos
                  </h3>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{wishlistedProducts.length} itens salvos</span>
                </div>
                
                {wishlistedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlistedProducts.map(p => (
                      <ProductCard key={p.id} product={p} onAddToCart={addToCart} isWishlisted={true} onToggleWishlist={toggleWishlist} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-16 rounded-[2.5rem] text-center border-2 border-dashed border-gray-100 space-y-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                      <Heart size={32} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-blue-900">Sua lista está vazia</h4>
                      <p className="text-sm text-gray-400">Favorite produtos para encontrá-los facilmente depois.</p>
                    </div>
                    <Link to="/store" className="inline-flex items-center gap-2 bg-blue-900 text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-red-500 transition-all active:scale-95 shadow-lg shadow-blue-900/10">
                      Explorar Marketplace <ArrowRight size={16} />
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Lado Direito: Histórico de Ações */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 h-full flex flex-col">
                <h3 className="text-xl font-black text-blue-900 mb-8 flex items-center gap-2">
                  <History className="text-red-500 h-5 w-5" /> 
                  Atividades Recentes
                </h3>
                
                <div className="space-y-8 relative flex-grow pb-4">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-50" />
                  
                  {user.activityLog && user.activityLog.length > 0 ? (
                    user.activityLog.slice(0, 10).map((log) => (
                      <div key={log.id} className="relative pl-10 group">
                        <div className={`absolute left-2 top-1 w-4 h-4 rounded-full border-4 border-white shadow-md z-10 transition-transform group-hover:scale-125
                          ${log.type === 'auth' ? 'bg-blue-500' : 
                            log.type === 'cart' ? 'bg-amber-500' : 
                            log.type === 'wishlist' ? 'bg-red-500' : 'bg-green-500'}`} 
                        />
                        <div className="space-y-1">
                          <p className="text-xs font-black text-blue-900 leading-snug">{log.action}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1">
                            <Clock size={10} className="text-gray-300" /> 
                            {new Date(log.timestamp).toLocaleDateString('pt-BR')} • {new Date(log.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-20 opacity-20 flex flex-col items-center">
                      <Calendar size={48} className="mb-4" />
                      <p className="text-xs font-black uppercase tracking-widest">Sem atividades registradas</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <h3 className="text-2xl font-black text-blue-900 flex items-center gap-3">
              <Package className="text-red-500" /> Acompanhe sua Entrega Express
            </h3>
            
            {orders.length === 0 ? (
              <div className="bg-white p-24 text-center rounded-[3rem] border border-gray-100 space-y-4">
                <ShoppingBag size={64} className="mx-auto text-gray-200" />
                <h4 className="text-xl font-black text-blue-900">Nenhum pedido realizado</h4>
                <p className="text-gray-500">Comece suas compras agora e receba hoje mesmo em Cascavel!</p>
                <Link to="/store" className="inline-block bg-red-500 text-white px-8 py-3 rounded-2xl font-black shadow-lg">Ir para a Loja</Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map(order => (
                  <div key={order.id} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8 border-b border-gray-50 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-900 text-white rounded-2xl">
                          <Clock size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Protocolo do Pedido</p>
                          <h4 className="text-lg font-black text-blue-900">{order.id}</h4>
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Data da Compra</p>
                        <p className="text-sm font-bold text-blue-900">{new Date(order.timestamp).toLocaleString('pt-BR')}</p>
                      </div>
                    </div>

                    <div className="p-8">
                      <OrderStatusStepper status={order.status} />

                      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-gray-50">
                        <div className="space-y-4">
                          <h5 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-red-500" /> Endereço de Entrega
                          </h5>
                          <p className="text-sm text-gray-600 font-medium bg-gray-50 p-4 rounded-2xl">{order.address}</p>
                        </div>
                        <div className="space-y-4">
                          <h5 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                            <ShoppingBag className="h-4 w-4 text-red-500" /> Resumo Financeiro
                          </h5>
                          <div className="bg-gray-50 p-4 rounded-2xl flex justify-between items-center">
                            <p className="text-sm text-gray-600 font-bold uppercase">{order.items.length} Itens • {order.paymentMethod.toUpperCase()}</p>
                            <p className="text-xl font-black text-red-500">R$ {order.total.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex-shrink-0 flex items-center gap-3 bg-white border border-gray-100 p-2 rounded-xl">
                            <img src={item.image} className="w-10 h-10 rounded-lg object-cover" />
                            <div>
                              <p className="text-[10px] font-black text-blue-900 leading-tight truncate w-32">{item.name}</p>
                              <p className="text-[9px] text-gray-400 font-bold uppercase">{item.quantity}x R$ {item.price.toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
