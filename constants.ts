
import { Product } from './types';

export const COLORS = {
  primary: '#EF4444', // Red-500
  secondary: '#1E3A8A', // Blue-900
  accent: '#F59E0B', // Amber-500
};

// ADICIONE SEU NÚMERO AQUI (DDD + NÚMERO, apenas dígitos)
export const STORE_PHONE = '5545999999999'; 

export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  text: string;
  district: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Eduardo S.",
    avatar: "https://i.pravatar.cc/150?img=11",
    text: "A agilidade é surreal. Comprei o fone e em menos de 2 horas o entregador estava na minha porta no Bairro Neva. O TudoAki mudou o jogo!",
    district: "Neva",
    rating: 5
  },
  {
    id: 2,
    name: "Mariana L.",
    avatar: "https://i.pravatar.cc/150?img=32",
    text: "Estava precisando de um climatizador urgente para o escritório no Centro. Chegou geladinho e funcionando perfeito. Recomendo muito!",
    district: "Centro",
    rating: 5
  },
  {
    id: 3,
    name: "Ricardo M.",
    avatar: "https://i.pravatar.cc/150?img=12",
    text: "O GameStick é sensacional, meus filhos adoraram. O suporte pelo WhatsApp foi super atencioso antes da compra.",
    district: "Tropical",
    rating: 5
  },
  {
    id: 4,
    name: "Ana Paula K.",
    avatar: "https://i.pravatar.cc/150?img=44",
    text: "Melhor preço de Cascavel e a entrega é realmente expressa. Comprei de manhã e usei na hora do almoço. Virei cliente fiel!",
    district: "Cancelli",
    rating: 5
  },
  {
    id: 5,
    name: "Bruno F.",
    avatar: "https://i.pravatar.cc/150?img=15",
    text: "O sistema de pontos AkiPrivilégio realmente funciona. Já ganhei desconto na minha segunda compra. Muito profissional.",
    district: "Coqueiral",
    rating: 5
  },
  {
    id: 6,
    name: "Carla J.",
    avatar: "https://i.pravatar.cc/150?img=21",
    text: "Comprei o fone Lenovo e a qualidade é incrível pelo preço. Entrega discreta e rápida aqui no Parque Verde.",
    district: "Parque Verde",
    rating: 4
  },
  {
    id: 7,
    name: "João Pedro G.",
    avatar: "https://i.pravatar.cc/150?img=33",
    text: "O checkout é muito simples. Fiz o PIX e em 5 minutos meu pedido já estava sendo preparado. Nota 10.",
    district: "Santa Cruz",
    rating: 5
  },
  {
    id: 8,
    name: "Beatriz V.",
    avatar: "https://i.pravatar.cc/150?img=49",
    text: "Excelente atendimento. Tive uma dúvida sobre o GameStick e me responderam na hora. O produto chegou muito bem embalado.",
    district: "FAG",
    rating: 5
  },
  {
    id: 9,
    name: "Marcos T.",
    avatar: "https://i.pravatar.cc/150?img=18",
    text: "Cascavel precisava de um marketplace assim. Chega de esperar 15 dias pelo correio. Com o TudoAki é na hora!",
    district: "Universitário",
    rating: 5
  },
  {
    id: 10,
    name: "Fernanda O.",
    avatar: "https://i.pravatar.cc/150?img=26",
    text: "O mini ventilador me salvou nesse calor! Pequeno, mas gela muito bem. Entrega pontual conforme o combinado.",
    district: "Pacaembu",
    rating: 5
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'test-checkout-01',
    name: 'Produto de Teste - Validação',
    description: 'Este produto é destinado a testes de funcionalidade da plataforma. Ao adquiri-lo, você ajuda a validar o fluxo de pagamento e entrega.\n\nO valor é simbólico (R$ 2,00) e o frete será ajustado automaticamente para R$ 0,01 no checkout.',
    price: 2.00,
    originalPrice: 5.00,
    image: 'https://placehold.co/600x600/EF4444/FFFFFF/png?text=TESTE+R$2',
    images: ['https://placehold.co/600x600/EF4444/FFFFFF/png?text=TESTE+R$2'],
    category: 'Testes',
    rating: 5.0,
    reviewsCount: 999,
    stock: 1000,
    deliveryToday: true,
    isBestSeller: false,
    hasFreeShipping: false,
    tags: ['Teste', 'Dev'],
    upsellIds: [],
    benefits: [
      "Validação de PIX",
      "Validação de Cartão",
      "Teste de Cobrança de Frete",
      "Teste de Status"
    ]
  },
  {
    id: '11',
    name: 'Fone Bluetooth Lenovo Profissional',
    description: '🔊 Som potente e estéreo com graves reforçados\n🎮 Modo gamer com baixa latência para jogos\n🎵 Modo música com qualidade HD\n🎙️ Microfone embutido para chamadas nítidas\n📱 Bluetooth 5.3 – conexão rápida e estável\n⚡ Toque sensível – controles por toque\n🔋 Autonomia: até 4h por carga / 20h com o estojo\n💡 Display digital mostra o nível da bateria\n💼 Case compacta e moderna',
    price: 129.90,
    originalPrice: 199.00,
    image: 'https://iili.io/fPoVzhX.png',
    images: [
      'https://iili.io/fPoVzhX.png',
      'https://iili.io/fPoX2Uv.md.png',
      'https://iili.io/fPoXVdx.md.png'
    ],
    category: 'Acessórios',
    rating: 4.9,
    reviewsCount: 32,
    stock: 25,
    deliveryToday: true,
    isBestSeller: true,
    hasFreeShipping: false,
    tags: ['Lançamento', 'Gamer', 'Lenovo'],
    upsellIds: [],
    benefits: [
      "Som Potente & Graves Reforçados",
      "Baixa Latência para Games",
      "Qualidade de Áudio HD",
      "Microfone de Alta Definição",
      "Bluetooth 5.3 Ultra Estável",
      "Até 20h de Bateria Total"
    ]
  },
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
    upsellIds: [],
    benefits: [
      "20 Mil Jogos Prontos para Jogar",
      "2 Controles Sem Fio 2.4G",
      "Conexão HDMI Plug & Play",
      "Compatível com 4K TV",
      "Salva Progresso dos Jogos",
      "Sistema Multi-Plataforma"
    ]
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
    hasFreeShipping: false,
    tags: ['Calor', 'Promoção', 'Top 1'],
    upsellIds: [],
    benefits: [
      "Baixo Consumo de Energia USB",
      "3 Níveis de Velocidade",
      "Tecnologia de Resfriamento",
      "Reservatório de Fácil Recarga",
      "Operação Silenciosa",
      "Alça de Transporte Premium"
    ]
  }
];

export const CATEGORIES = ['Todos', 'Eletrônicos', 'Acessórios', 'Casa', 'Testes'];
