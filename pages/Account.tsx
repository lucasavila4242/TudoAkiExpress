
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
  Calendar
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
          <button onClick={onOpenAuth} className="w-full bg-red-500 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-red-600">Entrar Agora</button>
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
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center text-white text-3xl font-black">{user.name.charAt(0)}</div>
            <div>
              <h1 className="text-2xl font-black text-blue-900">{user.name}</h1>
              <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${currentTier.bg} ${currentTier.color}`}>Membro {user.tier}</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900 to-blue-950 p-8 rounded-[2.5rem] text-white shadow-2xl">
            <p className="text-blue-200 text-xs font-black uppercase mb-2">AkiPoints Acumulados</p>
            <h2 className="text-5xl font-black mb-8">{user.points}</h2>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400" style={{ width: `${Math.min(100, progress)}%` }} />
            </div>
            <p className="text-[10px] text-blue-300 mt-2 font-bold uppercase">Faltam {currentTier.next - user.lifetimePoints} pontos para o próximo nível</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-black text-blue-900 flex items-center gap-2"><Heart className="text-red-500" /> Seus Favoritos</h3>
            {wishlistedProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {wishlistedProducts.map(p => (
                  <ProductCard key={p.id} product={p} onAddToCart={addToCart} isWishlisted={true} onToggleWishlist={toggleWishlist} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-10 rounded-[2rem] text-center text-gray-400 font-medium">Sua lista está vazia.</div>
            )}
          </div>
        </div>

        {/* Lado Direito: Histórico de Ações (Banco de Dados) */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 h-full flex flex-col">
            <h3 className="text-xl font-black text-blue-900 mb-6 flex items-center gap-2">
              <History className="text-red-500 h-5 w-5" /> 
              Atividades Recentes
            </h3>
            
            <div className="space-y-6 relative flex-grow">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-100" />
              
              {user.activityLog && user.activityLog.length > 0 ? (
                user.activityLog.map((log) => (
                  <div key={log.id} className="relative pl-10 group">
                    <div className={`absolute left-2.5 top-1 w-3 h-3 rounded-full border-2 border-white shadow-sm ring-4 ring-gray-50 z-10 
                      ${log.type === 'auth' ? 'bg-blue-500' : 
                        log.type === 'cart' ? 'bg-amber-500' : 
                        log.type === 'wishlist' ? 'bg-red-500' : 'bg-green-500'}`} 
                    />
                    <div>
                      <p className="text-xs font-bold text-gray-800 leading-snug group-hover:text-red-500 transition-colors">{log.action}</p>
                      <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1 uppercase tracking-tighter">
                        <Clock size={10} /> 
                        {new Date(log.timestamp).toLocaleDateString('pt-BR')} às {new Date(log.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 opacity-30">
                  <Calendar size={40} className="mx-auto mb-2" />
                  <p className="text-xs font-bold uppercase">Sem registros</p>
                </div>
              )}
            </div>
            
            <div className="pt-6 mt-6 border-t border-gray-50">
              <p className="text-[10px] text-gray-400 font-bold uppercase text-center">Dados Sincronizados via TudoAki DB</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Account;
