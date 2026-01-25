
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewsCount: number;
  stock: number;
  deliveryToday: boolean;
  isBestSeller: boolean;
  hasFreeShipping?: boolean; // Novo campo
  tags: string[];
  upsellIds?: string[];
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
  // Banco de dados relacional simulado
  persistedCart: CartItem[];
  persistedWishlist: string[];
  activityLog: UserActivity[];
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
  paymentMethod: 'pix' | 'card' | 'cash';
  pointsToRedeem?: number;
}
