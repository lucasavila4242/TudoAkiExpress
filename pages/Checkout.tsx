
import React, { useState, useMemo, useEffect } from 'react';
import { 
  CheckCircle2, 
  Truck, 
  MapPin, 
  ChevronRight, 
  Package, 
  ShieldCheck, 
  ShoppingBag,
  Zap,
  Award,
  Plus,
  X,
  Sparkles,
  Clock,
  TrendingUp,
  CreditCard,
  QrCode,
  Copy,
  Loader2,
  Lock,
  Ticket,
  Tag,
  AlertCircle,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { CartItem, CheckoutData, User, Product } from '../types';
import { PRODUCTS } from '../constants';

// INICIALIZAÇÃO DO MERCADO PAGO
// Chave pública
initMercadoPago('APP_USR-7aecb091-762e-48c9-8161-7f5d2641d76e', { locale: 'pt-BR' });

// Token de Acesso
const MP_ACCESS_TOKEN = 'APP_USR-4804417043420437-012918-a9ca3d55a51b00f66109d7a322d68cf5-2717547924';

const VALID_COUPONS: Record<string, number> = {
  'CASCAVEL10': 0.10, // 10% de desconto
  'BEMVINDO': 0.05,   // 5% de desconto
  'AKIFREE': 15.00,   // Valor fixo
  'FRETE10': 0        // Isenção total de frete
};

const UpsellModal = ({ isOpen, onClose, items, onAdd }: { isOpen: boolean, onClose: () => void, items: Product[], onAdd: (p: Product) => void }) => {
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen || items.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-md animate-in fade-in duration-500" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-300 border border-white">
        <div className="bg-gradient-to-r from-red-600 to-red-500 p-6 text-white text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="h-5 w-5" />
          </button>
          <div className="flex justify-center mb-2">
            <div className="bg-white/20 p-2 rounded-full">
              <Sparkles className="h-8 w-8 text-amber-300 animate-pulse" />
            </div>
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-white">Aproveite esta Oferta!</h2>
          <div className="inline-flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full mt-2">
            <Clock className="h-3 w-3 text-amber-300" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Expira em {formatTime(timeLeft)}</span>
          </div>
        </div>
        <div className="p-8 space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-lg font-bold text-blue-900">Complete seu Kit</h3>
            <p className="text-sm text-gray-500">Adicione estes acessórios essenciais e não pague frete extra por eles:</p>
          </div>
          <div className="space-y-3">
            {items.map(product => (
              <div key={product.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-3xl border border-gray-100 group hover:border-red-200 transition-all">
                <div className="relative h-20 w-20 flex-shrink-0">
                  <img src={product.image} className="w-full h-full rounded-2xl object-cover bg-white shadow-sm" />
                  <div className="absolute -top-2 -left-2 bg-amber-400 text-amber-900 text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-sm">RECOMENDADO</div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-black text-blue-900 leading-tight mb-0.5">{product.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-red-500">R$ {product.price.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={() => { onAdd(product); onClose(); }}
                  className="bg-red-500 text-white p-4 rounded-2xl shadow-lg hover:bg-red-600 active:scale-95 transition-all"
                >
                  <Plus className="h-6 w-6" />
                </button>
              </div>
            ))}
          </div>
          <div className="text-center pt-2">
            <button onClick={onClose} className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors">Não, quero finalizar sem os extras</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Checkout = ({ cart, user, onComplete }: { cart: CartItem[], user: User, onComplete: (earn: number, spent: number, details: any) => void }) => {
  const [data, setData] = useState<CheckoutData>({
    name: user.name,
    whatsapp: user.whatsapp || '',
    address: user.address || '',
    deliveryMethod: 'standard',
    paymentMethod: 'pix',
  });
  
  const [isUpsellOpen, setIsUpsellOpen] = useState(false);
  const [upsellShown, setUpsellShown] = useState(false);
  const [usePoints, setUsePoints] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing'>('idle');
  const [processingMessage, setProcessingMessage] = useState('Iniciando pagamento seguro...');

  // Coupon State
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string, discount: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  const subtotal = useMemo(() => cart.reduce((acc, i) => acc + i.price * i.quantity, 0), [cart]);
  
  // Verifica se TODOS os itens no carrinho têm frete grátis (ex: item de teste)
  const allItemsHaveFreeShipping = useMemo(() => cart.length > 0 && cart.every(item => item.hasFreeShipping), [cart]);

  const couponDiscountValue = useMemo(() => {
    if (!appliedCoupon) return 0;
    // Se o cupom for FRETE10, o desconto no produto é 0 (aplica-se apenas ao frete)
    if (appliedCoupon.code === 'FRETE10') return 0;
    return subtotal * appliedCoupon.discount;
  }, [subtotal, appliedCoupon]);

  // Lógica de frete: Grátis se (Subtotal > 150) OU (Todos itens têm frete grátis) OU (Cupom FRETE10 aplicado)
  const isFreeShipping = subtotal > 150 || allItemsHaveFreeShipping || appliedCoupon?.code === 'FRETE10';
  
  // Lógica Especial para Produto de Teste:
  // Se o carrinho contiver APENAS o item de teste (e o frete não for grátis por cupom),
  // define o valor do frete como R$ 0,01 para permitir o teste de pagamento com valor baixo.
  const isTestCart = useMemo(() => cart.length === 1 && cart[0].id === 'test-checkout-01', [cart]);
  const standardShippingPrice = isTestCart ? 0.01 : 10.00;

  const shipping = data.deliveryMethod === 'standard' ? (isFreeShipping ? 0 : standardShippingPrice) : 25;
  
  const maxRedeemablePoints = Math.min(user.points, Math.floor((subtotal + shipping - couponDiscountValue) * 20));
  const pointsValue = usePoints ? maxRedeemablePoints / 20 : 0;
  
  const total = Math.max(0, subtotal + shipping - pointsValue - couponDiscountValue);
  const pointsToEarn = Math.floor(total);

  const availableUpsells = useMemo(() => {
    const idsInCart = new Set(cart.map(item => item.id));
    const potentialIds = new Set<string>();
    cart.forEach(item => item.upsellIds?.forEach(id => { if (!idsInCart.has(id)) potentialIds.add(id); }));
    return PRODUCTS.filter(p => potentialIds.has(p.id)).slice(0, 2);
  }, [cart]);

  const triggerUpsellOnDetails = () => {
    if (availableUpsells.length > 0 && !upsellShown) {
      setTimeout(() => { setIsUpsellOpen(true); setUpsellShown(true); }, 500);
    }
  };

  const handleApplyCoupon = () => {
    setCouponError('');
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (VALID_COUPONS[code] !== undefined) {
      setAppliedCoupon({ code, discount: VALID_COUPONS[code] });
      setCouponInput('');
    } else {
      setCouponError('Cupom inválido ou expirado.');
      setTimeout(() => setCouponError(''), 3000);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleAddUpsell = (product: Product) => {
    window.dispatchEvent(new CustomEvent('add-to-cart-checkout', { detail: product }));
  };

  // Função para criar Preferência do Mercado Pago e Redirecionar
  const handleMercadoPagoRedirect = async () => {
    try {
      setProcessingMessage("Calculando descontos e gerando pagamento...");
      
      // 1. Prepara a lista base de itens do carrinho
      const items = cart.map(item => ({
        id: item.id,
        title: item.name,
        description: item.description?.substring(0, 200) || item.name,
        picture_url: item.image,
        category_id: "electronics",
        quantity: item.quantity,
        currency_id: "BRL",
        unit_price: Number(item.price)
      }));

      // 2. Adiciona o frete como um item para que ele também possa ser descontado se necessário
      if (shipping > 0) {
        items.push({
          id: "shipping",
          title: "Frete Express Cascavel",
          description: "Entrega local",
          picture_url: "",
          category_id: "services",
          quantity: 1,
          currency_id: "BRL",
          unit_price: Number(shipping)
        });
      }

      // 3. Lógica de Distribuição de Desconto (Pontos + Cupom)
      const totalDiscount = couponDiscountValue + pointsValue;

      if (totalDiscount > 0) {
        let remainingDiscount = totalDiscount;

        for (let i = 0; i < items.length; i++) {
            if (remainingDiscount <= 0.01) break; 

            const currentItem = items[i];
            const itemTotalValue = currentItem.unit_price * currentItem.quantity;

            if (itemTotalValue >= remainingDiscount) {
                const discountPerUnit = remainingDiscount / currentItem.quantity;
                currentItem.unit_price = Number((currentItem.unit_price - discountPerUnit).toFixed(2));
                if (currentItem.id !== 'shipping') {
                   currentItem.description = `(Desconto aplicado: R$ ${remainingDiscount.toFixed(2)}) ${currentItem.description}`;
                }
                remainingDiscount = 0;
            } else {
                const discountUsed = itemTotalValue;
                currentItem.unit_price = 0;
                currentItem.description = `(Item 100% abonado por pontos/cupom) ${currentItem.description}`;
                remainingDiscount -= discountUsed;
            }
        }
      }

      // 4. Configuração do Pagador
      const isOwner = user.email === 'lucasaviladark@gmail.com';
      const payerEmail = (isOwner || !user.email.includes('@')) 
        ? `cliente.teste.${Date.now()}@gmail.com` 
        : user.email;

      const cleanPhone = data.whatsapp.replace(/\D/g, '') || "45999999999";

      const preferenceData = {
        items: items,
        payer: {
          name: data.name.split(' ')[0],
          surname: data.name.split(' ').slice(1).join(' ') || 'Cliente',
          email: payerEmail, 
          phone: {
            area_code: cleanPhone.substring(0, 2),
            number: cleanPhone.substring(2)
          },
          address: {
            zip_code: "85800000",
            street_name: data.address || "Rua Cascavel",
            street_number: 123
          }
        },
        payment_methods: {
          excluded_payment_types: [
             { id: "ticket" } // Boleto removido
          ],
          installments: 12
        },
        back_urls: {
          success: `${window.location.origin}/#/account`,
          failure: `${window.location.origin}/#/checkout`,
          pending: `${window.location.origin}/#/checkout`
        },
        auto_return: "approved",
        statement_descriptor: "TUDOAKI"
      };

      const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${MP_ACCESS_TOKEN}`
        },
        body: JSON.stringify(preferenceData),
      });

      if (!response.ok) {
        const err = await response.json();
        console.error("MP Error:", err);
        throw new Error(`Erro MP: ${response.status}`);
      }

      const result = await response.json();
      
      // SALVA O PEDIDO LOCALMENTE COM DADOS DO CLIENTE
      onComplete(pointsToEarn, usePoints ? maxRedeemablePoints : 0, {
        id: result.external_reference,
        total: total,
        address: data.address,
        paymentMethod: 'mercadopago',
        customerName: data.name,
        customerWhatsapp: data.whatsapp
      });

      // Redirecionar para o Checkout Pro
      if (result.init_point) {
        window.location.href = result.init_point;
      } else {
        throw new Error("Link de pagamento não gerado");
      }
      
    } catch (error) {
      console.error(error);
      setProcessingMessage("Erro ao conectar com Mercado Pago.");
      setPaymentStatus('idle');
      alert("Houve um erro ao gerar o pagamento. Tente novamente.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStatus('processing');
    await handleMercadoPagoRedirect();
  };

  if (paymentStatus === 'processing') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
        <div className="relative mb-8">
          <div className="w-24 h-24 border-4 border-gray-100 border-t-red-500 rounded-full animate-spin" />
          <Lock className="absolute inset-0 m-auto h-8 w-8 text-blue-900" />
        </div>
        <h2 className="text-2xl font-black text-blue-900 mb-2">{processingMessage}</h2>
        <p className="text-gray-500 text-sm">Você será redirecionado para o ambiente seguro do Mercado Pago.</p>
        <div className="mt-8 flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
          <ShieldCheck className="h-4 w-4" /> Gateway Criptografado SSL
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <UpsellModal isOpen={isUpsellOpen} onClose={() => setIsUpsellOpen(false)} items={availableUpsells} onAdd={handleAddUpsell} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-8 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Data */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 bg-blue-900 text-white rounded-2xl flex items-center justify-center font-black">1</div>
                  <h3 className="text-xl font-black text-blue-900">Seus Dados</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1">Nome Completo</label>
                    <input required onFocus={triggerUpsellOnDetails} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3.5 focus:border-red-500 focus:outline-none transition-all font-medium" value={data.name} onChange={e => setData({...data, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1">WhatsApp</label>
                    <input required type="tel" onFocus={triggerUpsellOnDetails} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3.5 focus:border-red-500 focus:outline-none transition-all font-medium" value={data.whatsapp} onChange={e => setData({...data, whatsapp: e.target.value})} />
                  </div>
                </div>
              </div>

              {/* Step 2: Delivery */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 bg-blue-900 text-white rounded-2xl flex items-center justify-center font-black">2</div>
                  <h3 className="text-xl font-black text-blue-900">Entrega Local</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1">Endereço de Entrega em Cascavel</label>
                    <div className="relative">
                      <input 
                        required
                        type="text" 
                        placeholder="Rua, Número, Bairro"
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3.5 pl-12 focus:border-red-500 focus:bg-white focus:outline-none transition-all font-medium"
                        value={data.address}
                        onChange={e => setData({...data, address: e.target.value})}
                      />
                      <MapPin className="absolute left-5 top-4 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                      type="button"
                      onClick={() => setData({...data, deliveryMethod: 'standard'})}
                      className={`relative p-6 rounded-[2rem] border-2 text-left transition-all ${data.deliveryMethod === 'standard' ? 'border-red-500 bg-red-50/50' : 'border-gray-100 bg-gray-50 hover:border-gray-200'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <Truck className={`h-6 w-6 ${data.deliveryMethod === 'standard' ? 'text-red-500' : 'text-gray-400'}`} />
                        <span className="font-black text-blue-900">{isFreeShipping ? 'GRÁTIS' : `R$ ${standardShippingPrice.toFixed(2)}`}</span>
                      </div>
                      <p className="text-sm font-black text-blue-900">Padrão Hoje</p>
                      <p className="text-sm text-gray-500 font-medium">Entregamos em qualquer bairro</p>
                    </button>

                    <button 
                      type="button"
                      onClick={() => setData({...data, deliveryMethod: 'scheduled'})}
                      className={`relative p-6 rounded-[2rem] border-2 text-left transition-all ${data.deliveryMethod === 'scheduled' ? 'border-red-500 bg-red-50/50' : 'border-gray-100 bg-gray-50 hover:border-gray-200'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <Clock className={`h-6 w-6 ${data.deliveryMethod === 'scheduled' ? 'text-red-500' : 'text-gray-400'}`} />
                        <span className="font-black text-blue-900">R$ 25,00</span>
                      </div>
                      <p className="text-sm font-black text-blue-900">Agendado</p>
                      <p className="text-sm text-gray-500 font-medium">Você escolhe o melhor horário</p>
                    </button>
                  </div>
                </div>
              </div>

              {/* Loyalty Points */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border-2 border-amber-200 p-8 rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Award className="w-32 h-32 text-amber-500" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-5 w-5 text-amber-500 fill-amber-500" />
                    <h3 className="text-lg font-black text-amber-900">AkiPrivilégio</h3>
                  </div>
                  <p className="text-sm text-amber-800 leading-relaxed mb-6">
                    Você tem <span className="font-black text-amber-900">{user.points} AkiPoints</span>. 
                    Usar <span className="font-black">{maxRedeemablePoints}</span> para descontar <span className="text-green-600 font-black">R$ {pointsValue.toFixed(2)}</span>?
                  </p>
                  <label className="flex items-center gap-4 cursor-pointer select-none group">
                    <input 
                      type="checkbox" 
                      className="w-6 h-6 rounded-xl text-amber-600 border-amber-300 focus:ring-amber-500 transition-all cursor-pointer"
                      checked={usePoints}
                      onChange={() => setUsePoints(!usePoints)}
                      disabled={user.points < 20}
                    />
                    <span className="text-sm font-black text-amber-900 uppercase tracking-widest">Abater pontos no total</span>
                  </label>
                </div>
              </div>

              {/* Step 3: Payment */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 bg-blue-900 text-white rounded-2xl flex items-center justify-center font-black">3</div>
                  <h3 className="text-xl font-black text-blue-900">Forma de Pagamento</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <button type="button" onClick={() => setData({...data, paymentMethod: 'pix'})} className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 ${data.paymentMethod === 'pix' ? 'border-red-500 bg-red-50' : 'border-gray-100 bg-gray-50 hover:border-gray-200'}`}>
                    <QrCode className={`h-8 w-8 ${data.paymentMethod === 'pix' ? 'text-red-500' : 'text-gray-400'}`} />
                    <div className="text-center">
                      <p className="font-black text-blue-900 text-sm">PIX</p>
                      <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">Instantâneo via MP</p>
                    </div>
                  </button>

                  <button type="button" onClick={() => setData({...data, paymentMethod: 'card'})} className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 ${data.paymentMethod === 'card' ? 'border-red-500 bg-red-50' : 'border-gray-100 bg-gray-50 hover:border-gray-200'}`}>
                    <CreditCard className={`h-8 w-8 ${data.paymentMethod === 'card' ? 'text-red-500' : 'text-gray-400'}`} />
                    <div className="text-center">
                      <p className="font-black text-blue-900 text-sm">Cartão</p>
                      <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">Até 12x via MP</p>
                    </div>
                  </button>
                </div>

                {/* Secure Payment Info Block - Substitui os inputs falsos */}
                <div className="bg-blue-50 border border-blue-100 p-6 rounded-[2rem] flex items-center gap-4 animate-in fade-in duration-500">
                   <div className="bg-blue-500 p-3 rounded-full text-white shadow-lg shadow-blue-500/30">
                     <ShieldCheck className="h-6 w-6" />
                   </div>
                   <div className="flex-1">
                     <p className="text-xs font-black text-blue-900 uppercase tracking-wide mb-1">
                       {data.paymentMethod === 'pix' ? 'Pagamento PIX Seguro' : 'Pagamento Cartão Seguro'}
                     </p>
                     <p className="text-sm text-gray-600 leading-snug">
                       Ao clicar em "Finalizar", você será redirecionado para o <b>Mercado Pago</b> para concluir sua compra com segurança total.
                     </p>
                   </div>
                   <ExternalLink className="h-5 w-5 text-gray-400" />
                </div>

              </div>

              <button type="submit" className="w-full bg-red-500 text-white py-6 rounded-[2rem] font-black text-2xl shadow-2xl shadow-red-500/30 hover:bg-red-600 active:scale-[0.98] transition-all flex items-center justify-center gap-4">
                Finalizar e Pagar
                <ChevronRight className="h-8 w-8" />
              </button>
            </form>
          </div>

          <aside className="lg:col-span-4 space-y-6 sticky top-24 h-fit">
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8 bg-blue-900 text-white flex justify-between items-center">
                <h3 className="text-lg font-black flex items-center gap-2">Resumo</h3>
                <span className="text-xs bg-red-500 px-2 py-0.5 rounded-full">Cascavel Express</span>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <img src={item.image} className="w-16 h-16 rounded-2xl object-cover border border-gray-100" />
                      <div className="flex-1">
                        <h4 className="text-[11px] font-bold text-gray-800 line-clamp-2">{item.name}</h4>
                        <span className="text-xs font-black text-blue-900">R$ {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Section */}
                <div className="pt-6 border-t border-gray-100">
                  {!appliedCoupon ? (
                    <div className="space-y-3">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Ticket className="h-3 w-3" /> Possui um cupom?
                      </p>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <input 
                            type="text" 
                            placeholder="Código" 
                            className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-2.5 text-xs font-bold outline-none transition-all ${couponError ? 'border-red-200 focus:border-red-400' : 'border-gray-100 focus:border-blue-900'}`}
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                          />
                          {couponError && <AlertCircle className="absolute right-3 top-2.5 h-4 w-4 text-red-500" />}
                        </div>
                        <button 
                          type="button"
                          onClick={handleApplyCoupon}
                          className="bg-blue-900 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase hover:bg-red-500 transition-colors"
                        >
                          Aplicar
                        </button>
                      </div>
                      {couponError && <p className="text-[10px] text-red-500 font-bold ml-1">{couponError}</p>}
                    </div>
                  ) : (
                    <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className="bg-emerald-500 p-2 rounded-lg">
                          <Tag className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-emerald-800 uppercase leading-none">Cupom Aplicado!</p>
                          <p className="text-sm font-black text-emerald-600">{appliedCoupon.code}</p>
                        </div>
                      </div>
                      <button onClick={removeCoupon} className="p-2 hover:bg-red-100 rounded-full text-red-400 transition-colors">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-gray-100 space-y-3">
                  <div className="flex justify-between text-xs font-bold uppercase"><span>Subtotal</span><span>R$ {subtotal.toFixed(2)}</span></div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-xs text-emerald-600 font-black uppercase">
                      <span>{appliedCoupon.code === 'FRETE10' ? 'Cupom Frete' : 'Desconto Cupom'}</span>
                      <span>{appliedCoupon.code === 'FRETE10' ? 'Isenção' : `- R$ ${couponDiscountValue.toFixed(2)}`}</span>
                    </div>
                  )}

                  {usePoints && (
                    <div className="flex justify-between text-xs text-blue-600 font-black uppercase">
                      <span>Desconto Pontos</span>
                      <span>- R$ {pointsValue.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-xs text-gray-500 font-bold uppercase">
                    <span>Frete Local</span>
                    <span className={`${isFreeShipping ? 'text-green-600 font-black' : 'text-gray-900'}`}>
                      {isFreeShipping ? 'GRÁTIS' : `R$ ${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-gray-50 pt-4"><span className="text-sm font-black text-blue-900">TOTAL</span><span className="text-2xl font-black text-red-500 leading-none">R$ {total.toFixed(2)}</span></div>
                </div>
                <div className="bg-blue-50 text-blue-900 p-4 rounded-2xl flex items-center justify-between border border-blue-100 shadow-inner">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-500" />
                    <span className="text-[11px] font-black">Ganhará {pointsToEarn} AkiPoints</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 text-center flex flex-col items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-green-500" />
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Pagamento Seguro via TudoAki Gateway</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
