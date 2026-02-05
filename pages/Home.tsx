
import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Zap, 
  Flame, 
  Package, 
  Truck, 
  ShieldCheck, 
  Award,
  ArrowRight,
  Clock,
  Star,
  Smartphone,
  Cpu,
  ShoppingBag,
  CheckCircle2
} from 'lucide-react';
import { PRODUCTS, COLORS, TESTIMONIALS } from '../constants';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

const Home = ({ 
  addToCart, 
  wishlist, 
  toggleWishlist 
}: { 
  addToCart: (p: Product) => void,
  wishlist: string[],
  toggleWishlist: (id: string) => void
}) => {
  const bestSellers = PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);
  const flashDeals = PRODUCTS.filter(p => p.originalPrice).slice(0, 4);
  const newArrivals = PRODUCTS.slice(0, 4);

  // Estado para o Timer (Começando em 2h 45m 00s = 9900 segundos)
  const [timeLeft, setTimeLeft] = useState(9900);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 9900)); // Reinicia se chegar a 0 para demo
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = useMemo(() => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    return {
      h: hours.toString().padStart(2, '0'),
      m: minutes.toString().padStart(2, '0'),
      s: seconds.toString().padStart(2, '0')
    };
  }, [timeLeft]);

  // Lógica de Rotação por Hora dos Depoimentos
  const currentTestimonials = useMemo(() => {
    const now = new Date();
    // Cria uma semente baseada no dia e hora (Ex: 2024102514)
    const hourSeed = now.getHours() + (now.getDate() * 24) + (now.getMonth() * 31 * 24);
    
    // Seleciona 3 índices diferentes baseados na semente
    const total = TESTIMONIALS.length;
    const idx1 = hourSeed % total;
    const idx2 = (hourSeed + 2) % total;
    const idx3 = (hourSeed + 5) % total;

    // Garante que sejam únicos (se o pool for pequeno, o +2 e +5 ajudam)
    return [
      TESTIMONIALS[idx1],
      TESTIMONIALS[idx2],
      TESTIMONIALS[idx3]
    ];
  }, []);

  return (
    <div className="pb-20 overflow-hidden">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 py-12 sm:py-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-red-500/40">
                <Zap className="h-4 w-4 fill-white" /> Entrega em até 3h em Cascavel
              </div>
              
              <h1 className="text-5xl sm:text-7xl font-black text-white leading-[1.1] tracking-tighter">
                O Shopping da Cidade na <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">Palma da Mão.</span>
              </h1>
              
              <p className="text-xl text-blue-100/80 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">
                Tecnologia, Casa e Moda com o frete mais rápido da região. <span className="text-white font-bold underline decoration-red-500 underline-offset-4">Tudo Aqui</span>, em minutos.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                <Link 
                  to="/store" 
                  className="group w-full sm:w-auto bg-red-500 text-white px-12 py-5 rounded-[2rem] text-xl font-black hover:bg-red-600 transition-all shadow-2xl shadow-red-500/40 flex items-center justify-center gap-3 active:scale-95"
                >
                  Explorar Marketplace
                  <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center gap-4 py-2 px-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <img 
                        key={i} 
                        src={`https://i.pravatar.cc/100?img=${i+10}`} 
                        className="w-10 h-10 rounded-full border-2 border-blue-900 shadow-xl" 
                        alt="User"
                      />
                    ))}
                  </div>
                  <div className="text-left">
                    <p className="text-white font-black text-sm">+4k Ativos</p>
                    <p className="text-blue-300 text-[10px] uppercase font-bold tracking-widest">Em Cascavel</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="relative z-10 bg-gradient-to-tr from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-4 rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)]">
                <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] group isolate">
                  <img 
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                    alt="Marketplace Technology"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-transparent to-transparent opacity-90" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-10 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-400 text-amber-900 text-[10px] font-black px-3 py-1 rounded-full uppercase">Oferta Premium</span>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(star => <Star key={star} className="h-3 w-3 text-amber-400 fill-amber-400" />)}
                      </div>
                    </div>
                    <h3 className="text-white text-4xl font-black leading-tight">Mundo Gamer & Tech com 40% OFF</h3>
                    <p className="text-blue-200 text-sm font-medium">Os melhores periféricos com estoque local imediato.</p>
                    <div className="pt-4">
                      <div className="inline-flex items-center gap-4 bg-white text-blue-900 px-6 py-3 rounded-2xl font-black text-sm shadow-xl">
                         Resgatar Cupom: <span className="text-red-500 tracking-widest">CASCAVEL10</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Widgets movidos para dentro do container para evitar bordas quebradas */}
                <div className="absolute right-8 top-12 bg-white p-5 rounded-3xl shadow-2xl border border-gray-100 animate-bounce-slow z-20 max-w-[200px]">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-xl shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase">Status</p>
                      <p className="text-xs font-bold text-blue-900 leading-tight">Entrega Garantida</p>
                    </div>
                  </div>
                </div>

                {/* Widget Vendas Hoje - Movido para o TOPO DIREITO (abaixo do status) para liberar a parte inferior */}
                <div className="absolute right-8 top-44 bg-blue-900 p-5 rounded-3xl shadow-2xl border border-blue-800 animate-pulse-subtle z-20 max-w-[200px]">
                   <div className="flex items-center gap-3">
                    <div className="bg-red-50 p-2 rounded-xl shrink-0">
                      <ShoppingBag className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-blue-300 uppercase">Vendas Hoje</p>
                      <p className="text-xs font-bold text-white">+120 Pedidos</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Efeitos de fundo mantidos */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-500 rounded-full blur-3xl opacity-40 z-0"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-400 rounded-full blur-3xl opacity-30 z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="bg-white border-b border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="flex items-center gap-4 group cursor-default">
              <div className="bg-gray-50 p-4 rounded-2xl group-hover:bg-red-50 transition-colors">
                <Truck className="h-8 w-8 text-blue-900 group-hover:text-red-500 transition-colors" />
              </div>
              <div>
                <h4 className="font-black text-blue-900 text-sm">Entrega VIP</h4>
                <p className="text-xs text-gray-500">Logística Própria Local</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group cursor-default">
              <div className="bg-gray-50 p-4 rounded-2xl group-hover:bg-red-50 transition-colors">
                <ShieldCheck className="h-8 w-8 text-blue-900 group-hover:text-red-500 transition-colors" />
              </div>
              <div>
                <h4 className="font-black text-blue-900 text-sm">Compra Segura</h4>
                <p className="text-xs text-gray-500">Garantia TudoAki</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group cursor-default">
              <div className="bg-gray-50 p-4 rounded-2xl group-hover:bg-red-50 transition-colors">
                <Zap className="h-8 w-8 text-blue-900 group-hover:text-red-500 transition-colors" />
              </div>
              <div>
                <h4 className="font-black text-blue-900 text-sm">Aprovação Instantânea</h4>
                <p className="text-xs text-gray-500">Cashback Acumulativo</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group cursor-default">
              <div className="bg-gray-50 p-4 rounded-2xl group-hover:bg-red-50 transition-colors">
                <Award className="h-8 w-8 text-blue-900 group-hover:text-red-500 transition-colors" />
              </div>
              <div>
                <h4 className="font-black text-blue-900 text-sm">Cascavel VIP</h4>
                <p className="text-xs text-gray-500">Clube de Vantagens</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">
        
        {/* 🔥 Mais Vendidos */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-red-500 font-black uppercase text-xs tracking-[0.2em]">
                <Flame className="h-5 w-5 fill-red-500 animate-pulse" /> Popular em Cascavel
              </div>
              <h2 className="text-4xl font-black text-blue-900 tracking-tight">Os Favoritos da Semana</h2>
            </div>
            <Link to="/store" className="group flex items-center gap-3 bg-blue-50 text-blue-900 px-6 py-3 rounded-2xl font-black text-sm hover:bg-blue-900 hover:text-white transition-all shadow-sm">
              Ver Catálogo Completo <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map(p => (
              <ProductCard 
                key={p.id} 
                product={p} 
                onAddToCart={addToCart} 
                priority={true} 
                isWishlisted={wishlist.includes(p.id)}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        </section>

        {/* ⚡ Ofertas Relâmpago (COM TIMER FUNCIONAL) */}
        <section className="bg-gradient-to-br from-red-600 to-red-700 rounded-[4rem] p-8 sm:p-16 relative overflow-hidden shadow-[0_40px_80px_-15px_rgba(239,68,68,0.3)]">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Zap className="w-96 h-96 text-white fill-white" />
          </div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8">
              <div className="flex items-center gap-6">
                <div className="bg-white p-4 rounded-[1.5rem] shadow-2xl animate-pulse">
                  <Zap className="h-8 w-8 text-red-600 fill-red-600" />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-white tracking-tight">Liquidação Relâmpago</h2>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="bg-black/20 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                      <Clock className="h-4 w-4" /> Expira em:
                    </span>
                    <div className="flex gap-2">
                      <div className="bg-white text-red-600 px-3 py-1 rounded-lg font-black text-lg min-w-[3rem] text-center">{formattedTime.h}</div>
                      <span className="text-white font-black text-xl">:</span>
                      <div className="bg-white text-red-600 px-3 py-1 rounded-lg font-black text-lg min-w-[3rem] text-center">{formattedTime.m}</div>
                      <span className="text-white font-black text-xl">:</span>
                      <div className="bg-white text-red-600 px-3 py-1 rounded-lg font-black text-lg min-w-[3rem] text-center">{formattedTime.s}</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-red-100 text-lg font-medium max-w-sm">
                Descontos agressivos em itens selecionados. <span className="text-white font-black underline">Estoque Limitado.</span>
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {flashDeals.map(p => (
                <ProductCard 
                  key={p.id} 
                  product={p} 
                  onAddToCart={addToCart} 
                  isWishlisted={wishlist.includes(p.id)}
                  onToggleWishlist={toggleWishlist}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 📦 Novidades */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-600 font-black uppercase text-xs tracking-[0.2em]">
                <Package className="h-5 w-5" /> Fresh Arrivals
              </div>
              <h2 className="text-4xl font-black text-blue-900 tracking-tight">Recém Chegados no Porto</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map(p => (
              <ProductCard 
                key={p.id} 
                product={p} 
                onAddToCart={addToCart} 
                isWishlisted={wishlist.includes(p.id)}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        </section>
      </div>
      
      {/* Testimonials - Rotação Dinâmica */}
      <section className="bg-gray-50/50 py-32 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-blue-900 mb-20 tracking-tight">A voz de quem compra local</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {currentTestimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 relative group hover:shadow-xl transition-shadow flex flex-col h-full">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                   <div className="bg-blue-900 p-3 rounded-2xl shadow-lg shadow-blue-900/20">
                    <Star className="h-6 w-6 text-amber-400 fill-amber-400" />
                   </div>
                </div>
                <div className="flex justify-center mb-6 pt-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`h-4 w-4 ${j < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} />
                  ))}
                </div>
                <p className="text-gray-600 text-lg leading-relaxed mb-10 font-medium flex-grow italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center justify-center gap-4 mt-auto">
                  <img src={testimonial.avatar} className="w-14 h-14 rounded-full border-2 border-red-50 shadow-md" alt={testimonial.name} />
                  <div className="text-left">
                    <p className="text-base font-black text-blue-900">{testimonial.name}</p>
                    <div className="flex items-center gap-1 text-[10px] text-green-600 font-bold uppercase tracking-widest">
                      <CheckCircle2 className="h-3 w-3" /> Bairro {testimonial.district}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
