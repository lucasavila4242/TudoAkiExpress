
import { Product } from './types';

export const COLORS = {
  primary: '#EF4444', // Red-500
  secondary: '#1E3A8A', // Blue-900
  accent: '#F59E0B', // Amber-500
};

export const PRODUCTS: Product[] = [
  {
    id: '10',
    name: 'GameStick Pro – 2 Controles PS5',
    description: '🕹️ GameStick Pro com 20 mil jogos clássicos e modernos já instalados.\n🎮 Acompanha 2 controles estilo PS5, confortáveis e precisos.\n📺 Conecta direto na TV via HDMI — plugou, jogou!\n⚡ Sistema rápido, menus organizados e fácil de usar.\n💾 Vem com várias plataformas retrô completas.\n📦 Produto novo, completo e pronto pra entrega!',
    price: 229.90,
    originalPrice: 349.00,
    image: 'https://scontent.fcac2-1.fna.fbcdn.net/v/t45.5328-4/598761391_1218387783547216_1523606242616906998_n.jpg?stp=dst-jpg_p720x720_tt6&_nc_cat=109&ccb=1-7&_nc_sid=247b10&_nc_eui2=AeFfwJ4Zix5YXC9Xfuz6d-qb2v59dhNmjoHa_n12E2aOgQjTCTTh8bH802WJqoDvaHFUifqQgl2w8enEy1qdla8o&_nc_ohc=u_Mlqg9YuXIQ7kNvwEaat6n&_nc_oc=AdmIiBvuto8dNKvqfGRBtz3izfjOFD85eQfI_qnXNvJ-jc6oLb4xkHolBVBvyWRTuADRZB3YfuyKfNsqVp2zO7ar&_nc_zt=23&_nc_ht=scontent.fcac2-1.fna&_nc_gid=uuDYx03dOGbIoLDwPHTtbw&oh=00_AfqOLw8ByMZ3cxKbFQNsKLqhBbjSVuWpTFrt1tlwqeFcog&oe=697C6BF2',
    images: [
      'https://scontent.fcac2-1.fna.fbcdn.net/v/t45.5328-4/598761391_1218387783547216_1523606242616906998_n.jpg?stp=dst-jpg_p720x720_tt6&_nc_cat=109&ccb=1-7&_nc_sid=247b10&_nc_eui2=AeFfwJ4Zix5YXC9Xfuz6d-qb2v59dhNmjoHa_n12E2aOgQjTCTTh8bH802WJqoDvaHFUifqQgl2w8enEy1qdla8o&_nc_ohc=u_Mlqg9YuXIQ7kNvwEaat6n&_nc_oc=AdmIiBvuto8dNKvqfGRBtz3izfjOFD85eQfI_qnXNvJ-jc6oLb4xkHolBVBvyWRTuADRZB3YfuyKfNsqVp2zO7ar&_nc_zt=23&_nc_ht=scontent.fcac2-1.fna&_nc_gid=uuDYx03dOGbIoLDwPHTtbw&oh=00_AfqOLw8ByMZ3cxKbFQNsKLqhBbjSVuWpTFrt1tlwqeFcog&oe=697C6BF2',
      'https://scontent.fcac2-1.fna.fbcdn.net/v/t45.5328-4/598761822_1577145207064306_8840325120981049009_n.jpg?stp=dst-jpg_p720x720_tt6&_nc_cat=108&ccb=1-7&_nc_sid=247b10&_nc_eui2=AeE9QAm2xZSImQxBbvx-QurqpJkJFhT7vo6kmQkWFPu-jkGe504M1Lf2Fhk0Tna1xV-jrXofhz4zLmAPRf-8MSjm&_nc_ohc=HZoAxQwm-f0Q7kNvwHLZ4nP&_nc_oc=Adl-SeeRisQpUtqAGOfDKuBZsXtTRbzTqspLRzx-2RyRIR-lQi7hdDl--5H6gkba93tExOyZ7j8pOu25-GgTPAxA&_nc_zt=23&_nc_ht=scontent.fcac2-1.fna&_nc_gid=uuDYx03dOGbIoLDwPHTtbw&oh=00_AfqYx43yZih1NuyiVNozYI6Oa86gx81RpT3hzsDImp_xYw&oe=697C74C4',
      'https://scontent.fcac2-1.fna.fbcdn.net/v/t45.5328-4/598761391_1218387783547216_1523606242616906998_n.jpg?stp=dst-jpg_p720x720_tt6&_nc_cat=109&ccb=1-7&_nc_sid=247b10&_nc_eui2=AeFfwJ4Zix5YXC9Xfuz6d-qb2v59dhNmjoHa_n12E2aOgQjTCTTh8bH802WJqoDvaHFUifqQgl2w8enEy1qdla8o&_nc_ohc=u_Mlqg9YuXIQ7kNvwEaat6n&_nc_oc=AdmIiBvuto8dNKvqfGRBtz3izfjOFD85eQfI_qnXNvJ-jc6oLb4xkHolBVBvyWRTuADRZB3YfuyKfNsqVp2zO7ar&_nc_zt=23&_nc_ht=scontent.fcac2-1.fna&_nc_gid=uuDYx03dOGbIoLDwPHTtbw&oh=00_AfqOLw8ByMZ3cxKbFQNsKLqhBbjSVuWpTFrt1tlwqeFcog&oe=697C6BF2',
      'https://scontent.fcac2-1.fna.fbcdn.net/v/t45.5328-4/598987285_840551758584907_164669346894585785_n.jpg?stp=dst-jpg_p720x720_tt6&_nc_cat=104&ccb=1-7&_nc_sid=247b10&_nc_eui2=AeG95HJ7YUIYJNK1ikNKz4-5mMIMSR6DduqYwgxJHoN26sABggzdktnDRj0oixy-SOJG_tnh40EWpfxIJaDKQ_HO&_nc_ohc=hZl8I-CDQ5AQ7kNvwEcwwxa&_nc_oc=AdlJZu2Z6HDoS5u91TRy20lI7lRrHxfbpQLOTtwFejQH-N8121Tlv7OP6r9DbldsivSBDpWDj1R-yW0Y5B3s6ok2&_nc_zt=23&_nc_ht=scontent.fcac2-1.fna&_nc_gid=uuDYx03dOGbIoLDwPHTtbw&oh=00_AfpEdUEmUcyH56xi14tRDb1au9Eu824ZiAOzi53cTn_z6Q&oe=697C730A'
    ],
    category: 'Eletrônicos',
    rating: 4.9,
    reviewsCount: 45,
    stock: 12,
    deliveryToday: true,
    isBestSeller: true,
    hasFreeShipping: true,
    tags: ['Gamer', 'Novo', '20k Jogos'],
    upsellIds: []
  },
  {
    id: '9',
    name: 'Mini Ventilador Climatizador USB Portátil 3 em 1',
    description: '❄️ Perfeito para o calor! Refresca e umidifica o ar com eficiência.\n🏠 Ideal para ambientes pequenos, como quarto, escritório ou mesa de trabalho.\n🔌 Alimentação via USB – use no notebook, PC ou carregador comum.\n💪 Compacto, leve e fácil de levar pra qualquer lugar.\n📦 Produto novo e pronto pra entrega em Cascavel!',
    price: 89.90,
    originalPrice: 159.00,
    image: 'https://scontent.fcac2-1.fna.fbcdn.net/v/t45.5328-4/599019553_726528950498726_5667252121695628970_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=247b10&_nc_eui2=AeGcA57wuOCl0fpFucGna6Dqe4wKMqG6LRp7jAoyobotGlo8x8JARTrvy-1tFxnsAbwW6Hqn4fZ9wkuvFVOZygoB&_nc_ohc=PfFendv2zWMQ7kNvwECTKsI&_nc_oc=AdmWCbRSOBc6_8ECLVZhsFyw2SPYFxiESeLoLR999GPI4w9Dvs3wUENNq-XD7qJQVaSauI33GO94KcRDt-o7mTwJ&_nc_zt=23&_nc_ht=scontent.fcac2-1.fna&_nc_gid=n6OXbjHp5mRi7N_fo3g4dA&oh=00_AfpfA15Bb4zH0fzKIcpnmUelkAcCpB1kpC_74RsMwDQYBw&oe=697C7690',
    images: [
      'https://scontent.fcac2-1.fna.fbcdn.net/v/t45.5328-4/599019553_726528950498726_5667252121695628970_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=247b10&_nc_eui2=AeGcA57wuOCl0fpFucGna6Dqe4wKMqG6LRp7jAoyobotGlo8x8JARTrvy-1tFxnsAbwW6Hqn4fZ9wkuvFVOZygoB&_nc_ohc=PfFendv2zWMQ7kNvwECTKsI&_nc_oc=AdmWCbRSOBc6_8ECLVZhsFyw2SPYFxiESeLoLR999GPI4w9Dvs3wUENNq-XD7qJQVaSauI33GO94KcRDt-o7mTwJ&_nc_zt=23&_nc_ht=scontent.fcac2-1.fna&_nc_gid=n6OXbjHp5mRi7N_fo3g4dA&oh=00_AfpfA15Bb4zH0fzKIcpnmUelkAcCpB1kpC_74RsMwDQYBw&oe=697C7690',
      'https://scontent.fcac2-1.fna.fbcdn.net/v/t45.5328-4/599834157_2040293603401823_2456701597379104847_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=247b10&_nc_eui2=AeFiemefQaqtUO01649y6JiNCYbx5QJ1uiYJhvHlAnW6Jrgcr6X7DEPNu1gd8O3CRTvON5eoQncWaNdgOsVdWI5h&_nc_ohc=oZswlh-Ll4MQ7kNvwHxKDL0&_nc_oc=AdkHgsC-qbAS_G1P0A5Vexf0PPN3lBKbqiR6jOAsskPGDnOZyLfZ_7MISyHI6uUnPcQ3h6qs32qco1FzkGT5fPyE&_nc_zt=23&_nc_ht=scontent.fcac2-1.fna&_nc_gid=n6OXbjHp5mRi7N_fo3g4dA&oh=00_Afqy3qeszNtk_TVqKUYmqOCSeDHf3mZQlJrVgRKvezhJMA&oe=697C6580',
      'https://scontent.fcac2-1.fna.fbcdn.net/v/t45.5328-4/599084249_804044502639014_286085486574810107_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=247b10&_nc_eui2=AeHeGWhtMKmD82VXHpyzICzeg5sYYfiGRmuDmxhh-IZGayAFXLSyxBlBbHhpdXsyHNCwtxWOKu3aTU6VRpxpNsnC&_nc_ohc=kXHUkcd9heYQ7kNvwE6wWPj&_nc_oc=Adn5Q3NJqVvl4V1JlT6_6m0IKrW6UT1177r-yNL31mgxPb50dl-uQDJgRnj9sQX_Pod9ht9qJJFgo0qUfEVdR0_h&_nc_zt=23&_nc_ht=scontent.fcac2-1.fna&_nc_gid=n6OXbjHp5mRi7N_fo3g4dA&oh=00_AfqyuYzUsCDSWdWG0hb4NC4FDDkz4VgCocmW7dz97ff2Wg&oe=697C5856'
    ],
    category: 'Casa',
    rating: 4.9,
    reviewsCount: 28,
    stock: 15,
    deliveryToday: true,
    isBestSeller: true,
    hasFreeShipping: true,
    tags: ['Calor', 'Promoção', 'Top 1'],
    upsellIds: ['u4']
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
    stock: 10,
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
