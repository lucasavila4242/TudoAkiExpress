
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
    id: 'charger-20w-apple-01',
    name: 'Fonte Carregador USB-C 20W Apple Original',
    description: '⚡ **Recarga Turbo para seu iPhone!**\n\nO adaptador de energia USB-C de 20W Apple oferece recarga rápida e eficiente. Ideal para usar em casa, no trabalho ou onde você estiver.\n\n📱 **Compatibilidade & Performance:**\nConecte ao iPhone 8 ou posterior para recarga rápida: **50% de bateria em aproximadamente 35 minutos**.\nTambém compatível com iPad Pro e iPad Air para desempenho máximo. Compatível com qualquer aparelho com porta USB-C.\n\n✨ **Destaques do Produto:**\n\n✅ **ORIGINAL APPLE**\n✅ **SELO ANATEL**\n✅ **Potência 20W Real**\n✅ **Produto Novo e Lacrado**\n✅ **Conexão USB-C**\n\n📦 **Conteúdo da Caixa:**\n1x Carregador de Parede USB-C de 20W\n1x Manual do Usuário\n\n⚠️ *Cabo vendido separadamente.*',
    price: 35.90,
    originalPrice: 119.00,
    image: 'https://iili.io/fmIuLs2.png',
    images: [
      'https://iili.io/fmIuLs2.png',
      'https://iili.io/fmI5dKB.png',
      'https://iili.io/fmIGKHQ.png'
    ],
    category: 'Acessórios',
    rating: 4.9,
    reviewsCount: 142,
    stock: 80,
    deliveryToday: true,
    isBestSeller: true,
    hasFreeShipping: false,
    tags: ['Apple', 'Carregador', 'iPhone', 'Turbo', '20W'],
    upsellIds: ['cable-typec-lightning-01'],
    benefits: [
      "Original Apple com Selo Anatel",
      "Carregamento Turbo 20W",
      "50% de bateria em 35 min",
      "Compatível com iPhone e iPad",
      "Compacto e Seguro"
    ],
    reviews: [
      {
        id: 'rev-charger-01',
        userName: 'Lucas Martins',
        userAvatar: 'https://i.pravatar.cc/150?img=59',
        rating: 5,
        date: '2024-03-29T10:00:00Z',
        text: 'Realmente original e carrega muito rápido. O iPhone reconheceu na hora. Vídeo mostra ele lacrado.',
        media: [
          { type: 'video', url: 'https://down-tx-br.vod.susercontent.com/api/v4/11110103/mms/br-11110103-6v65g-miu85qxqx7up51.16000051767014381.mp4' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81ztc-miu84vcw36kic2.webp' },
          { type: 'video', url: 'https://down-tx-br.vod.susercontent.com/api/v4/11110103/mms/br-11110103-6v65g-mjimdtjbkvluf0.16000051768491107.mp4' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81ztc-mjimd83kjc3n94.webp' }
        ]
      },
      {
        id: 'rev-charger-02',
        userName: 'Beatriz Silva',
        userAvatar: 'https://i.pravatar.cc/150?img=49',
        rating: 5,
        date: '2024-03-28T15:30:00Z',
        text: 'Chegou certinho, bem embalado. Funciona perfeitamente no meu iPhone 11.',
        media: [
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81ztc-mjlhp0k5w1dt29.webp' }
        ]
      },
      {
        id: 'rev-charger-03',
        userName: 'Rafael Costa',
        userAvatar: 'https://i.pravatar.cc/150?img=11',
        rating: 5,
        date: '2024-03-25T09:15:00Z',
        text: 'Qualidade top! Esquenta muito pouco e carrega voando. Recomendo.',
        media: [
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81ztc-mk37re1na8e9dc.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81ztc-mjluvthfxw5eb1.webp' }
        ]
      }
    ]
  },
  {
    id: 'cable-typec-lightning-01',
    name: 'Cabo Adaptador Tipo C para Lightning iPhone',
    description: '🔌 **Cabo Carregador Original Para iPhone (APENAS O CABO)**\n\nCabo Tipo C de 1 metro para o seu iPhone, iPad ou iPod com conector Lightning.\n\nO cabo Tipo C conecta o seu dispositivo com conector Lightning à porta Tipo C do seu computador ou carregador de parede. Com ele você sincroniza dados e carrega a bateria com rapidez e segurança.\n\n📱 **Modelos Compatíveis de iPhone:**\n\n*   iPhone 5 / 5S / 5C / SE\n*   iPhone 6 / 6 Plus / 6S / 6S Plus\n*   iPhone 7 / 7 Plus\n*   iPhone 8 / 8 Plus\n*   iPhone X / XS / XS Max / XR\n*   iPhone 11 (todas as séries)\n*   iPhone 12 (todas as séries)\n\n💻 **Compatível também com:**\n*   iPad Air / Mini / Pro\n*   iPod Touch (5ª a 7ª geração)\n\n⚠️ **Nota:** Este item contém apenas o cabo. A fonte (tomada) não está inclusa.',
    price: 38.90,
    originalPrice: 69.90,
    image: 'https://iili.io/fmIKzxe.png',
    images: [
      'https://iili.io/fmIKzxe.png',
      'https://iili.io/fmIK1zF.png',
      'https://iili.io/fmIqDUx.png'
    ],
    category: 'Acessórios',
    rating: 4.8,
    reviewsCount: 112,
    stock: 100,
    deliveryToday: true,
    isBestSeller: true,
    hasFreeShipping: false,
    tags: ['iPhone', 'Cabo', 'Carregador', 'Apple'],
    upsellIds: [],
    benefits: [
      "Conector Lightning Original",
      "Carregamento Rápido",
      "Sincronização de Dados",
      "Alta Durabilidade",
      "Compatível com toda linha Apple"
    ],
    reviews: [
      {
        id: 'rev-cable-01',
        userName: 'Mariana Souza',
        userAvatar: 'https://i.pravatar.cc/150?img=32',
        rating: 5,
        date: '2024-03-28T14:00:00Z',
        text: 'O cabo é excelente, carrega super rápido o meu iPhone 11. Material parece bem resistente, igual ao original.',
        media: [
          { type: 'video', url: 'https://down-cvs-br.vod.susercontent.com/api/v4/11110103/mms/br-11110103-6kfkr-mao6akyiihvd08.16000051749217577.mp4' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-mao3i1f38dfd2e.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-mao3i1f39rzt97.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-mao3i1f3b6k959.webp' }
        ]
      },
      {
        id: 'rev-cable-02',
        userName: 'Paulo Ferreira',
        userAvatar: 'https://i.pravatar.cc/150?img=11',
        rating: 5,
        date: '2024-03-25T10:30:00Z',
        text: 'Chegou bem embalado e funcionando perfeitamente. Ótimo custo benefício, recomendo!',
        media: [
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81z1k-mhkfn2fraltt4f.webp' },
          { type: 'video', url: 'https://down-cvs-br.vod.susercontent.com/api/v4/11110103/mms/br-11110103-6v65f-mhkfofc6ud4ydd.16000051764242421.mp4' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81z1k-mhkfn2fs9q0y51.webp' }
        ]
      }
    ]
  },
  {
    id: 'ps4-controller-01',
    name: 'Controle PS4 Sem Fio Bluetooth',
    description: '🎮 **Controle Sem Fio para PlayStation 4 – Wireless com LED**\n\nEleve sua experiência nos jogos com o Controle Sem Fio compatível com PlayStation 4, desenvolvido para oferecer alta precisão, conforto e total liberdade de movimentos. Ideal para quem busca desempenho gamer com excelente custo-benefício.\n\n✨ **Qualidade Premium - Primeira Linha:**\nEste é um produto paralelo de **Primeira Linha**, fabricado com componentes de alta qualidade. Não possui diferença perceptível do original e garante **Zero Delay** (sem atrasos) nos comandos.\n\n🌟 **Principais Benefícios:**\n\n✅ **Controle sem fio (Wireless) com LED**\n✅ **Alta precisão nos comandos**\n✅ **Vibração realista** para maior imersão (DualShock 4)\n✅ **Touch Pad multi-touch clicável**\n✅ **Sensor de seis eixos** para movimentos mais naturais\n✅ **Design ergonômico e confortável**\n✅ **Bateria recarregável** com uso contínuo durante o carregamento\n\n🔧 **Características Técnicas:**\n\n*   **Tecnologia:** DualShock 4\n*   **Conectividade:** Wireless / USB\n*   **Compatibilidade:** PlayStation 4 / PC / Android / Mobile\n*   **Plug & Play:** Sim\n*   **Dimensões:** 16 cm x 11 cm x 6 cm\n*   **Cabo USB:** 1,80 m incluso\n\n📦 **Itens Inclusos:**\n1x Controle sem fio compatível com PlayStation 4\n1x Cabo USB para carregamento',
    price: 116.99,
    originalPrice: 199.90,
    image: 'https://iili.io/fbmUIzQ.png',
    images: [
      'https://iili.io/fbmUIzQ.png',
      'https://iili.io/fbmg0F9.png',
      'https://iili.io/fbmrCDx.png',
      'https://iili.io/fbmrXJn.png'
    ],
    category: 'Acessórios',
    rating: 4.9,
    reviewsCount: 128,
    stock: 45,
    deliveryToday: true,
    isBestSeller: true,
    hasFreeShipping: true,
    tags: ['PS4', 'Gamer', 'Sem Fio', 'Bluetooth'],
    upsellIds: [],
    benefits: [
      "Sem Fio / Bluetooth",
      "Bateria Recarregável",
      "Vibração DualShock",
      "Touch Pad Funcional",
      "Zero Delay",
      "Compatível PC/Android"
    ],
    reviews: [
      {
        id: 'rev-ps4-01',
        userName: 'Felipe Santos',
        userAvatar: 'https://i.pravatar.cc/150?img=53',
        rating: 5,
        date: '2024-03-29T14:30:00Z',
        text: 'Qualidade surpreendente! Não tem delay nenhum no Warzone, resposta imediata. A bateria dura bem e o acabamento é idêntico ao original.',
        media: [
          { type: 'video', url: 'https://down-tx-br.vod.susercontent.com/api/v4/11110103/mms/br-11110103-6kfkq-ly7f9wd2tr6ta3.16000051722049242.mp4' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-ly7f9k7im36d7f.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-ly7f9k7im2n90a.webp' }
        ]
      },
      {
        id: 'rev-ps4-02',
        userName: 'Amanda Oliveira',
        userAvatar: 'https://i.pravatar.cc/150?img=41',
        rating: 5,
        date: '2024-03-27T10:15:00Z',
        text: 'Igualzinho ao original, peso, botões, tudo. Conectou de primeira no PS4. Ótimo custo-benefício.',
        media: [
          { type: 'video', url: 'https://down-tx-br.vod.susercontent.com/api/v4/11110103/mms/br-11110103-6kfkr-lwz5o6lpkbzz6b.16000051719369566.mp4' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-lwz5gblrp5fja4.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-lwz5gblrqjzz55.webp' }
        ]
      },
      {
        id: 'rev-ps4-03',
        userName: 'Gustavo Lima',
        userAvatar: 'https://i.pravatar.cc/150?img=12',
        rating: 5,
        date: '2024-03-25T16:45:00Z',
        text: 'Melhor controle paralelo que já comprei. O analógico é firme e preciso. Chegou super rápido aqui em Cascavel.',
        media: [
          { type: 'video', url: 'https://down-cvs-br.vod.susercontent.com/api/v4/11110103/mms/br-11110103-6kfkr-m2godnlix3k67b.16000051731326307.mp4' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-m2goauv2bzgm54.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-m2goauv2hlqe4a.webp' }
        ]
      }
    ]
  },
  {
    id: 'bike-light-solar-01',
    name: 'Lanterna Bike Farol LED Buzina e Carregamento Solar/USB',
    description: '🚴‍♂️ **Energia Inesgotável para Suas Aventuras!**\n\nO **Farol para Bicicleta Solar USB LED Recarregável com Buzina** é a escolha perfeita para quem busca autonomia total e proteção reforçada. Equipado com carregamento solar e USB, ele oferece praticidade incomparável: você pedala e recarrega ao mesmo tempo, sem se preocupar com tomadas.\n\n🌟 **CARACTERÍSTICAS E BENEFÍCIOS:**\n\n✅ **Carregamento Solar Inteligente:** Capta luz solar durante o dia para garantir carga extra à noite.\n✅ **Bateria Híbrida:** Recarregável também via USB em computadores ou carregadores.\n✅ **Iluminação LED de Alta Potência:** Superbrilhante com amplo alcance para máxima segurança.\n✅ **Buzina Potente 120dB:** Alerta motoristas e pedestres com eficiência.\n✅ **5 Modos de Luz:** Forte, Médio, Fraco, Flash Lento e Flash Rápido.\n✅ **Resistente à Água (IPX4):** Pronto para chuvas leves e qualquer clima.\n✅ **Fácil Instalação:** Suporte universal para qualquer guidão, sem ferramentas.\n\n📏 **ESPECIFICAÇÕES TÉCNICAS:**\n\n- Material: Plástico ABS de alta durabilidade\n- Fonte de energia: Solar e USB\n- Bateria: Interna recarregável\n- Tempo de recarga USB: 2 a 3 horas\n- Peso: Aprox. 120g\n- Dimensões: 10cm x 5cm\n\n📦 **ITENS INCLUSOS:**\n1x Lanterna Farol Led e Buzina\n1x Suporte de Fixação\n1x Cabo USB',
    price: 139.90,
    originalPrice: 199.90,
    image: 'https://iili.io/fbmEScP.md.png',
    images: [
      'https://iili.io/fbmEScP.md.png',
      'https://iili.io/fbmWyrl.md.png',
      'https://iili.io/fbmhHMJ.png'
    ],
    category: 'Acessórios',
    rating: 4.9,
    reviewsCount: 42,
    stock: 35,
    deliveryToday: true,
    isBestSeller: true,
    hasFreeShipping: false,
    tags: ['Bike', 'Solar', 'LED', 'Ciclismo'],
    upsellIds: [],
    benefits: [
      "Carregamento Solar Automático",
      "Buzina Integrada 120dB",
      "LED de Alta Intensidade",
      "Bateria Recarregável USB",
      "Resistente à Água IPX4",
      "Instalação Sem Ferramentas"
    ],
    reviews: [
      {
        id: 'rev-bike-01',
        userName: 'Carlos Mendes',
        userAvatar: 'https://i.pravatar.cc/150?img=12',
        rating: 5,
        date: '2024-03-28T10:00:00Z',
        text: 'Achei sensacional a função solar. Deixo a bike no sol enquanto trabalho e volto pra casa com bateria cheia. A buzina é bem alta mesmo!',
        media: [
          { type: 'video', url: 'https://down-zl-br.vod.susercontent.com/api/v4/11110103/mms/br-11110103-6v5dk-mfl1pxnjgvt3f2.16000051759921025.mp4' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81z1k-mfl1ok0ps5jb1b.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81z1k-mfl1ok0ptk3r39.webp' }
        ]
      },
      {
        id: 'rev-bike-02',
        userName: 'Juliana Costa',
        userAvatar: 'https://i.pravatar.cc/150?img=5',
        rating: 5,
        date: '2024-03-25T15:30:00Z',
        text: 'Muito prático e ilumina muito bem. Uso na ciclovia da Avenida Brasil e me sinto muito mais segura.',
        media: [
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-mboncgavxvhjbb.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-mboncgavxw0pc6.webp' }
        ]
      },
      {
        id: 'rev-bike-03',
        userName: 'Roberto Silva',
        userAvatar: 'https://i.pravatar.cc/150?img=60',
        rating: 5,
        date: '2024-03-22T09:15:00Z',
        text: 'Produto robusto, aguenta bem os trancos da trilha. O carregamento USB é rápido também.',
        media: [
          { type: 'video', url: 'https://down-zl-br.vod.susercontent.com/api/v4/11110103/mms/br-11110103-6v5dl-meb1d5923ev5bd.16000051757135988.mp4' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81z1k-meb1g67n0yyp90.webp' }
        ]
      }
    ]
  },
  {
    id: 'smart-tag-ios-01',
    name: 'Smart Air Tag Rastreador Bluetooth IOS',
    description: '📍 **Smart Tag para iPhone – Encontre Seus Itens em Segundos!**\n\nCansado de perder chaves, bolsas, pets ou mochilas por aí? O **Smart Tag Bluetooth** é a solução prática e eficiente que você estava procurando! Com essa pequena ferramenta, você localiza seus objetos essenciais com rapidez e precisão, basta usar o **App Buscar** nativo da Apple – diretamente no seu iPhone.\n\n⚠️ **Atenção à Compatibilidade:**\nEste Smart Tag funciona **exclusivamente com iPhone** (iOS 12 ou superior). Infelizmente, não é compatível com dispositivos Android.\n\n✨ **DESTAQUES DO PRODUTO:**\n\n✅ **Integração Perfeita com iOS:**\nFunciona nativamente com o App Buscar da Apple. Simples, intuitivo e sem custos adicionais.\n\n✅ **Rastreamento Rápido:**\nLocalize seus itens em segundos via Bluetooth, seja em casa ou no escritório.\n\n✅ **Bateria de Longa Duração:**\nAté 1 ano de uso contínuo! O pacote inclui **2 baterias extras** para você não se preocupar.\n\n✅ **Design Compacto:**\nPequeno e leve, fácil de prender em chaves, coleiras de pets, bolsas e mochilas.\n\n🎯 **Aplicações Recomendadas:**\n✔️ Chaves\n✔️ Pets\n✔️ Mochilas & Bolsas\n✔️ Carros & Bicicletas\n✔️ Malas de Viagem\n\n🚫 **Cuidados:**\nEvite contato direto com água (chuva forte/mergulho). Limpe apenas com pano seco.\n\n❓ **Perguntas Frequentes:**\n\n* **Funciona em Android?** Não, apenas iPhone/iPad (iOS 12+).\n* **Preciso pagar mensalidade?** Não! O uso do App Buscar é gratuito.\n* **Tem garantia?** Sim, produto com nota fiscal e garantia contra defeitos.',
    price: 35.99,
    originalPrice: 59.90,
    image: 'https://iili.io/fbmFpl1.png',
    images: [
      'https://iili.io/fbmFpl1.png',
      'https://iili.io/fbmfVvn.png',
      'https://iili.io/fbmqcAu.md.png',
      'https://iili.io/fbmBTba.png'
    ],
    category: 'Acessórios',
    rating: 4.8,
    reviewsCount: 89,
    stock: 50,
    deliveryToday: true,
    isBestSeller: true,
    hasFreeShipping: false,
    tags: ['iPhone', 'Rastreador', 'Apple', 'Segurança'],
    upsellIds: [],
    benefits: [
      "Compatível com App Buscar (Apple)",
      "Bateria dura até 1 ano",
      "Inclui 2 baterias extras",
      "Rastreamento Global (Rede Apple)",
      "Toca som para encontrar",
      "Sem mensalidade"
    ],
    reviews: [
      {
        id: 'rev-tag-01',
        userName: 'Fernanda Lima',
        userAvatar: 'https://i.pravatar.cc/150?img=9',
        rating: 5,
        date: '2024-03-25T14:00:00Z',
        text: 'Funciona perfeitamente no iPhone! Configurei em segundos no app Buscar. Coloquei na chave do carro e já testei, a localização é bem precisa.',
        media: [
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81ztc-mk0xcr660zyab4.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81ztc-mk0xcr65fxfn5d.webp' }
        ]
      },
      {
        id: 'rev-tag-02',
        userName: 'Rodrigo Alves',
        userAvatar: 'https://i.pravatar.cc/150?img=11',
        rating: 5,
        date: '2024-03-22T10:30:00Z',
        text: 'Excelente custo benefício. É muito igual ao original da Apple na funcionalidade. O vídeo mostra como é pequeno. Veio com bateria extra!',
        media: [
          { type: 'video', url: 'https://down-tx-br.vod.susercontent.com/api/v4/11110103/mms/br-11110103-6v65f-mk2k8v60fs3n57.16000051769698201.mp4' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81ztc-mk2k856k8tmpa6.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81ztc-mk2k856kbmrl62.webp' }
        ]
      },
      {
        id: 'rev-tag-03',
        userName: 'Camila Torres',
        userAvatar: 'https://i.pravatar.cc/150?img=5',
        rating: 5,
        date: '2024-03-20T16:45:00Z',
        text: 'Coloquei na coleira do meu cachorro. Dá uma paz de espírito enorme. O material parece resistente e não incomoda o pet.',
        media: [
          { type: 'video', url: 'https://down-tx-br.vod.susercontent.com/api/v4/11110103/mms/br-11110103-6v65g-mjznj94eocn4d5.16000051769522131.mp4' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81ztc-mjznihp3j18j05.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81ztc-mjznihp3kfsz49.webp' }
        ]
      }
    ]
  },
  {
    id: 'holder-hollow-knight-01',
    name: 'Suporte Para Controle Hollow Knight',
    description: '🎮🕹️✨🔥 **Transforme sua área gamer com estilo e proteção!**\n\nApresentamos o **Suporte para Controle Estilo Hollow Knight**, um acessório que une design futurista, funcionalidade e segurança em um só produto!\n\n✨⚔️ **Qualidade Premium:**\nFabricado em plástico PLA de alta qualidade, seu visual é inspirado em armaduras futuristas e figuras heroicas da ficção científica, garantindo um toque exclusivo e sofisticado para sua bancada, estante ou setup gamer.\n\n📏📐 **Dimensões:**\n📌 Largura: 7 cm\n📌 Comprimento: 8 cm\n📌 Altura: 10 cm\n\n✅🎯 **Compatibilidade Total:**\n✔️ PlayStation 5 (DualSense)\n✔️ PlayStation 4 (DualShock 4)\n✔️ Xbox Series X|S e Xbox One\n✔️ Controles de PC (USB/Bluetooth)\n✔️ Outras marcas e modelos padrão\n\n🌟💎 **Destaques do Produto:**\n🛡️ **Design decorativo e colecionável** – ideal para dar personalidade ao seu setup\n🎯 **Evita quedas e arranhões** – mantém seu controle sempre seguro\n⚖️ **Estabilidade total** – base larga e firme para proteção garantida\n🎁 **Presente perfeito** – criativo, útil e que todo gamer vai adorar\n\n📦📦 **Na embalagem você recebe:**\n1x Suporte para Controle Estilo Hollow Knight\n(⚠️ Controle não incluso – imagens ilustrativas)\n\n🔥🚀🎮 **Por que escolher este suporte?**\nPorque ele não é apenas um suporte… é parte do seu setup gamer!\nMantenha seu controle sempre à mão e dê aquele upgrade de estilo que seu espaço merece.',
    price: 45.90,
    originalPrice: 69.90,
    image: 'https://iili.io/fbbbH0v.png',
    images: [
      'https://iili.io/fbbbH0v.png',
      'https://iili.io/fbbyu7R.png',
      'https://iili.io/fbbyPQ1.png',
      'https://iili.io/fbmJPQS.md.png'
    ],
    category: 'Acessórios',
    rating: 4.9,
    reviewsCount: 42,
    stock: 25,
    deliveryToday: true,
    isBestSeller: false,
    hasFreeShipping: false,
    tags: ['Gamer', 'Setup', 'Hollow Knight', 'Suporte'],
    upsellIds: [],
    benefits: [
      "Design Exclusivo",
      "Compatibilidade Universal",
      "Base Estável",
      "Material PLA Resistente",
      "Decoração Gamer"
    ],
    reviews: [
      {
        id: 'rev-hk-01',
        userName: 'Lucas Mendes',
        userAvatar: 'https://i.pravatar.cc/150?img=53',
        rating: 5,
        date: '2024-03-20T14:00:00Z',
        text: 'Ficou perfeito no meu setup! O acabamento é muito bom e segura bem o controle do PS5. O visual do Hollow Knight é incrível.',
        media: [
          { type: 'video', url: 'https://down-tx-br.vod.susercontent.com/api/v4/11110103/mms/br-11110103-6v5dm-mer8bvk9883mf3.16000051758116082.mp4' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81z1k-mer8b1ecj85d8c.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81z1k-mer8b1eg31tsef.webp' }
        ]
      },
      {
        id: 'rev-hk-02',
        userName: 'Beatriz Costa',
        userAvatar: 'https://i.pravatar.cc/150?img=41',
        rating: 5,
        date: '2024-03-18T10:30:00Z',
        text: 'Lindo demais! Chegou rápido e bem embalado. Meu namorado adorou o presente.',
        media: [
          { type: 'video', url: 'https://down-tx-br.vod.susercontent.com/api/v4/11110103/mms/br-11110103-6v5dn-mdvw4ghguznne2.16000051756218990.mp4' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81z1k-mdvw3ebnb2f6cd.webp' }
        ]
      },
      {
        id: 'rev-hk-03',
        userName: 'Gustavo Rocha',
        userAvatar: 'https://i.pravatar.cc/150?img=12',
        rating: 5,
        date: '2024-03-15T16:45:00Z',
        text: 'Muito estável, não tomba fácil. O design é muito fiel ao jogo. Recomendo!',
        media: [
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81z1k-mfmsmiuz4fsw3a.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81z1k-mfmsmiurfpxh2f.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-81z1k-mfmsmiut1b7o61.webp' }
        ]
      }
    ]
  },
  {
    id: 'qkz-ak6-01',
    name: 'Fone de Ouvido Intra-Auricular QKZ AK6 Pro com Microfone',
    description: '🎵 **Monitor de Áudio de Alta Fidelidade!**\n\nO Fone QKZ AK6 é reconhecido mundialmente pelo seu custo-benefício absurdo. Ideal para retorno de palco, músicos, gamers e audiófilos que buscam graves profundos e clareza cristalina.\n\n**CARACTERÍSTICAS PRINCIPAIS:**\n\n**Som de Alta Definição:**\nEquipado com Driver Dinâmico de 10mm, oferece graves potentes (Bass) sem distorcer os agudos.\n\n**Ergonomia Profissional:**\nDesign que se encaixa perfeitamente no ouvido, com gancho para orelha que impede que caia durante exercícios ou apresentações.\n\n**Versatilidade:**\nPerfeito para ouvir música no celular, jogar com precisão de áudio ou usar como retorno em shows e igrejas.\n\n**ESPECIFICAÇÕES TÉCNICAS:**\n\n✅ **Modelo:** QKZ AK6\n✅ **Sensibilidade:** 105±3dB\n✅ **Resistência:** 16 ohm\n✅ **Conector:** P2 3.5mm (Padrão universal)\n✅ **Microfone:** Sim, integrado no cabo\n✅ **Cancelamento de Ruído:** Passivo (Isolamento)\n✅ **Comprimento do cabo:** 1.2m\n\n**CONTEÚDO DO PACOTE:**\n\n📦 1 Par de Fones QKZ AK6\n📦 1 Kit de borrachinhas extras\n📦 1 Suporte para orelhas\n📦 1 Case Original',
    price: 67.99,
    originalPrice: 109.90,
    image: 'https://iili.io/fbbNS4f.md.png',
    images: [
      'https://iili.io/fbbNS4f.md.png',
      'https://iili.io/fbbkMrb.png',
      'https://iili.io/fbb86XI.png',
      'https://iili.io/fbbSdB9.png',
      'https://iili.io/fbbgyIR.md.png'
    ],
    category: 'Eletrônicos',
    rating: 4.9,
    reviewsCount: 215,
    stock: 60,
    deliveryToday: true,
    isBestSeller: true,
    hasFreeShipping: false,
    tags: ['Áudio', 'Monitor', 'QKZ', 'Gamer'],
    upsellIds: [],
    benefits: [
      "Graves Potentes (Bass)",
      "Retorno de Palco",
      "Microfone HD Integrado",
      "Cabo Resistente",
      "Isolamento Acústico",
      "Conector P2 Universal"
    ],
    reviews: [
      {
        id: 'rev-qkz-01',
        userName: 'Matheus Oliveira',
        userAvatar: 'https://i.pravatar.cc/150?img=68',
        rating: 5,
        date: '2024-03-18T10:00:00Z',
        text: 'Qualidade absurda pelo preço! Os graves são muito presentes, uso para jogar no celular e ouvir música. O isolamento é ótimo.',
        media: [
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-m9ic8is13a61b4.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-m9ic8is139qa72.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-m9ic8is0nthec7.webp' }
        ]
      },
      {
        id: 'rev-qkz-02',
        userName: 'Daniela Martins',
        userAvatar: 'https://i.pravatar.cc/150?img=44',
        rating: 5,
        date: '2024-03-16T15:30:00Z',
        text: 'Comprei para usar de retorno na igreja. Surpreendeu muito! O som é limpo e não cai da orelha. O vídeo mostra os detalhes.',
        media: [
          { type: 'video', url: 'https://down-tx-br.vod.susercontent.com/api/v4/11110103/mms/br-11110103-6kfkq-mc4zbdi1r3ydb4.16000051752410687.mp4' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-mc4zam5vrbgl73.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-mc4zam5vrb8n20.webp' }
        ]
      },
      {
        id: 'rev-qkz-03',
        userName: 'Bruno Henrique',
        userAvatar: 'https://i.pravatar.cc/150?img=11',
        rating: 5,
        date: '2024-03-14T09:15:00Z',
        text: 'Fone top demais. Chegou no mesmo dia em Cascavel. A caixa é bem rígida, protege bem o fone.',
        media: [
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-m64kcxzd0iia83.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-m64kcxzd3bn67b.webp' }
        ]
      }
    ]
  },
  {
    id: 'trimmer-dragon-01',
    name: 'Máquina de Cortar Cabelo e Barba Dragão Portátil Elétrico',
    description: '🐉 **Estilo e Precisão na Palma da Mão!**\n\nEste **Barbeador Profissional Sem Fio** é a ferramenta definitiva para quem busca qualidade e estilo. Com design vintage em metal e estampa detalhada, ele não é apenas bonito, mas extremamente funcional.\n\n**CARACTERÍSTICAS PRINCIPAIS:**\n\n**Liberdade Sem Fio:**\nEste modelo é sem fio e possui bateria recarregável via USB. Tenha todo o conforto de cortar cabelos e fazer a barba sem cabos atrapalhando.\n\n**Bateria de Alta Duração:**\nPossui uma bateria de 1200mAh que garante uma autonomia de **2 horas de uso contínuo**. Recarga completa em apenas 2 horas.\n\n**Potência Profissional:**\nPerfeita para profissionais e uso doméstico, possui motor potente de 5W. Aguenta o trabalho duro do dia a dia. Ideal para pezinho, desenhos, disfarce e acabamentos. O que manda aqui é sua habilidade!\n\n**Design Premium:**\nCorpo todo em metal com acabamento texturizado (Dragão/Buda), perfeito para barbeiros que querem se destacar ou para ter uma ferramenta diferenciada em casa.\n\n**Custo-Benefício:**\nEntrega qualidade superior e mais funcionalidades que muitas marcas famosas que custam o triplo do preço.\n\n**ESPECIFICAÇÕES:**\n\n✅ **Potência:** 5W\n✅ **Tamanho:** 14,8 x 2,5 cm\n✅ **Bateria:** 1200mAh (Recarregável)\n✅ **Material:** Metal e Plástico ABS\n\n**CONTEÚDO DA EMBALAGEM:**\n\n📦 1 Máquina de Barbear\n📦 4 Pentes Guia (1.5mm, 2mm, 3mm, 4mm)\n📦 1 Cabo USB\n📦 1 Escovinha de Limpeza',
    price: 52.99,
    originalPrice: 99.90,
    image: 'https://iili.io/fbq0joJ.md.png',
    images: [
      'https://iili.io/fbq0joJ.md.png',
      'https://iili.io/fbq1wbe.md.png',
      'https://iili.io/fbqGZSp.png',
      'https://iili.io/fbqMkss.md.png'
    ],
    category: 'Saúde',
    rating: 4.9,
    reviewsCount: 156,
    stock: 40,
    deliveryToday: true,
    isBestSeller: true,
    hasFreeShipping: false,
    tags: ['Barba', 'Cabelo', 'Dragão', 'Profissional'],
    upsellIds: [],
    benefits: [
      "Sem Fio & Recarregável",
      "Design Metálico Premium",
      "4 Pentes Inclusos",
      "Bateria 1200mAh",
      "Motor Potente 5W",
      "Alta Precisão"
    ],
    reviews: [
      {
        id: 'rev-trim-01',
        userName: 'Ricardo Bastos',
        userAvatar: 'https://i.pravatar.cc/150?img=12',
        rating: 5,
        date: '2024-03-15T14:30:00Z',
        text: 'Acabamento top! A máquina é pesadinha, passa sensação de qualidade. Corta muito bem, usei pra fazer a barba e o acabamento do cabelo.',
        media: [
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-lsxja3fpi971c7.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-lsxja3fpjnrhe1.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-lsxja3fpl2bx2c.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-lsxja3fpmgwd28.webp' }
        ]
      },
      {
        id: 'rev-trim-02',
        userName: 'Lucas Ferreira',
        userAvatar: 'https://i.pravatar.cc/150?img=60',
        rating: 5,
        date: '2024-03-14T09:15:00Z',
        text: 'Muito forte! Surpreendeu pelo tamanho. O desenho do dragão é muito bonito. Vídeo mostrando ela funcionando.',
        media: [
          { type: 'video', url: 'https://down-zl-br.vod.susercontent.com/api/v4/11110103/mms/br-11110103-6kfko-m0xchzd0sgo67b.16000051727976940.mp4' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-m0xch9kwingg5c.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-m0xch9h0oc7rc7.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-m0xch9h0oc4mf6.webp' }
        ]
      },
      {
        id: 'rev-trim-03',
        userName: 'Gabriel Silva',
        userAvatar: 'https://i.pravatar.cc/150?img=33',
        rating: 5,
        date: '2024-03-12T18:20:00Z',
        text: 'Chegou rápido. Pelo preço vale muito a pena, faz o pezinho perfeito. A bateria dura bastante.',
        media: [
          { type: 'video', url: 'https://down-zl-br.vod.susercontent.com/api/v4/11110103/mms/br-11110103-6kfkp-m5kej817hvtcf9.16000051738089615.mp4' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-m5kegsgxo9cg13.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-m5kegsgxpnwwb6.webp' },
          { type: 'image', url: 'https://down-br.img.susercontent.com/file/br-11134103-7r98o-m5kegsgxr2hc04.webp' }
        ]
      }
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
