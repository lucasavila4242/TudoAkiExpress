
import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  Truck, 
  ShieldCheck, 
  ArrowLeft, 
  ChevronRight, 
  MessageCircle, 
  Share2, 
  Heart,
  Plus,
  Minus,
  CheckCircle2,
  BellRing,
  ExternalLink,
  ChevronDown,
  Zap,
  ShoppingCart
} from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

const ProductDetails = ({ 
  addToCart, 
  wishlist, 
  toggleWishlist 
}: { 
  addToCart: (p: Product) => void,
  wishlist: string[],
  toggleWishlist: (id: string) => void
}) => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  const [notifyData, setNotifyData] = useState({ name: '', whatsapp: '' });
  const [activeTab, setActiveTab] = useState('description');

  const product = useMemo(() => PRODUCTS.find(p => p.id === id), [id]);
  const upsellProducts = useMemo(() => {
    if (!product?.upsellIds) return [];
    return PRODUCTS.filter(p => product.upsellIds?.includes(p.id));
  }, [product]);

  if (!product) return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h2 className="text-2xl font-black text-blue-900">Ops! Produto não encontrado</h2>
      <Link to="/store" className="mt-4 bg-red-500 text-white px-8 py-3 rounded-2xl font-black hover:scale-105 transition-transform">Voltar para a loja</Link>
    </div>
  );

  const isOutOfStock = product.stock === 0;
  const isWishlisted = wishlist.includes(product.id);

  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/store" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-blue-900 font-bold mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Explorar mais produtos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Gallery Area */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-gray-50 border border-gray-100 group shadow-lg">
              <img src={product.image} className="w-full h-full object-cover" />
              <button 
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-6 right-6 p-4 rounded-full shadow-xl transition-all active:scale-90 ${
                  isWishlisted ? 'bg-red-500 text-white' : 'bg-white/80 backdrop-blur-md text-gray-400 hover:text-red-500'
                }`}
              >
                <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>

          {/* Info Area */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-blue-50 text-blue-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{product.category}</span>
                {product.hasFreeShipping && (
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 border border-emerald-100">
                    <Truck className="h-3 w-3" /> Frete Grátis*
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-blue-900 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 py-3 border-y border-gray-50">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} />
                  ))}
                  <span className="text-sm font-black text-blue-900 ml-1">{product.rating}</span>
                </div>
                <div className="h-1 w-1 bg-gray-200 rounded-full" />
                <span className="text-sm font-bold text-gray-400">{product.reviewsCount} avaliações</span>
              </div>

              <div className="py-4">
                <div className="flex items-baseline gap-3 mb-1">
                  {product.originalPrice && (
                    <span className="text-xl text-gray-400 line-through">R$ {product.originalPrice.toFixed(2)}</span>
                  )}
                  <span className="text-5xl font-black text-red-500 tracking-tighter">R$ {product.price.toFixed(2)}</span>
                </div>
                <div className="mt-2 flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-2xl w-fit border border-amber-100">
                  <Zap className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-black uppercase">Acumule {Math.floor(product.price)} pontos</span>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-[2rem] space-y-4 border border-gray-100">
                <div className="flex items-start gap-4">
                  <Truck className="h-6 w-6 text-emerald-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-black text-blue-900">Entrega Express Cascavel</h4>
                    <p className="text-xs text-gray-500 font-medium">
                      {product.deliveryToday ? "Chega hoje se pedir até as 14h!" : "Envio imediato em 24h"}
                    </p>
                    {product.hasFreeShipping && (
                      <p className="text-[10px] text-emerald-600 font-black mt-1 uppercase tracking-tighter">* Frete Grátis disponível apenas para regiões selecionadas.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-100 bg-gray-50 rounded-2xl h-16 overflow-hidden">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-14 h-full flex items-center justify-center hover:bg-white transition-colors"
                    ><Minus className="h-4 w-4" /></button>
                    <span className="w-14 text-center font-black text-blue-900 text-lg">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-14 h-full flex items-center justify-center hover:bg-white transition-colors"
                    ><Plus className="h-4 w-4" /></button>
                  </div>
                  <button 
                    onClick={() => addToCart({ ...product, quantity } as any)}
                    className="flex-1 h-16 bg-red-500 text-white rounded-2xl font-black text-xl shadow-xl shadow-red-500/20 hover:bg-red-600 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                  >
                    <ShoppingCart className="h-6 w-6" /> Comprar Agora
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs & Details */}
        <div className="mt-20 border-t border-gray-100 pt-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-12 border-b border-gray-100 mb-12">
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-4 text-xs font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === 'description' ? 'text-blue-900' : 'text-gray-400'}`}
              >
                Descrição Completa
                {activeTab === 'description' && <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500 rounded-full" />}
              </button>
            </div>

            <div className="prose prose-blue max-w-none">
              <div className="space-y-8">
                <h3 className="text-3xl font-black text-blue-900 leading-tight">O alívio imediato para o seu dia a dia.</h3>
                <div className="text-gray-600 leading-relaxed text-lg font-medium whitespace-pre-line">
                  {product.description}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
                  {[
                    "Baixo consumo de energia via USB",
                    "3 níveis de velocidade ajustáveis",
                    "Tecnologia de resfriamento por névoa",
                    "Reservatório fácil de abastecer",
                    "Operação silenciosa para dormir",
                    "Alça de transporte premium"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                      <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0" />
                      <span className="text-blue-900 font-bold text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
