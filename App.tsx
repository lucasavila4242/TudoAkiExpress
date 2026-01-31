
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  TrendingUp, 
  Clock, 
  Truck, 
  Star, 
  ChevronLeft,
  ShoppingCart,
  CheckCircle2,
  BellRing,
  Smartphone,
  Award,
  User,
  Zap,
  Heart,
  LogOut,
  ShieldAlert,
  AlertCircle
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from './constants';
import { Product, CartItem, User as UserType, UserActivity, Order, OrderStatus } from './types';

// Pages
import Home from './pages/Home';
import Store from './pages/Store';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import AdminDashboard from './pages/AdminDashboard';

// Components
import AuthModal from './components/AuthModal';

const Navbar = ({ 
  cartCount, 
  wishlistCount,
  toggleCart, 
  user, 
  openAuth, 
  logout 
}: { 
  cartCount: number, 
  wishlistCount: number,
  toggleCart: () => void, 
  user: UserType | null,
  openAuth: () => void,
  logout: () => void
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    return PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5);
  }, [searchQuery]);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-black text-blue-900 tracking-tighter">
              TudoAki<span className="text-red-500">Express</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
            <div className="w-full relative">
              <input
                type="text"
                placeholder="O que você procura em Cascavel?"
                className="w-full bg-gray-100 border-none rounded-full py-2 px-5 focus:ring-2 focus:ring-red-500 transition-all text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-4 top-2.5 h-4 w-4 text-gray-400" />
              {searchQuery && (
                <div className="absolute top-full left-0 w-full bg-white mt-2 rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                  {searchResults.map(p => (
                    <Link key={p.id} to={`/product/${p.id}`} className="flex items-center gap-3 p-3 hover:bg-gray-50" onClick={() => setSearchQuery('')}>
                      <img src={p.image} className="w-10 h-10 rounded object-cover" />
                      <div><p className="text-sm font-semibold">{p.name}</p><p className="text-xs text-red-500 font-bold">R$ {p.price.toFixed(2)}</p></div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {user?.isAdmin && (
              <Link to="/admin" className="hidden lg:flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20 hover:bg-red-700 transition-all">
                <ShieldAlert className="h-3 w-3" /> Painel Proprietário
              </Link>
            )}

            {user ? (
              <Link to="/account" className="hidden sm:flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full border border-amber-200">
                <Award className="h-4 w-4" />
                <span className="text-xs font-black">{user.points} pts</span>
              </Link>
            ) : (
              <button onClick={openAuth} className="hidden sm:block text-blue-900 font-bold text-sm px-4">Entrar</button>
            )}
            
            <Link to="/account" className="relative p-2 text-gray-700 hover:text-red-500 transition-colors">
              <Heart className={`h-6 w-6 ${wishlistCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              {wishlistCount > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center animate-in zoom-in">{wishlistCount}</span>}
            </Link>

            <button onClick={toggleCart} className="relative p-2 text-gray-700 hover:text-red-500 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center animate-in zoom-in">{cartCount}</span>}
            </button>
            
            <Link to="/account" className="p-2 text-gray-700 hover:text-red-500 transition-colors">
              <User className="h-6 w-6" />
            </Link>
            
            {user && (
              <button onClick={logout} className="hidden sm:block p-2 text-gray-400 hover:text-red-500 transition-colors">
                <LogOut className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const CartSidebar = ({ isOpen, onClose, cart, updateQuantity, navigateToCheckout }: any) => {
  const total = cart.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2"><ShoppingBag className="text-red-500" /> Carrinho</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
              <ShoppingCart size={64} />
              <p className="font-bold">Seu carrinho está vazio</p>
            </div>
          ) : (
            cart.map((item: any) => (
              <div key={item.id} className="flex gap-4 p-2 bg-gray-50 rounded-2xl border border-gray-100">
                <img src={item.image} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1 flex flex-col justify-between">
                  <h3 className="text-xs font-bold leading-tight line-clamp-2">{item.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex border-2 border-white bg-white rounded-lg overflow-hidden shadow-sm">
                      <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 bg-gray-100 hover:bg-gray-200">-</button>
                      <span className="px-3 py-1 text-xs font-black">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 bg-gray-100 hover:bg-gray-200">+</button>
                    </div>
                    <span className="text-sm font-black text-red-600">R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="p-6 bg-gray-50 border-t space-y-4">
            <div className="flex justify-between mb-4 font-black text-xl text-blue-900">
              <span>Total</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <button onClick={navigateToCheckout} className="w-full bg-red-500 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-red-500/20 hover:bg-red-600 transition-all">Finalizar Pedido Agora</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showRecoveryNudge, setShowRecoveryNudge] = useState(false);
  const [user, setUser] = useState<UserType | null>(() => {
    const saved = localStorage.getItem('aki_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Carrega pedidos iniciais
  useEffect(() => {
    syncOrders();
    // Escuta mudanças no LocalStorage (para sincronizar abas)
    window.addEventListener('storage', syncOrders);
    return () => window.removeEventListener('storage', syncOrders);
  }, []);

  const syncOrders = () => {
    try {
      const saved = localStorage.getItem('aki_orders');
      if (saved) {
        setOrders(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Erro ao sincronizar pedidos", e);
    }
  };

  const updateDB = useCallback((updates: Partial<UserType>, activity?: string, activityType: UserActivity['type'] = 'auth') => {
    if (!user) return;
    const users = JSON.parse(localStorage.getItem('aki_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex === -1) return;
    const newActivity: UserActivity | null = activity ? {
      id: Math.random().toString(36).substr(2, 9),
      type: activityType,
      action: activity,
      timestamp: new Date().toISOString()
    } : null;
    const updatedUser = { 
      ...users[userIndex], 
      ...updates,
      activityLog: newActivity ? [newActivity, ...users[userIndex].activityLog].slice(0, 50) : users[userIndex].activityLog
    };
    users[userIndex] = updatedUser;
    localStorage.setItem('aki_users', JSON.stringify(users));
    localStorage.setItem('aki_current_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  }, [user]);

  useEffect(() => {
    if (user) {
      setCart(user.persistedCart || []);
      setWishlist(user.persistedWishlist || []);
      
      if (user.persistedCart?.length > 0) {
        const lastUpdate = new Date(user.lastCartUpdate || 0);
        const now = new Date();
        const diffInHours = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);
        if (diffInHours > 0.5) {
           setTimeout(() => setShowRecoveryNudge(true), 1500);
        }
      }
    } else {
      setCart([]);
      setWishlist([]);
    }
  }, [user?.id]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      let newCart;
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        newCart = prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      } else {
        newCart = [...prev, { ...product, quantity: 1 }];
      }
      if (user) updateDB({ 
        persistedCart: newCart, 
        lastCartUpdate: new Date().toISOString() 
      }, `Adicionou "${product.name}" ao carrinho`, 'cart');
      return newCart;
    });
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const isRemoving = prev.includes(productId);
      const newWishlist = isRemoving ? prev.filter(id => id !== productId) : [...prev, productId];
      const product = PRODUCTS.find(p => p.id === productId);
      if (user) updateDB({ persistedWishlist: newWishlist }, `${isRemoving ? 'Removeu' : 'Adicionou'} "${product?.name}" aos favoritos`, 'wishlist');
      return newWishlist;
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      const newCart = prev.map(item => {
        if (item.id === id) return { ...item, quantity: Math.max(0, item.quantity + delta) };
        return item;
      }).filter(i => i.quantity > 0);
      if (user) updateDB({ 
        persistedCart: newCart,
        lastCartUpdate: new Date().toISOString()
      });
      return newCart;
    });
  };

  const logout = () => {
    localStorage.removeItem('aki_current_user');
    setUser(null);
  };

  const onOrderComplete = (pointsEarned: number, pointsSpent: number, orderDetails: any) => {
    if (!user) return;
    
    const newOrder: Order = {
      id: `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      userId: user.id,
      items: [...cart],
      total: orderDetails.total,
      status: 'pending',
      timestamp: new Date().toISOString(),
      address: orderDetails.address,
      paymentMethod: orderDetails.paymentMethod
    };

    // CRÍTICO: Lê o estado atual do LocalStorage antes de escrever para evitar sobrescrever dados de outras abas
    const currentOrders = JSON.parse(localStorage.getItem('aki_orders') || '[]');
    const updatedOrders = [newOrder, ...currentOrders];
    
    // Salva imediatamente
    localStorage.setItem('aki_orders', JSON.stringify(updatedOrders));
    
    // Atualiza estado local
    setOrders(updatedOrders);

    updateDB({ 
      points: user.points - pointsSpent + pointsEarned, 
      lifetimePoints: user.lifetimePoints + pointsEarned, 
      persistedCart: [],
      lastCartUpdate: undefined
    }, `Finalizou o pedido ${newOrder.id} e ganhou ${pointsEarned} pontos`, 'order');
    setCart([]);
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    // Mesma lógica segura: Ler -> Modificar -> Salvar
    const currentOrders = JSON.parse(localStorage.getItem('aki_orders') || '[]');
    const updatedOrders = currentOrders.map((o: Order) => o.id === orderId ? { ...o, status: newStatus } : o);
    
    localStorage.setItem('aki_orders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar 
          cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} 
          wishlistCount={wishlist.length}
          toggleCart={() => setIsCartOpen(true)} 
          user={user} 
          openAuth={() => setIsAuthModalOpen(true)} 
          logout={logout} 
        />
        
        {showRecoveryNudge && (
          <div className="fixed bottom-6 left-6 z-[70] max-w-sm animate-in slide-in-from-left duration-500">
            <div className="bg-white p-6 rounded-[2rem] shadow-2xl border-2 border-red-500 flex items-center gap-4 relative">
              <button onClick={() => setShowRecoveryNudge(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={16}/></button>
              <div className="bg-red-100 p-3 rounded-2xl text-red-500 animate-bounce">
                <ShoppingBag />
              </div>
              <div>
                <p className="text-sm font-black text-blue-900 leading-tight">Esqueceu algo? 🛒</p>
                <p className="text-xs text-gray-500 mt-1">Seus itens favoritos ainda estão salvos. Finalize agora!</p>
                <button onClick={() => { setIsCartOpen(true); setShowRecoveryNudge(false); }} className="text-[10px] font-black uppercase text-red-500 mt-2 hover:underline">Ver meu carrinho agora</button>
              </div>
            </div>
          </div>
        )}

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home addToCart={(p) => { addToCart(p); setIsCartOpen(true); }} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
            <Route path="/store" element={<Store addToCart={(p) => { addToCart(p); setIsCartOpen(true); }} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
            <Route path="/product/:id" element={<ProductDetails addToCart={(p) => { addToCart(p); setIsCartOpen(true); }} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
            <Route path="/checkout" element={<Checkout cart={cart} user={user || { name: 'Visitante', points: 0, lifetimePoints: 0, tier: 'Bronze', id: 'guest', email: '', whatsapp: '', persistedCart: [], persistedWishlist: [], activityLog: [] } as any} onComplete={onOrderComplete} />} />
            <Route 
              path="/account" 
              element={
                <Account 
                  user={user} 
                  wishlist={wishlist} 
                  orders={orders.filter(o => o.userId === user?.id)} 
                  toggleWishlist={toggleWishlist} 
                  addToCart={(p) => { addToCart(p); setIsCartOpen(true); }} 
                  onOpenAuth={() => setIsAuthModalOpen(true)}
                  updateOrderStatus={updateOrderStatus}
                />
              } 
            />
            <Route path="/admin" element={<AdminDashboard currentUser={user} orders={orders} updateOrderStatus={updateOrderStatus} />} />
          </Routes>
        </main>
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} updateQuantity={updateQuantity} navigateToCheckout={() => { setIsCartOpen(false); window.location.hash = '/checkout'; }} />
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onAuthSuccess={(u) => setUser(u)} />
      </div>
    </HashRouter>
  );
}
