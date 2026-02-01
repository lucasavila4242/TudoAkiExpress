
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[]; 
  category: string;
  rating: number;
  reviewsCount: number;
  stock: number;
  deliveryToday: boolean;
  isBestSeller: boolean;
  hasFreeShipping?: boolean;
  tags: string[];
  upsellIds?: string[];
  benefits?: string[];
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

export interface DeliveryProof {
  photo: string; // Base64 da imagem
  recipientName: string;
  timestamp: string;
  location?: { lat: number, lng: number };
}

export interface CourierLocation {
  orderId: string;
  lat: number;
  lng: number;
  timestamp: number;
  heading?: number; // Direção da moto
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  timestamp: string;
  address: string;
  paymentMethod: string;
  shippedAt?: string; // Novo campo: Hora que o motoboy saiu
  deliveryProof?: DeliveryProof; 
  courierId?: string; 
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
  isCourier?: boolean; // Novo campo
  persistedCart: CartItem[];
  persistedWishlist: string[];
  activityLog: UserActivity[];
  lastCartUpdate?: string; 
  createdAt?: string; 
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
