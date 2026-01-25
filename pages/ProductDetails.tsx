
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
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold">Produto não encontrado</h2>
      <Link to="/store" className="mt-4 text-red-500 font-bold hover:underline">Voltar para a loja</Link>
    </div>
  );

  const isOutOfStock = product.stock === 0;
  const isWishlisted = wishlist.includes(product.id);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending Lead to Discord:", { ...notifyData, productId: product.id });
    alert("Pronto! Avisaremos você assim que o estoque chegar.");
    setIsNotifyModalOpen(false);
  };

  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/store" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-900 font-medium mb-8">
          <ArrowLeft className="h-4 w-4" /> Voltar para a loja
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Gallery Area */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-gray-50 border border-gray-100 group">
              <img src={product.image} className="w-full h-full object-cover" />
              <button 
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-6 right-6 p-3 rounded-full shadow-lg transition-all active:scale-90 ${
                  isWishlisted ? 'bg-red-500 text-white' : 'bg-white/80 backdrop-blur-md text-gray-500 hover:text-red-500'
                }`}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-white' : ''}`} />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(Math.min(4, 1 + (upsellProducts.length)))].map((_, i) => (
                <div key={i} className={`aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${i === 0 ? 'border-red-500 shadow-lg' : 'border-transparent hover:border-gray-200'}`}>
                  <img src={i === 0 ? product.image : upsellProducts[i-1]?.image || `https://picsum.photos/seed/${product.id + i}/200/200`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Info Area */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-blue-50 text-blue-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{product.category}</span>
                {product.isBestSeller && (
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Mais Vendido em Cascavel</span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-blue-900 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 py-2 border-y border-gray-50">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} />
                  ))}
                  <span className="text-sm font-bold text-gray-900 ml-1">{product.rating}</span>
                </div>
                <div className="h-1 w-1 bg-gray-300 rounded-full" />
                <button className="text-sm font-medium text-gray-500 hover:text-blue-900 hover:underline">
                  {product.reviewsCount} avaliações
                </button>
              </div>

              <div className="py-4">
                <div className="flex items-baseline gap-3 mb-1">
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">R$ {product.originalPrice.toFixed(2)}</span>
                  )}
                  <span className="text-4xl font-black text-blue-900">R$ {product.price.toFixed(2)}</span>
                </div>
                <div className="mt-2 flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl w-fit">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <span className="text-xs font-bold">Compre e ganhe {Math.floor(product.price)} AkiPoints</span>
                </div>
              </div>

              {/* UPSELL SECTION: Complete seu Kit */}
              {upsellProducts.length > 0 && !isOutOfStock && (
                <div className="bg-amber-50/50 border border-amber-100 p-5 rounded-3xl space-y-4 animate-in slide-in-from-right duration-500">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-amber-800 uppercase tracking-widest flex items-center gap-2">
                      <Plus className="h-4 w-4" /> Complete seu Kit & Economize
                    </h4>
                    <span className="text-[10px] font-bold text-amber-600">OFERTA LOCAL</span>
                  </div>
                  <div className="space-y-3">
                    {upsellProducts.map(item => (
                      <div key={item.id} className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
                        <img src={item.image} className="w-12 h-12 rounded-xl object-cover" />
                        <div className="flex-1">
                          <p className="text-xs font-bold text-gray-800 line-clamp-1">{item.name}</p>
                          <p className="text-sm font-black text-blue-900">R$ {item.price.toFixed(2)}</p>
                        </div>
                        <button 
                          onClick={() => addToCart(item)}
                          className="bg-amber-400 text-amber-900 p-2 rounded-xl hover:bg-amber-500 transition-colors active:scale-95"
                          title="Adicionar Acessório"
                        >
                          <Plus className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-6 rounded-3xl space-y-4">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Entrega para Cascavel</h4>
                    <p className="text-xs text-gray-500">
                      {product.deliveryToday ? "Receba hoje até as 20h!" : "Envio rápido em 24h"}
                    </p>
                  </div>
                </div>
              </div>

              {isOutOfStock ? (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl flex items-center gap-3">
                    <BellRing className="h-6 w-6 text-blue-900" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">Produto temporariamente esgotado</p>
                      <p className="text-xs text-gray-500">Estamos trabalhando para repor o estoque em breve.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsNotifyModalOpen(true)}
                    className="w-full bg-blue-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    Me Avise quando Disponível
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border-2 border-gray-100 bg-gray-50 rounded-2xl h-14 overflow-hidden">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-12 h-full flex items-center justify-center hover:bg-white transition-colors"
                      ><Minus className="h-4 w-4" /></button>
                      <span className="w-12 text-center font-bold text-blue-900">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-12 h-full flex items-center justify-center hover:bg-white transition-colors"
                      ><Plus className="h-4 w-4" /></button>
                    </div>
                    <button 
                      onClick={() => addToCart({ ...product, quantity } as any)}
                      className="flex-1 h-14 bg-red-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-red-500/20 hover:bg-red-600 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                    >
                      Comprar Agora
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs & Details */}
        <div className="mt-20 border-t border-gray-100 pt-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-12 border-b border-gray-100 mb-12">
              {['description', 'specs', 'shipping'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-blue-900' : 'text-gray-400'}`}
                >
                  {tab === 'description' ? 'Descrição' : tab === 'specs' ? 'Especificações' : 'Entrega'}
                  {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500 rounded-full" />}
                </button>
              ))}
            </div>

            <div className="prose prose-blue max-w-none">
              {activeTab === 'description' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-black text-blue-900">Transforme sua experiência em Cascavel</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    O {product.name} foi selecionado a dedo para trazer mais praticidade e tecnologia para o seu dia a dia. Com design ergonômico e funcionalidades pensadas no usuário moderno, ele se destaca pela durabilidade e eficiência. 
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                    {[
                      "Material de alta resistência premium",
                      "Tecnologia de ponta integrada",
                      "Design exclusivo TudoAkiExpress",
                      "Facilidade de uso e instalação",
                      "Suporte pós-venda garantido",
                      "Melhor custo-benefício da região"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-700 font-medium">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab === 'specs' && (
                <div className="space-y-4">
                  <table className="w-full text-sm border-collapse">
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-4 font-bold text-blue-900 w-1/3">Modelo</td>
                        <td className="py-4 text-gray-600">{product.name} v2.4</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === 'shipping' && (
                <div className="space-y-6">
                  <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100">
                    <h4 className="text-xl font-black text-blue-900 mb-4 flex items-center gap-2">
                      <Truck className="h-6 w-6 text-red-500" /> Entrega Especial Cascavel
                    </h4>
                    <p className="text-gray-700 mb-6">Oferecemos o serviço de entrega mais rápido da cidade.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
