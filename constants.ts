
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
    id: 'pressure-washer-01',
    name: 'Lavadora de Alta Pressão Portátil Sem Fio 48V Turbo',
    description: '🧼 **Lavadora de Alta Pressão Portátil Sem Fio 48V – Potente e Prática**\n\nCansado de lavar carro ou moto com balde e mangueira?\nA lavadora portátil de alta pressão sem fio 48V é a solução ideal para uma limpeza rápida, eficiente e sem esforço, em qualquer lugar.\n\n🚀 **Alta Potência & Jato Forte**\n\n**Motor de alto desempenho 48V**\nJato de água forte para remover sujeira pesada\nIdeal para carro, moto, bicicleta, quintal, paredes e pisos\n\n🔋 **Sem Fio & Super Portátil**\n\nFunciona com bateria recarregável\nLeve, compacta e fácil de transportar\nUse onde quiser, sem precisar de tomada\n\n🔄 **Múltiplos Acessórios Inclusos**\n\nBicos ajustáveis para diferentes tipos de jato\nMangueira com filtro (pode puxar água de balde, galão ou tanque)\nGarrafa para sabão / espuma\nIdeal para lavagem e manutenção do dia a dia\n\n🧠 **Fácil de Usar**\n\nConecte a mangueira na fonte de água\nEncaixe a bateria\nAperte o gatilho e comece a limpeza\nSem instalação complicada!\n\n📦 **Conteúdo da Embalagem**\n\n✔ 1x Lavadora de alta pressão portátil\n✔ 2x Baterias recarregáveis\n✔ 1x Mangueira com filtro\n✔ 1x Garrafa para sabão\n✔ Bicos e conectores\n✔ Maleta para transporte\n\n✅ **Vantagens**\n\n✔ Alta pressão\n✔ Sem fio\n✔ Economia de água\n✔ Fácil de transportar\n✔ Uso doméstico e automotivo\n\n📌 Produto novo, bem embalado e enviado com segurança',
    price: 195.99,
    originalPrice: 299.90,
    image: 'https://iili.io/fbqBBwX.png',
    images: [
      'https://iili.io/fbqBBwX.png',
      'https://iili.io/fbqxf0G.md.png',
      'https://iili.io/fbqx4rG.md.png',
      'https://iili.io/fbqufQS.png'
    ],
    category: 'Casa',
    rating: 4.8,
    reviewsCount: 34,
    stock: 18,
    deliveryToday: true,
    isBestSeller: true,
    hasFreeShipping: true,
    tags: ['Lavadora', 'Carro', 'Limpeza', 'Sem Fio'],
    upsellIds: [],
    benefits: [
      "Motor Potente 48V",
      "Totalmente Sem Fio",
      "2 Baterias Inclusas",
      "Maleta de Transporte",
      "Puxa Água de Balde",
      "Bico Ajustável"
    ],
    reviews: [
      {
        id: 'rev-wash-01',
        userName: 'Fernando Silva',
        userAvatar: 'https://i.pravatar.cc/150?img=68',
        rating: 5,
        date: '2024-03-12T10:00:00Z',
        text: 'Muito prática! Lavei o carro e a moto com uma carga. A pressão é surpreendente para uma máquina a bateria. Recomendo!',
        media: [
          { type: 'video', url: 'https://down-tx-br.vod.susercontent.com/api/v4/11110103/mms/br-11110103-6v65c-mk82j2zx2rcz82.16000051770031618.mp4' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81ztc-mk82i1uw4d8gb7.webp' }
        ]
      },
      {
        id: 'rev-wash-02',
        userName: 'André Gomes',
        userAvatar: 'https://i.pravatar.cc/150?img=14',
        rating: 5,
        date: '2024-03-10T15:30:00Z',
        text: 'Excelente produto. Chegou rápido e completo com a maleta. Ajuda muito na limpeza do quintal onde não tenho torneira perto.',
        media: [
          { type: 'video', url: 'https://down-tx-br.vod.susercontent.com/api/v4/11110103/mms/br-11110103-6v65e-mk64ski6oiyq00.16000051769914355.mp4' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81ztc-mk64rqnfpy4i85.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81ztc-mk64rqnp8oow63.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81ztc-mk64rqnd9gcj1b.webp' }
        ]
      },
      {
        id: 'rev-wash-03',
        userName: 'Thiago Oliveira',
        userAvatar: 'https://i.pravatar.cc/150?img=3',
        rating: 5,
        date: '2024-03-08T09:15:00Z',
        text: 'Top demais! Consigo lavar o carro no estacionamento do prédio usando um balde. A bateria dura bem.',
        media: [
          { type: 'video', url: 'https://down-tx-br.vod.susercontent.com/api/v4/11110103/mms/br-11110103-6v65g-mka1mtupf477b3.16000051770151178.mp4' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81ztc-mka1m1d7auirde.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81ztc-mka1m1diayo0af.webp' }
        ]
      }
    ]
  },
  {
    id: 'speaker-rgb-01',
    name: 'Caixa de Som Bluetooth Portátil LED RGB 30W TWS',
    description: '🔊 **Eleve Suas Experiências Auditivas!**\n\nCom alto-falantes exclusivos e um contorno LED RGB, esta Caixa de Som Multimídia 30W proporciona uma estética marcante e uma qualidade sonora excepcional. Escolha a Xtrad e experimente um áudio de alta qualidade em conjunto com um design inovador.\n\n**CARACTERÍSTICAS PRINCIPAIS:**\n\n**Conexões Versáteis:**\nConecte-se facilmente via Bluetooth (alcance de até 10 metros sem barreiras), aproveite o Rádio FM, utilize um Pendrive USB ou desfrute da funcionalidade TWS (Conecte duas caixas simultaneamente).\n\n**Potência e Qualidade Sonora:**\nAproveite de uma potência de 30W com uma ampla resposta de frequência, indo de 100 a 18.000Hz. Graves potentes e agudos nítidos.\n\n**Bateria Interna Eficiente:**\nEquipada com uma bateria de 1.500mAh, a caixa garante uma recarga rápida de aproximadamente 3 horas e autonomia de até 4 horas, variando conforme o volume e a iluminação utilizados.\n\n**Design Inovador & Iluminação RGB:**\nO contorno LED RGB proporciona um visual envolvente, com a possibilidade de personalizar as cores. A iluminação pode ser desativada para preservar a bateria.\n\n**CONTEÚDO DA EMBALAGEM:**\n\n✅ 01 Caixa de Som Bluetooth\n✅ 01 Cabo USB Para recarga\n✅ 01 Manual de Instruções',
    price: 199.99,
    originalPrice: 289.90,
    image: 'https://iili.io/fbfsXlR.png',
    images: [
      'https://iili.io/fbfsXlR.png',
      'https://iili.io/fbfQOnn.md.png',
      'https://iili.io/fbfZSig.png',
      'https://iili.io/fbfbGVt.md.png'
    ],
    category: 'Eletrônicos',
    rating: 4.9,
    reviewsCount: 68,
    stock: 20,
    deliveryToday: true,
    isBestSeller: true,
    hasFreeShipping: true,
    tags: ['Som', 'Bluetooth', 'RGB', 'Festa'],
    upsellIds: [],
    benefits: [
      "Potência 30W RMS",
      "Luzes LED RGB",
      "Conexão TWS Dupla",
      "Bateria Longa Duração",
      "Bluetooth 5.0",
      "Entrada USB e FM"
    ],
    reviews: [
      {
        id: 'rev-spk-01',
        userName: 'Marcos Vinícius',
        userAvatar: 'https://i.pravatar.cc/150?img=59',
        rating: 5,
        date: '2024-03-10T18:20:00Z',
        text: 'O som é muito alto e limpo! As luzes dão um show a parte. O vídeo mostra ela ligada, top demais.',
        media: [
          { type: 'video', url: 'https://down-tx-br.vod.susercontent.com/api/v4/11110103/mms/br-11110103-6kfkp-m02bz9zls7l5af.16000051726099522.mp4' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-m02bwraejucpe1.webp' }
        ]
      },
      {
        id: 'rev-spk-02',
        userName: 'Larissa Souza',
        userAvatar: 'https://i.pravatar.cc/150?img=9',
        rating: 5,
        date: '2024-03-08T14:15:00Z',
        text: 'Comprei pra levar pro sítio e não me arrependi. A bateria durou a tarde toda. Recomendo!',
        media: [
          { type: 'video', url: 'https://down-tx-br.vod.susercontent.com/api/v4/11110103/mms/br-11110103-6kfkq-lyzky762l21hf2.16000051723753939.mp4' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-lyzkxhkm1i1hcf.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-lyzkxhlg09idb3.webp' }
        ]
      },
      {
        id: 'rev-spk-03',
        userName: 'Rafael Torres',
        userAvatar: 'https://i.pravatar.cc/150?img=12',
        rating: 5,
        date: '2024-03-05T09:30:00Z',
        text: 'Chegou rápido em Cascavel. O acabamento é de primeira e o pareamento é instantâneo.',
        media: [
          { type: 'video', url: 'https://down-zl-br.vod.susercontent.com/api/v4/11110103/mms/br-11110103-6kfkp-lz6huklhfn0hcb.16000051724172266.mp4' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-lz6hste9x4t16e.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-lz6hstea45n94b.webp' }
        ]
      }
    ]
  },
  {
    id: 'vacuum-01',
    name: 'Mini Aspirador de Pó Portátil Sem Fio 3 em 1',
    description: 'Limpeza prática e potente onde você precisar! 🌪️\n\nEste **Mini Aspirador 3 em 1** é a solução definitiva para manter seu carro, escritório e cantos da casa sempre impecáveis. Compacto, sem fio e com alta potência de sucção.\n\n**ESPECIFICAÇÕES TÉCNICAS:**\n\n**Tensão de entrada:** DC 5V 1-2A\n**Cores:** Preto, Branco e Verde (Enviado conforme disponibilidade)\n**Material:** Plástico ABS de Alta Resistência\n**Potência de saída:** 120W\n**Sucção de vácuo:** 6000Pa (Super Potente)\n**Tamanho:** 16,5x14,5x4cm\n**Capacidade da bateria:** 2000mAh\n**Tempo de trabalho:** Cerca de 30 minutos contínuos\n**Tempo de carregamento:** Cerca de 2-3 horas\n**Capacidade de poeira:** 0,5L\n\n**CONTEÚDO DA EMBALAGEM:**\n\n✅ 1 Aspirador de pó recarregável\n✅ 1 Cabo de carregamento USB\n✅ Bicos Intercambiáveis\n✅ Manual de Instruções\n\n**Voltagem:** Bivolt (Carregue em qualquer lugar)',
    price: 57.99,
    originalPrice: 89.90,
    image: 'https://iili.io/fbfcnTJ.md.png',
    images: [
      'https://iili.io/fbfcnTJ.md.png',
      'https://iili.io/fbfGGdN.md.png',
      'https://iili.io/fbfW9qJ.png',
      'https://iili.io/fbfjaLX.png'
    ],
    category: 'Casa',
    rating: 4.8,
    reviewsCount: 42,
    stock: 30,
    deliveryToday: true,
    isBestSeller: true,
    hasFreeShipping: false,
    tags: ['Limpeza', 'Portátil', 'Carro', 'Casa'],
    upsellIds: [],
    benefits: [
      "Sucção Potente 6000Pa",
      "Sem Fio & Recarregável",
      "Bateria de 2000mAh",
      "Design Compacto",
      "30 Min de Autonomia",
      "Filtro Lavável"
    ],
    reviews: [
      {
        id: 'rev-vac-01',
        userName: 'Roberto Almeida',
        userAvatar: 'https://i.pravatar.cc/150?img=60',
        rating: 5,
        date: '2024-03-05T10:00:00Z',
        text: 'Surpreendeu! Comprei pra limpar o teclado e o carro, e puxa muito bem a sujeira dos cantinhos. O vídeo mostra ele funcionando, vale cada centavo.',
        media: [
          { type: 'video', url: 'https://down-tx-br.vod.susercontent.com/api/v4/11110103/mms/br-11110103-6v65e-mhnk6myq00eb7f.16000051764431791.mp4' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81z1k-mhnk1a4b0xdv70.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81z1k-mhnk1a4b2bybdf.webp' }
        ]
      },
      {
        id: 'rev-vac-02',
        userName: 'Cláudia Santos',
        userAvatar: 'https://i.pravatar.cc/150?img=41',
        rating: 5,
        date: '2024-03-02T15:30:00Z',
        text: 'Chegou super rápido aqui no Floresta. Muito prático não ter fio, levo pra todo lugar. Aspira bem os pelos do gato no sofá.',
        media: [
          { type: 'video', url: 'https://down-tx-br.vod.susercontent.com/api/v4/11110103/mms/br-11110103-6v65c-mjskjkfaxvk10a.16000051769093364.mp4' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81ztc-mjskgohl7lz7da.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81ztc-mjskgohl90jn05.webp' }
        ]
      },
      {
        id: 'rev-vac-03',
        userName: 'Felipe Costa',
        userAvatar: 'https://i.pravatar.cc/150?img=11',
        rating: 4,
        date: '2024-02-28T09:15:00Z',
        text: 'Pequeno mas invocado. A bateria dura o tempo que promete, deu pra limpar o carro todo. Recomendo!',
        media: [
          { type: 'video', url: 'https://down-tx-br.vod.susercontent.com/api/v4/11110103/mms/br-11110103-6v65e-mjlhc5a00f0jc1.16000051768664224.mp4' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81ztc-mjlhbzcmn94x33.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81ztc-mjlhbzcqcp3aa6.webp' }
        ]
      }
    ]
  },
  {
    id: 'massager-01',
    name: 'Massageador Elétrico Alta Frequência Profissional Para Dores Musculares',
    description: '💆‍♂️ **Alívio Imediato para Dores e Tensões!**\n\nEste massageador profissional de alta frequência é a solução perfeita para relaxar os músculos após um dia cansativo de trabalho ou treino intenso.\n\n✨ **Tecnologia de Percussão:** Penetra profundamente no tecido muscular para aliviar a rigidez.\n🔋 **Bateria de Longa Duração:** Use por horas sem precisar recarregar.\n🎯 **4 Cabeças Intercambiáveis:** Para diferentes grupos musculares (coluna, articulações, grandes músculos).\n🎚️ **6 Velocidades:** Ajuste a intensidade conforme sua necessidade.\n\nIdeal para atletas, fisioterapia ou relaxamento diário. Produto robusto, silencioso e ergonômico.',
    price: 64.99,
    originalPrice: 129.90,
    image: 'https://iili.io/fbKPw6Q.png',
    images: [
      'https://iili.io/fbKPw6Q.png',
      'https://iili.io/fbKiSg2.md.png',
      'https://iili.io/fbKsQTX.png',
      'https://iili.io/fbKLPPj.md.png'
    ],
    category: 'Saúde',
    rating: 5.0,
    reviewsCount: 12,
    stock: 45,
    deliveryToday: true,
    isBestSeller: true,
    hasFreeShipping: false,
    tags: ['Saúde', 'Relaxamento', 'Dores'],
    upsellIds: [],
    benefits: [
      "Alívio Imediato da Dor",
      "4 Ponteiras Inclusas",
      "Bateria Recarregável",
      "Motor Silencioso",
      "Portátil e Leve",
      "Alta Potência"
    ],
    reviews: [
      {
        id: 'rev-01',
        userName: 'Juliana Mendes',
        userAvatar: 'https://i.pravatar.cc/150?img=5',
        rating: 5,
        date: '2024-02-28T14:30:00Z',
        text: 'Gente, eu tô chocada com a potência desse aparelhinho! 😍 Comprei achando que seria fraco pelo preço, mas ele solta toda a musculatura. O vídeo mostra ele funcionando, é super silencioso. Chegou no mesmo dia aqui no Centro!',
        media: [
          { type: 'video', url: 'https://down-zl-br.vod.susercontent.com/api/v4/11110103/mms/br-11110103-6v5do-mfntvc5a1fr8a4.16000051760089418.mp4' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81z1k-mfnttvsh1on437.webp' }
        ]
      },
      {
        id: 'rev-02',
        userName: 'Carlos Eduardo',
        userAvatar: 'https://i.pravatar.cc/150?img=13',
        rating: 5,
        date: '2024-02-27T09:15:00Z',
        text: 'Produto excelente. As ponteiras são fáceis de trocar e a bateria dura bastante. Uso depois do treino de CrossFit e ajuda muito na recuperação. As fotos mostram como ele vem bem embalado.',
        media: [
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81z1k-mfnttvsczll3e4.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81z1k-mfnttvsd105j84.webp' }
        ]
      }
    ]
  },
  {
    id: '11',
    name: 'Fone Bluetooth Lenovo Profissional',
    description: '🔊 **Som potente e estéreo com graves reforçados**\n🎮 **Modo gamer com baixa latência para jogos**\n🎵 **Modo música com qualidade HD**\n🎙️ **Microfone embutido para chamadas nítidas**\n📱 **Bluetooth 5.3 – conexão rápida e estável**\n⚡ **Toque sensível – controles por toque**\n🔋 **Autonomia: até 4h por carga / 20h com o estojo**\n💡 **Display digital mostra o nível da bateria**\n💼 **Case compacta e moderna**',
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
    description: '🕹️ **GameStick Pro com 20 mil jogos clássicos e modernos já instalados.**\n🎮 **Acompanha 2 controles estilo PS5, confortáveis e precisos.**\n📺 **Conecta direto na TV via HDMI — plugou, jogou!**\n⚡ **Sistema rápido, menus organizados e fácil de usar.**\n💾 **Vem com várias plataformas retrô completas.**\n📦 **Produto novo, completo e pronto pra entrega!**',
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
    description: '❄️ **Perfeito para o calor! Refresca e umidifica o ar com eficiência.**\n🏠 **Ideal para ambientes pequenos, como quarto, escritório ou mesa de trabalho.**\n🔌 **Alimentação via USB – use no notebook, PC ou carregador comum.**\n💪 **Compacto, leve e fácil de levar pra qualquer lugar.**\n📦 **Produto novo e pronto pra entrega em Cascavel!**',
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

export const CATEGORIES = ['Todos', 'Eletrônicos', 'Acessórios', 'Casa', 'Saúde', 'Testes'];
