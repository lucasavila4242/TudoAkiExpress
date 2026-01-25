
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
  Heart,
  RotateCcw,
  Lock,
  UserPlus,
  History,
  ShoppingCart,
  Calendar,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { User, Product } from '../types';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const Account = ({ 
  user, 
  wishlist, 
  toggleWishlist, 
  addToCart,
  onOpenAuth
}: { 
  user: User | null, 
  wishlist: string[], 
  toggleWishlist: (id: string) => void,
  addToCart: (p: Product) => void,
  onOpenAuth: () => void
}) => {
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

  const currentTier = tiers[user.tier];
  const progress = (user.lifetimePoints / currentTier.next) * 100;

  return (
    <div className="bg-gray-50 min-h-screen pb-20 pt-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
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
            
            <div className="mt-auto pt-6 border-t border-gray-50 text-center">
               <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">Criptografia SSL TudoAki Ativada</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Account;
