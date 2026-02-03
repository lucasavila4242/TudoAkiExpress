
import React, { useState, useEffect, useCallback } from 'react';
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
  AlertCircle,
  Package,
  WifiOff,
  Home as HomeIcon,
  Store as StoreIcon
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from './constants';
import { Product, CartItem, User as UserType, UserActivity, Order, OrderStatus } from './types';
import { db } from './firebase'; 
import { collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc, arrayUnion, setDoc } from 'firebase/firestore';

// Pages
import Home from './pages/Home';
import Store from './pages/Store';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import AdminDashboard from './pages/AdminDashboard';
import MotoboyDashboard from './pages/MotoboyDashboard';
import TrackingPage from './pages/TrackingPage';

// Components
import AuthModal from './components/AuthModal';

// --- COMPONENTS AUXILIARES ---

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Fecha o menu mobile ao mudar de rota
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const searchResults = React.useMemo(() => {
    if (!searchQuery) return [];
    return PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5);
  }, [searchQuery]);

  const isOwner = user?.email === 'lucasaviladark@gmail.com' || user?.isAdmin === true;

  // Componente de Busca (Reutilizável)
  const SearchBar = ({ mobile = false }) => (
    <div className={`relative ${mobile ? 'w-full' : 'w-full'}`}>
      <input
        type="text"
        placeholder="Buscar produtos..."
        className={`w-full bg-gray-100 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-red-500 transition-all text-sm font-medium ${mobile ? 'shadow-inner' : ''}`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Search className="absolute right-4 top-3 h-5 w-5 text-gray-400" />
      {searchQuery && (
        <div className="absolute top-full left-0 w-full bg-white mt-2 rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
          {searchResults.length > 0 ? (
            searchResults.map((p: any) => (
              <Link key={p.id} to={`/product/${p.id}`} className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-50 last:border-0" onClick={() => setSearchQuery('')}>
                <img src={p.image} className="w-10 h-10 rounded-lg object-cover" />
                <div>
                    <p className="text-xs font-bold text-gray-800 line-clamp-1">{p.name}</p>
                    <p className="text-[10px] text-red-500 font-black">R$ {p.price.toFixed(2)}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-3 text-center text-xs text-gray-400">Nenhum produto encontrado</div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-red-500 text-white p-1.5 rounded-lg transform group-hover:rotate-12 transition-transform">
                <ShoppingBag size={20} fill="currentColor" />
              </div>
              <span className="text-xl sm:text-2xl font-black text-blue-900 tracking-tighter leading-none">
                TudoAki<span className="text-red-500">Express</span>
              </span>
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <SearchBar />
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
               {isOwner && (
                 <>
                   <Link to="/logistica" className="p-2 text-gray-400 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition-all" title="Logística"><Package size={20} /></Link>
                   <Link to="/admin" className="bg-red-100 text-red-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-red-200">Proprietário</Link>
                 </>
               )}
               
               {user ? (
                 <Link to="/account" className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full border border-amber-200 hover:bg-amber-100 transition-colors">
                    <Award size={16} /> <span className="text-xs font-black">{user.points} pts</span>
                 </Link>
               ) : (
                 <button onClick={openAuth} className="text-sm font-bold text-blue-900 hover:text-red-500 px-4">Entrar</button>
               )}

               <div className="h-6 w-px bg-gray-200 mx-1"></div>

               <Link to="/account" className="p-2.5 text-gray-600 hover:text-blue-900 hover:bg-gray-100 rounded-xl transition-all" title="Minha Conta">
                  <User size={22} />
               </Link>

               <Link to="/account" className="relative p-2.5 text-gray-600 hover:text-red-500 hover:bg-gray-100 rounded-xl transition-all">
                  <Heart size={22} className={wishlistCount > 0 ? "fill-red-500 text-red-500" : ""} />
                  {wishlistCount > 0 && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>}
               </Link>

               <button onClick={toggleCart} className="relative p-2.5 text-gray-600 hover:text-red-500 hover:bg-gray-100 rounded-xl transition-all">
                  <ShoppingCart size={22} />
                  {cartCount > 0 && <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center border-2 border-white">{cartCount}</span>}
               </button>

               {user && (
                 <button onClick={logout} className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all" title="Sair">
                    <LogOut size={20} />
                 </button>
               )}
            </div>

            {/* Mobile Actions (Compact) */}
            <div className="flex md:hidden items-center gap-3">
              <button onClick={toggleCart} className="relative p-2 text-gray-700 active:scale-95 transition-transform">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">{cartCount}</span>}
              </button>
              
              <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-blue-900 bg-gray-100 rounded-xl active:scale-95 transition-transform">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU DRAWER (SLIDE-OVER) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end md:hidden">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={() => setIsMobileMenuOpen(false)} />
            
            {/* Drawer Content */}
            <div className="relative w-[85%] max-w-sm bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        {user ? (
                            <div className="w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                {user.name.charAt(0)}
                            </div>
                        ) : (
                            <div className="w-10 h-10 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">
                                <User size={20} />
                            </div>
                        )}
                        <div>
                            <p className="text-sm font-black text-blue-900 leading-tight">
                                {user ? `Olá, ${user.name.split(' ')[0]}` : 'Bem-vindo(a)'}
                            </p>
                            {user ? (
                                <p className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full w-fit mt-0.5 flex items-center gap-1">
                                    <Award size={10} /> {user.points} pts
                                </p>
                            ) : (
                                <button onClick={() => { setIsMobileMenuOpen(false); openAuth(); }} className="text-xs text-red-500 font-bold hover:underline">Entre ou Cadastre-se</button>
                            )}
                        </div>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                <div className="p-5 flex-1 overflow-y-auto space-y-6">
                    {/* Busca Mobile */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Buscar</label>
                        <SearchBar mobile />
                    </div>

                    {/* Links de Navegação */}
                    <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Navegação</label>
                         <Link to="/" className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-900 rounded-xl font-bold transition-colors">
                            <HomeIcon size={18} /> Início
                         </Link>
                         <Link to="/store" className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-900 rounded-xl font-bold transition-colors">
                            <StoreIcon size={18} /> Loja Completa
                         </Link>
                         <Link to="/account" className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-900 rounded-xl font-bold transition-colors">
                            <User size={18} /> Minha Conta
                         </Link>
                         <Link to="/account" className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-900 rounded-xl font-bold transition-colors">
                            <Heart size={18} /> Meus Favoritos {wishlistCount > 0 && <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full ml-auto">{wishlistCount}</span>}
                         </Link>
                    </div>

                    {/* Admin Links (Se Owner) */}
                    {isOwner && (
                        <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase text-red-400 ml-1">Administração</label>
                             <Link to="/admin" className="flex items-center gap-3 p-3 bg-red-50 text-red-700 rounded-xl font-bold border border-red-100">
                                <ShieldAlert size={18} /> Painel Proprietário
                             </Link>
                             <Link to="/logistica" className="flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-xl font-bold border border-blue-100">
                                <Package size={18} /> Terminal Logístico
                             </Link>
                        </div>
                    )}
                </div>

                <div className="p-5 border-t border-gray-100 bg-gray-50/50">
                    {user ? (
                        <button 
                            onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                            className="w-full flex items-center justify-center gap-2 bg-white border-2 border-red-100 text-red-500 py-3.5 rounded-xl font-black hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-95"
                        >
                            <LogOut size={18} /> SAIR DA CONTA
                        </button>
                    ) : (
                        <button 
                             onClick={() => { setIsMobileMenuOpen(false); openAuth(); }}
                             className="w-full flex items-center justify-center gap-2 bg-blue-900 text-white py-3.5 rounded-xl font-black shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
                        >
                            FAZER LOGIN
                        </button>
                    )}
                    <p className="text-center text-[10px] text-gray-400 font-bold mt-4 uppercase">TudoAki Express v1.2</p>
                </div>
            </div>
        </div>
      )}
    </>
  );
};

const CartSidebar = ({ isOpen, onClose, cart, updateQuantity, navigateToCheckout }: any) => {
  const total = cart.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold flex items-center gap-2 text-blue-900"><ShoppingBag className="text-red-500" /> Carrinho</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><X /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
              <ShoppingCart size={64} />
              <p className="font-bold">Seu carrinho está vazio</p>
            </div>
          ) : (
            cart.map((item: any) => (
              <div key={item.id} className="flex gap-4 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <img src={item.image} className="w-20 h-20 rounded-xl object-cover bg-gray-100" />
                <div className="flex-1 flex flex-col justify-between">
                  <h3 className="text-xs font-bold leading-tight line-clamp-2 text-gray-800">{item.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center border border-gray-200 bg-gray-50 rounded-lg overflow-hidden h-8">
                      <button onClick={() => updateQuantity(item.id, -1)} className="px-2.5 h-full hover:bg-gray-200 font-bold text-gray-500">-</button>
                      <span className="px-2 h-full flex items-center text-xs font-black bg-white border-x border-gray-200">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="px-2.5 h-full hover:bg-gray-200 font-bold text-blue-600">+</button>
                    </div>
                    <span className="text-sm font-black text-red-600">R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="p-6 bg-white border-t shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between mb-6 font-black text-xl text-blue-900">
              <span>Total</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <button 
                onClick={navigateToCheckout} 
                className="w-full bg-red-500 text-white py-4 rounded-xl font-black text-lg shadow-xl shadow-red-500/20 hover:bg-red-600 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
                Finalizar Pedido <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- APP PRINCIPAL ---

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showRecoveryNudge, setShowRecoveryNudge] = useState(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  
  const [user, setUser] = useState<UserType | null>(() => {
    const saved = localStorage.getItem('aki_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // FIREBASE LISTENER (PEDIDOS)
  useEffect(() => {
    try {
      const q = query(collection(db, "orders"), orderBy("timestamp", "desc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const liveOrders: Order[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          liveOrders.push({ id: doc.id, ...data } as Order);
        });
        setOrders(liveOrders);
        setFirebaseError(null);
      }, (error) => {
        console.error("Erro Firebase:", error);
        setFirebaseError("Erro de conexão com servidor.");
      });
      return () => unsubscribe();
    } catch (e) {
      console.error("Erro fatal Firebase:", e);
    }
  }, []);

  // Lógica de Atualização de Usuário (DB + Local)
  const updateDB = useCallback(async (updates: Partial<UserType>, activity?: string, activityType: UserActivity['type'] = 'auth') => {
    if (!user) return;
    const newActivity: UserActivity | null = activity ? { id: Math.random().toString(36).substr(2, 9), type: activityType, action: activity, timestamp: new Date().toISOString() } : null;
    const updatedUser = { ...user, ...updates, activityLog: newActivity ? [newActivity, ...(user.activityLog || [])].slice(0, 50) : (user.activityLog || []) };
    setUser(updatedUser);
    localStorage.setItem('aki_current_user', JSON.stringify(updatedUser));
    try {
        const userRef = doc(db, "users", user.id);
        const firebaseUpdates: any = { ...updates };
        if (newActivity) firebaseUpdates.activityLog = arrayUnion(newActivity);
        await setDoc(userRef, firebaseUpdates, { merge: true });
    } catch (e) { console.error("Erro sync:", e); }
  }, [user]);

  // Carrega Carrinho/Wishlist do Usuário Logado
  useEffect(() => {
    if (user) {
      setCart(user.persistedCart || []);
      setWishlist(user.persistedWishlist || []);
      if (user.persistedCart?.length > 0 && !user.isCourier) {
        const lastUpdate = new Date(user.lastCartUpdate || 0);
        const now = new Date();
        const diffInHours = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);
        if (diffInHours > 0.5) setTimeout(() => setShowRecoveryNudge(true), 1500);
      }
    } else {
      setCart([]); setWishlist([]);
    }
  }, [user?.id]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      let newCart;
      const existing = prev.find(i => i.id === product.id);
      if (existing) { newCart = prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i); } else { newCart = [...prev, { ...product, quantity: 1 }]; }
      if (user) updateDB({ persistedCart: newCart, lastCartUpdate: new Date().toISOString() }, `Adicionou "${product.name}" ao carrinho`, 'cart');
      return newCart;
    });
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const isRemoving = prev.includes(productId);
      const newWishlist = isRemoving ? prev.filter(id => id !== productId) : [...prev, productId];
      if (user) updateDB({ persistedWishlist: newWishlist }, `${isRemoving ? 'Removeu' : 'Adicionou'} item aos favoritos`, 'wishlist');
      return newWishlist;
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      const newCart = prev.map(item => { if (item.id === id) return { ...item, quantity: Math.max(0, item.quantity + delta) }; return item; }).filter(i => i.quantity > 0);
      if (user) updateDB({ persistedCart: newCart, lastCartUpdate: new Date().toISOString() });
      return newCart;
    });
  };

  const logout = () => { localStorage.removeItem('aki_current_user'); setUser(null); };

  const onOrderComplete = async (pointsEarned: number, pointsSpent: number, orderDetails: any) => {
    if (!user) return;
    
    // Agora capturamos o nome e whatsapp do objeto orderDetails (vindo do Checkout.tsx)
    const newOrderData: Order = { 
        id: orderDetails.id || `ORD-${Date.now()}`,
        userId: user.id, 
        items: [...cart], 
        total: orderDetails.total, 
        status: 'pending', 
        timestamp: new Date().toISOString(), 
        address: orderDetails.address, 
        paymentMethod: orderDetails.paymentMethod,
        // Novos campos:
        customerName: orderDetails.customerName || user.name,
        customerWhatsapp: orderDetails.customerWhatsapp || user.whatsapp
    };

    try { 
        // 1. Salva no Firebase
        if (orderDetails.id) {
            await setDoc(doc(db, "orders", orderDetails.id), newOrderData);
        } else {
            await addDoc(collection(db, "orders"), newOrderData); 
        }

        // 2. DISPARA NOTIFICAÇÃO AUTOMÁTICA EM BACKGROUND (TELEGRAM)
        sendOrderNotification(newOrderData);

    } catch (e) { console.error("Erro save order:", e); }
    
    updateDB({ points: user.points - pointsSpent + pointsEarned, lifetimePoints: user.lifetimePoints + pointsEarned, persistedCart: [], lastCartUpdate: undefined }, `Finalizou um pedido`, 'order');
    setCart([]);
  };

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
    } catch (e) { console.error("Erro update status:", e); }
  };

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        
        {/* CONDICIONAL MESTRA: SE FOR MOTOBOY, RENDERIZA APENAS O DASHBOARD DELE */}
        {user?.isCourier ? (
            <MotoboyDashboard user={user} orders={orders} logout={logout} />
        ) : (
            <>
                <Navbar 
                  cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} 
                  wishlistCount={wishlist.length}
                  toggleCart={() => setIsCartOpen(true)} 
                  user={user} 
                  openAuth={() => setIsAuthModalOpen(true)} 
                  logout={logout} 
                />
                
                {firebaseError && <div className="bg-red-600 text-white p-2 text-center text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"><WifiOff size={14} />{firebaseError}</div>}

                {showRecoveryNudge && <div className="fixed bottom-6 left-6 z-[70] max-w-sm animate-in slide-in-from-left duration-500"><div className="bg-white p-6 rounded-[2rem] shadow-2xl border-2 border-red-500 flex items-center gap-4 relative"><button onClick={() => setShowRecoveryNudge(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={16}/></button><div className="bg-red-100 p-3 rounded-2xl text-red-500 animate-bounce"><ShoppingBag /></div><div><p className="text-sm font-black text-blue-900 leading-tight">Esqueceu algo? 🛒</p><p className="text-xs text-gray-500 mt-1">Seus itens favoritos ainda estão salvos. Finalize agora!</p><button onClick={() => { setIsCartOpen(true); setShowRecoveryNudge(false); }} className="text-[10px] font-black uppercase text-red-500 mt-2 hover:underline">Ver meu carrinho agora</button></div></div></div>}

                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home addToCart={(p) => { addToCart(p); setIsCartOpen(true); }} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
                    <Route path="/store" element={<Store addToCart={(p) => { addToCart(p); setIsCartOpen(true); }} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
                    <Route path="/product/:id" element={<ProductDetails addToCart={(p) => { addToCart(p); setIsCartOpen(true); }} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
                    <Route path="/checkout" element={<Checkout cart={cart} user={user || { name: 'Visitante', points: 0, lifetimePoints: 0, tier: 'Bronze', id: 'guest', email: '', whatsapp: '', persistedCart: [], persistedWishlist: [], activityLog: [] } as any} onComplete={onOrderComplete} />} />
                    <Route path="/account" element={<Account user={user} wishlist={wishlist} orders={orders.filter(o => o.userId === user?.id)} toggleWishlist={toggleWishlist} addToCart={(p) => { addToCart(p); setIsCartOpen(true); }} onOpenAuth={() => setIsAuthModalOpen(true)} updateOrderStatus={updateOrderStatus} />} />
                    <Route path="/admin" element={<AdminDashboard currentUser={user} orders={orders} updateOrderStatus={updateOrderStatus} />} />
                    <Route path="/logistica" element={<AdminDashboard currentUser={user} orders={orders} updateOrderStatus={updateOrderStatus} isLogisticsMode={true} />} />
                    
                    {/* Rota PÚBLICA de rastreamento (acessível por todos, inclusive sem login) */}
                    <Route path="/track/:orderId" element={<TrackingPage />} />
                  </Routes>
                </main>
                <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} updateQuantity={updateQuantity} navigateToCheckout={() => { setIsCartOpen(false); window.location.hash = '/checkout'; }} />
                <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onAuthSuccess={(u) => setUser(u)} />
            </>
        )}
      </div>
    </HashRouter>
  );
}
