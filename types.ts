
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
  tags: string[];
  upsellIds?: string[];
}

export interface CartItem extends Product {
  quantity: number;
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

export interface UserProfile {
  name: string;
  points: number;
  lifetimePoints: number;
  tier: 'Bronze' | 'Prata' | 'Ouro';
}
