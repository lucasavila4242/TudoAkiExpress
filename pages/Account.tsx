
import React, { useMemo } from 'react';
import { 
  Award, 
  ShoppingBag, 
  Settings, 
  ChevronRight, 
  Zap, 
  MapPin, 
  Clock, 
  Star,
  CheckCircle2,
  Gift,
  Heart,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { UserProfile, Product } from '../types';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const Account = ({ 
  user, 
  wishlist, 
  toggleWishlist, 
  addToCart 
}: { 
  user: UserProfile, 
  wishlist: string[], 
  toggleWishlist: (id: string) => void,
  addToCart: (p: Product) => void
}) => {
  const tiers = {
    'Bronze': { color: 'text-amber-600', bg: 'bg-amber-100', next: 500 },
    'Prata': { color: 'text-gray-500', bg: 'bg-gray-100', next: 2000 },
    'Ouro': { color: 'text-amber-500', bg: 'bg-amber-50', next: 5000 }
  };

  const currentTier = tiers[user.tier];
  const progress = (user.lifetimePoints / currentTier.next) * 100;

  const wishlistedProducts = useMemo(() => 
    PRODUCTS.filter(p => wishlist.includes(p.id)), 
  [wishlist]);

  // Mock de pedidos com IDs de produtos para a funcionalidade de "Comprar Novamente"
  const mockOrders = [
    { id: '8231', date: '12 Out 2024', status: 'Entregue', items: ['1', 'u1'] },
    { id: '8232', date: '05 Out 2024', status: 'Entregue', items: ['3'] }
  ];

  const handleReorder = (productIds: string[]) => {
    productIds.forEach(id => {
      const product = PRODUCTS.find(p => p.id === id);
      if (product) addToCart(product);
    });
    alert("Itens adicionados ao carrinho com sucesso!");
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20 pt-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Profile Header */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-24 h-24 bg-blue-900 rounded-full flex items-center justify-center text-white text-3xl font-black">
              {user.name.charAt(0)}
            </div>
            <div className={`absolute -bottom-2 -right-2 p-2 rounded-full shadow-lg ${currentTier.bg}`}>
              <Award className={`h-6 w-6 ${currentTier.color}`} />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-black text-blue-900 mb-1">{user.name}</h1>
            <p className="text-gray-500 text-sm font-medium mb-4 flex items-center justify-center md:justify-start gap-2">
              <MapPin className="h-4 w-4" /> Cascavel, PR
            </p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest ${currentTier.bg} ${currentTier.color}`}>
                Membro {user.tier}
              </span>
              <span className="px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-blue-50 text-blue-600">
                AkiPrivilégio VIP
              </span>
            </div>
          </div>
          <button className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
            <Settings className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        {/* Loyalty Card */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-950 p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Zap className="w-64 h-64 text-amber-500" />
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-12">
              <div>
                <p className="text-blue-200 text-xs font-black uppercase tracking-widest mb-2">Seu Saldo Atual</p>
                <div className="flex items-center gap-4">
                  <h2 className="text-5xl font-black tracking-tighter">{user.points}</h2>
                  <span className="text-amber-400 text-sm font-bold uppercase">AkiPoints</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/20 text-center">
                <p className="text-[10px] uppercase font-black text-blue-200 mb-1">Vale Desconto</p>
                <p className="text-2xl font-black text-amber-400">R$ {(user.points / 20).toFixed(2)}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end text-sm">
                <span className="font-bold text-blue-200 uppercase tracking-widest text-[10px]">Próximo Nível: {currentTier.next} pts</span>
                <span className="font-black text-white">{Math.floor(progress)}%</span>
              </div>
              <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-red-500 transition-all duration-1000" 
                  style={{ width: `${Math.min(100, progress)}%` }} 
                />
              </div>
              <p className="text-xs text-blue-200 text-center">Ganhe mais {currentTier.next - user.lifetimePoints} pontos para se tornar Member <b>Ouro</b>!</p>
            </div>
          </div>
        </div>

        {/* Wishlist Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-blue-900 flex items-center gap-3">
              <Heart className="h-6 w-6 text-red-500 fill-red-500" />
              Seus Favoritos
            </h3>
            {wishlistedProducts.length > 0 && (
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{wishlistedProducts.length} itens</span>
            )}
          </div>
          
          {wishlistedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {wishlistedProducts.map(p => (
                <ProductCard 
                  key={p.id} 
                  product={p} 
                  onAddToCart={addToCart} 
                  isWishlisted={true}
                  onToggleWishlist={toggleWishlist}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-[2.5rem] border border-gray-100 border-dashed text-center space-y-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-10 w-10 text-gray-200" />
              </div>
              <h4 className="text-lg font-bold text-blue-900">Sua lista está vazia</h4>
              <p className="text-sm text-gray-500 max-w-xs mx-auto">Salve os produtos que você ama para comprar mais tarde com rapidez.</p>
              <Link to="/store" className="inline-flex items-center gap-2 text-red-500 font-black uppercase text-xs tracking-widest hover:underline">
                Explorar a loja <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-lg font-black text-blue-900 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-red-500" /> Seus Pedidos
            </h3>
            <div className="space-y-3">
              {mockOrders.map(order => (
                <div key={order.id} className="flex flex-col p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-xl">
                        <Clock className="h-5 w-5 text-blue-900" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900">Pedido #{order.id}</p>
                        <p className="text-[10px] text-gray-400 font-medium">Finalizado em {order.date}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{order.status}</span>
                  </div>
                  
                  <button 
                    onClick={() => handleReorder(order.items)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase text-blue-900 hover:bg-blue-900 hover:text-white transition-all group-hover:border-transparent group-hover:shadow-md"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Comprar Novamente
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full py-3 text-sm font-bold text-blue-900 hover:text-red-500 transition-colors uppercase tracking-widest">
              Ver Histórico Completo
            </button>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-lg font-black text-blue-900 flex items-center gap-2">
              <Gift className="h-5 w-5 text-amber-500" /> Resgate Exclusivo
            </h3>
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-amber-500 shadow-sm">
                  <Star className="h-6 w-6 fill-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-black text-amber-900">Cupom AkiGamer 15%</p>
                  <p className="text-[10px] text-amber-700 font-bold">Válido para Informática</p>
                </div>
              </div>
              <button className="w-full bg-amber-400 text-amber-900 py-2.5 rounded-xl text-xs font-black uppercase shadow-lg shadow-amber-400/20 active:scale-95 transition-all">
                Resgatar por 400 pts
              </button>
            </div>
            <p className="text-[10px] text-gray-400 text-center font-bold italic">Novas recompensas todas as terças-feiras em Cascavel</p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 py-8 opacity-50">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter">
            <CheckCircle2 className="h-4 w-4 text-green-500" /> Compra Garantida
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter">
            <CheckCircle2 className="h-4 w-4 text-green-500" /> Cashback Real
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter">
            <CheckCircle2 className="h-4 w-4 text-green-500" /> Cascavel Trusted
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
