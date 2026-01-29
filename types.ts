
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[]; // Suporte para galeria
  category: string;
  rating: number;
  reviewsCount: number;
  stock: number;
  deliveryToday: boolean;
  isBestSeller: boolean;
  hasFreeShipping?: boolean;
  tags: string[];
  upsellIds?: string[];
  benefits?: string[]; // Novos diferenciais destacados em grid
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserActivity {
  id: string;
  type: 'auth' | 'cart' | 'wishlist' | 'order';
  action: string;
  timestamp: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  timestamp: string;
  address: string;
  paymentMethod: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  whatsapp: string;
  points: number;
  lifetimePoints: number;
  tier: 'Bronze' | 'Prata' | 'Ouro';
  address?: string;
  isAdmin?: boolean;
  persistedCart: CartItem[];
  persistedWishlist: string[];
  activityLog: UserActivity[];
  lastCartUpdate?: string; // Timestamp da última alteração no carrinho
}

export interface OrderLead {
  name: string;
  whatsapp: string;
  productId: string;
}

export type DeliveryMethod = 'standard' | 'scheduled';

export interface CheckoutData {
  name: string;
  whatsapp: string;
  address: string;
  deliveryMethod: DeliveryMethod;
  deliveryTime?: string;
  paymentMethod: 'pix' | 'card' | 'cash' | 'mercadopago';
  pointsToRedeem?: number;
  couponCode?: string;
}
