
import React, { useState, useMemo, useEffect } from 'react';
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
  Heart
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from './constants';
import { Product, CartItem, DeliveryMethod, UserProfile } from './types';

// Pages
import Home from './pages/Home';
import Store from './pages/Store';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Account from './pages/Account';

const Navbar = ({ cartCount, toggleCart, points }: { cartCount: number, toggleCart: () => void, points: number }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    return PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5);
  }, [searchQuery]);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-black text-blue-900 tracking-tighter">
                TudoAki<span className="text-red-500">Express</span>
              </span>
            </Link>
          </div>

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
                <div className="absolute top-full left-0 w-full bg-white mt-2 rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  {searchResults.length > 0 ? (
                    searchResults.map(p => (
                      <Link 
                        key={p.id} 
                        to={`/product/${p.id}`} 
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-50 last:border-none"
                        onClick={() => setSearchQuery('')}
                      >
                        <img src={p.image} className="w-10 h-10 rounded object-cover" />
                        <div>
                          <p className="text-sm font-semibold">{p.name}</p>
                          <p className="text-xs text-red-500">R$ {p.price.toFixed(2)}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-500">Nenhum resultado para "{searchQuery}"</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/account" className="hidden sm:flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full hover:bg-amber-100 transition-all border border-amber-200">
              <Award className="h-4 w-4" />
              <span className="text-xs font-black">{points} AkiPoints</span>
            </Link>
            
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)} 
              className="md:hidden p-2 text-gray-600 hover:text-red-500"
            >
              <Search className="h-6 w-6" />
            </button>
            <button 
              onClick={toggleCart} 
              className="relative p-2 text-gray-700 hover:text-red-500 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
            <Link to="/account" className="p-2 text-gray-700 hover:text-blue-900 transition-colors">
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const CartSidebar = ({ isOpen, onClose, cart, updateQuantity, removeFromCart, navigateToCheckout }: { 
  isOpen: boolean; 
  onClose: () => void; 
  cart: CartItem[]; 
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  navigateToCheckout: () => void;
}) => {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-red-500" />
            Seu Carrinho
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
              <div className="bg-gray-100 p-6 rounded-full">
                <ShoppingBag className="h-12 w-12" />
              </div>
              <p className="font-medium">O seu carrinho está vazio</p>
              <button 
                onClick={onClose}
                className="text-red-500 font-bold hover:underline"
              >
                Voltar às compras
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4">
                <img src={item.image} className="w-20 h-20 rounded-lg object-cover bg-gray-100" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 leading-tight">{item.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">Cascavel - Entrega Hoje</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-1 hover:bg-gray-50 text-gray-500"
                      >-</button>
                      <span className="px-2 text-sm font-bold w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-1 hover:bg-gray-50 text-gray-500"
                      >+</button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-red-600">R$ {(item.price * item.quantity).toFixed(2)}</p>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-[10px] text-gray-400 hover:text-red-500 underline uppercase font-bold"
                      >remover</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="bg-blue-900 text-white p-4 rounded-2xl mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-400" />
                <span className="text-xs font-bold">Ganhe {Math.floor(total)} AkiPoints</span>
              </div>
              <span className="text-[10px] uppercase font-black opacity-70">AkiPrivilégio</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 font-medium">Subtotal</span>
              <span className="text-xl font-black text-gray-900">R$ {total.toFixed(2)}</span>
            </div>
            <p className="text-[10px] text-gray-500 mb-6 flex items-center gap-1">
              <Truck className="h-3 w-3" /> 
              Frete calculado no próximo passo
            </p>
            <button 
              onClick={navigateToCheckout}
              className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Finalizar Pedido
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Footer = () => (
  <footer className="bg-blue-950 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <span className="text-2xl font-black tracking-tighter">
            TudoAki<span className="text-red-500">Express</span>
          </span>
          <p className="text-blue-200 text-sm leading-relaxed">
            O marketplace oficial de Cascavel. Qualidade, rapidez e a confiança que você merece. Receba em casa hoje mesmo!
          </p>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-red-500 transition-colors cursor-pointer">
              <Smartphone className="h-4 w-4" />
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-6">Explore</h4>
          <ul className="space-y-3 text-blue-200 text-sm">
            <li><Link to="/store" className="hover:text-red-400 transition-colors">Produtos</Link></li>
            <li><a href="#" className="hover:text-red-400 transition-colors">Ofertas Relâmpago</a></li>
            <li><a href="#" className="hover:text-red-400 transition-colors">Mais Vendidos</a></li>
            <li><a href="#" className="hover:text-red-400 transition-colors">Novidades</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-6">Ajuda</h4>
          <ul className="space-y-3 text-blue-200 text-sm">
            <li><a href="#" className="hover:text-red-400 transition-colors">Como funciona a entrega?</a></li>
            <li><a href="#" className="hover:text-red-400 transition-colors">Rastreio de pedido</a></li>
            <li><a href="#" className="hover:text-red-400 transition-colors">Suporte via WhatsApp</a></li>
            <li><a href="#" className="hover:text-red-400 transition-colors">Trocas e Devoluções</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-6">Atendimento</h4>
          <p className="text-sm text-blue-200 mb-2">Cascavel - PR</p>
          <p className="text-sm text-blue-200 mb-4 font-bold">(45) 99999-9999</p>
          <div className="flex flex-wrap gap-2">
            <img src="https://logodownload.org/wp-content/uploads/2014/10/visa-logo-1.png" className="h-4 opacity-50 grayscale invert" />
            <img src="https://logodownload.org/wp-content/uploads/2014/07/mastercard-logo-7.png" className="h-4 opacity-50 grayscale invert" />
            <img src="https://logodownload.org/wp-content/uploads/2020/02/pix-logo-1.png" className="h-4 opacity-50 grayscale invert" />
          </div>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-blue-900 text-center text-xs text-blue-400">
        &copy; 2024 TudoAkiExpress. Todos os direitos reservados. CNPJ: 00.000.000/0001-00
      </div>
    </div>
  </footer>
);

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState<UserProfile>({
    name: 'Cliente Cascavel',
    points: 450,
    lifetimePoints: 1250,
    tier: 'Prata'
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Escuta adições via Checkout Upsell
  useEffect(() => {
    const handleCheckoutAdd = (e: any) => {
      addToCart(e.detail);
    };
    window.addEventListener('add-to-cart-checkout', handleCheckoutAdd);
    return () => window.removeEventListener('add-to-cart-checkout', handleCheckoutAdd);
  }, []);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(i => i.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const onOrderComplete = (pointsEarned: number, pointsSpent: number) => {
    setUser(prev => {
      const newPoints = prev.points - pointsSpent + pointsEarned;
      const newLifetime = prev.lifetimePoints + pointsEarned;
      let newTier = prev.tier;
      if (newLifetime > 2000) newTier = 'Ouro';
      else if (newLifetime > 500) newTier = 'Prata';
      else newTier = 'Bronze';
      
      return {
        ...prev,
        points: newPoints,
        lifetimePoints: newLifetime,
        tier: newTier as any
      };
    });
    setCart([]);
  };

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar 
          cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} 
          toggleCart={() => setIsCartOpen(true)} 
          points={user.points}
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home addToCart={(p) => { addToCart(p); setIsCartOpen(true); }} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
            <Route path="/store" element={<Store addToCart={(p) => { addToCart(p); setIsCartOpen(true); }} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
            <Route path="/product/:id" element={<ProductDetails addToCart={(p) => { addToCart(p); setIsCartOpen(true); }} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
            <Route path="/checkout" element={<Checkout cart={cart} user={user} onComplete={onOrderComplete} />} />
            <Route path="/account" element={<Account user={user} wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={(p) => { addToCart(p); setIsCartOpen(true); }} />} />
          </Routes>
        </main>

        <Footer />
        
        <CartSidebar 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          navigateToCheckout={() => {
            setIsCartOpen(false);
            window.location.hash = '/checkout';
          }}
        />
      </div>
    </HashRouter>
  );
}
