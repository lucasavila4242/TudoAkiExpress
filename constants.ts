
import { Product } from './types';

export const COLORS = {
  primary: '#EF4444', // Red-500
  secondary: '#1E3A8A', // Blue-900
  accent: '#F59E0B', // Amber-500
};

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Smartwatch Ultra Pro Max 2024',
    description: 'Monitoramento de saúde completo, GPS integrado e bateria de 7 dias. O companheiro ideal para sua rotina em Cascavel.',
    price: 249.90,
    originalPrice: 399.00,
    image: 'https://picsum.photos/seed/watch/600/600',
    category: 'Eletrônicos',
    rating: 4.8,
    reviewsCount: 156,
    stock: 15,
    deliveryToday: true,
    isBestSeller: true,
    tags: ['Promoção', 'Entrega Hoje'],
    upsellIds: ['u1', 'u2']
  },
  {
    id: 'u1',
    name: 'Película de Proteção 3D Nano',
    description: 'Proteção máxima contra riscos e quedas para seu Smartwatch.',
    price: 19.90,
    image: 'https://picsum.photos/seed/film/600/600',
    category: 'Acessórios',
    rating: 4.9,
    reviewsCount: 450,
    stock: 100,
    deliveryToday: true,
    isBestSeller: false,
    tags: ['Essencial']
  },
  {
    id: 'u2',
    name: 'Pulseira Silicone Sport Extra',
    description: 'Várias cores para personalizar seu estilo.',
    price: 35.00,
    image: 'https://picsum.photos/seed/strap/600/600',
    category: 'Acessórios',
    rating: 4.7,
    reviewsCount: 230,
    stock: 45,
    deliveryToday: true,
    isBestSeller: false,
    tags: []
  },
  {
    id: '2',
    name: 'Fone Bluetooth Noise Cancelling',
    description: 'Som imersivo com cancelamento de ruído ativo. Perfeito para quem busca foco e qualidade sonora superior.',
    price: 189.00,
    originalPrice: 250.00,
    image: 'https://picsum.photos/seed/headphones/600/600',
    category: 'Acessórios',
    rating: 4.5,
    reviewsCount: 89,
    stock: 0,
    deliveryToday: false,
    isBestSeller: false,
    tags: ['Novidade'],
    upsellIds: ['u3']
  },
  {
    id: 'u3',
    name: 'Case de Silicone Protetora',
    description: 'Evite danos ao estojo de carga do seu fone.',
    price: 29.90,
    image: 'https://picsum.photos/seed/case/600/600',
    category: 'Acessórios',
    rating: 4.8,
    reviewsCount: 120,
    stock: 60,
    deliveryToday: true,
    isBestSeller: false,
    tags: []
  },
  {
    id: '3',
    name: 'Luminária Inteligente RGB',
    description: 'Controle pelo celular, milhões de cores para transformar seu ambiente em Cascavel. Compatível com Alexa.',
    price: 79.90,
    originalPrice: 120.00,
    image: 'https://picsum.photos/seed/lamp/600/600',
    category: 'Casa',
    rating: 4.7,
    reviewsCount: 42,
    stock: 20,
    deliveryToday: true,
    isBestSeller: true,
    tags: ['Entrega Hoje'],
    upsellIds: ['u4']
  },
  {
    id: 'u4',
    name: 'Lâmpada Reserva Inteligente 9W',
    description: 'Nunca fique no escuro, tenha sempre uma reserva à mão.',
    price: 45.00,
    image: 'https://picsum.photos/seed/bulb/600/600',
    category: 'Acessórios',
    rating: 4.6,
    reviewsCount: 15,
    stock: 10,
    deliveryToday: true,
    isBestSeller: false,
    tags: []
  },
  {
    id: '4',
    name: 'Kit Gamer Teclado + Mouse RGB',
    description: 'Alta precisão e ergonomia para suas partidas. Iluminação personalizável e switches mecânicos.',
    price: 159.00,
    originalPrice: 220.00,
    image: 'https://picsum.photos/seed/gaming/600/600',
    category: 'Informática',
    rating: 4.9,
    reviewsCount: 112,
    stock: 8,
    deliveryToday: true,
    isBestSeller: false,
    tags: ['Mais Vendido'],
    upsellIds: ['u5']
  },
  {
    id: 'u5',
    name: 'Mousepad Gamer Speed XL',
    description: '80x30cm para total liberdade de movimento.',
    price: 49.90,
    image: 'https://picsum.photos/seed/mousepad/600/600',
    category: 'Informática',
    rating: 4.8,
    reviewsCount: 88,
    stock: 15,
    deliveryToday: true,
    isBestSeller: false,
    tags: ['Essencial']
  }
];

export const CATEGORIES = ['Todos', 'Eletrônicos', 'Acessórios', 'Casa', 'Informática'];
