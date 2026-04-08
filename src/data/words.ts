export interface WordEntry {
  word: string;
  emoji: string;
  category: string;
  clues: string[];
}

export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameMode = 'classic' | 'speed' | 'battle' | 'draw';

const WORDS: Record<Difficulty, WordEntry[]> = {
  easy: [
    { word: "GATO", emoji: "🐱", category: "🐾 Animais", clues: ["É um ser vivo","É um animal","É um mamífero","Tem 4 patas","É peludo","Pode ser doméstico","Faz barulho com a voz","Ronrona quando feliz","Gosta de brincar com novelos","Mia! 🐱"] },
    { word: "SOL", emoji: "☀️", category: "🌍 Natureza", clues: ["Existe no universo","É uma estrela","É muito grande","Está no espaço","Ilumina o dia","Aquece a Terra","Fica no céu durante o dia","É amarelo e brilhante","Nasce de manhã e se põe à noite","Não aparece à noite ☀️"] },
    { word: "PIZZA", emoji: "🍕", category: "🍕 Comida", clues: ["É uma coisa","Se come","É feita no forno","Tem farinha","É redonda","Tem pedaços triangulares","Tem cobertura por cima","Pode ter queijo","Vem da Itália","Margherita é o sabor clássico 🍕"] },
    { word: "BOLA", emoji: "⚽", category: "⚽ Esporte", clues: ["É um objeto","Tem forma esférica","Pode ser de borracha","Usada para brincar","Rola no chão","Pode ser chutada","É usada em esportes","Pode ser de vários tamanhos","Usada no futebol","Goooool! ⚽"] },
    { word: "CHUVA", emoji: "🌧️", category: "🌍 Natureza", clues: ["É um fenômeno","Acontece na natureza","Vem das nuvens","Cai do céu","É feita de água","Molha tudo","Faz barulho ao cair","Precisa de guarda-chuva","As plantas adoram","Faz pingo-pingo 🌧️"] },
    { word: "NAVIO", emoji: "🚢", category: "🚗 Transporte", clues: ["É um objeto criado pelo homem","É um meio de transporte","É muito grande","Feito de metal","Carrega pessoas ou carga","Se move","Usa um motor ou vento","Flutua","Navega em oceanos","Titanic era um deles 🚢"] },
    { word: "ELEFANTE", emoji: "🐘", category: "🐾 Animais", clues: ["É um ser vivo","É um animal","Vive na selva ou savana","É muito pesado","Tem 4 patas","É cinza","Come folhas e frutas","Tem orelhas grandes","Tem uma tromba longa","É o maior animal terrestre 🐘"] },
    { word: "SORVETE", emoji: "🍦", category: "🍕 Comida", clues: ["É uma comida","É uma sobremesa","É gelado","Pode derreter","É doce","Tem vários sabores","Pode vir em casquinha","Chocolate é um sabor clássico","Delicioso no verão","Casquinha de baunilha 🍦"] },
    { word: "BORBOLETA", emoji: "🦋", category: "🐾 Animais", clues: ["É um ser vivo","É um inseto","Começou sendo uma lagarta","Passa por metamorfose","É muito leve","Tem antenas","Voa","Tem 4 asas coloridas","Pousa em flores","Colorida e delicada 🦋"] },
    { word: "PIANO", emoji: "🎹", category: "🎵 Música", clues: ["É um objeto","É feito pelo homem","É usado em arte","É um instrumento","Tem teclas","As teclas são pretas e brancas","Produz som","Precisa ser tocado com as mãos","É grande e pesado","Beethoven tocava 🎹"] },
    { word: "CACHORRO", emoji: "🐶", category: "🐾 Animais", clues: ["É um ser vivo","É um animal","É um mamífero","Tem 4 patas","É peludo","Pode ser doméstico","Late","Abana o rabo quando feliz","É chamado de melhor amigo do homem","Au au! 🐶"] },
    { word: "PEIXE", emoji: "🐟", category: "🐾 Animais", clues: ["É um ser vivo","É um animal","É um vertebrado","Não tem patas","Tem escamas","Respira com brânquias","Vive na água","Tem nadadeiras","Pode ser de aquário","Nemo é um famoso 🐟"] },
    { word: "GIRAFA", emoji: "🦒", category: "🐾 Animais", clues: ["É um animal","É um mamífero","Vive na África","É muito alta","Tem manchas","Come folhas","Tem quatro patas","Tem um pescoço gigante","Alcança o topo das árvores","O animal terrestre mais alto do mundo 🦒"] },
    { word: "BANANA", emoji: "🍌", category: "🍕 Comida", clues: ["É um alimento","É uma fruta","Tem casca","A casca é escorregadia","É doce","Tem formato curvo","É amarela quando madura","Rica em potássio","Macacos adoram","A fruta mais consumida do mundo 🍌"] },
    { word: "BRASIL", emoji: "🇧🇷", category: "🌎 Países", clues: ["É um país","Fica na América do Sul","É muito grande","Tem muita floresta","Tem um famoso carnaval","A língua é o português","Tem uma grande floresta chamada Amazônia","A bandeira é verde e amarela","Ganhou 5 Copas do Mundo","Somos daqui! 🇧🇷"] },
  ],
  medium: [
    { word: "VULCÃO", emoji: "🌋", category: "🌍 Natureza", clues: ["É um fenômeno geográfico","Está relacionado à geologia","Pode causar destruição","Existe em vários países","É uma formação natural","Pode estar ativo ou inativo","Emite gases","Lança material incandescente","Tem lava","Pompeii foi destruída por um 🌋"] },
    { word: "ASTRONAUTA", emoji: "👨‍🚀", category: "🚀 Ciência", clues: ["É uma profissão","Precisa de muito estudo","Trabalha em ambiente incomum","Usa um traje especial","Passa meses treinando","É selecionado por agências governamentais","Sai da atmosfera terrestre","Viaja pelo espaço","Pode habitar uma estação espacial","Neil Armstrong foi o primeiro na Lua 👨‍🚀"] },
    { word: "PIRÂMIDE", emoji: "🏛️", category: "🌍 Mundo", clues: ["É uma construção","É muito antiga","Tem forma geométrica","A forma tem base quadrada","Os lados se encontram no topo","É monumental","Foi construída por antigas civilizações","Usada como túmulo de reis","Fica no deserto","O Egito tem as mais famosas 🏛️"] },
    { word: "SUBMARINO", emoji: "🤿", category: "🚗 Transporte", clues: ["É um veículo","Transporta pessoas","Foi inventado no século XX","É feito de metal resistente","Tem periscópio","Suporta alta pressão","Se move","Vai fundo","Navega embaixo da água","Nemo encontrou um no filme 🤿"] },
    { word: "XADREZ", emoji: "♟️", category: "🎲 Jogos", clues: ["É uma atividade","Envolve raciocínio","É um jogo","É praticado mundialmente","Tem regras complexas","Usa peças sobre um tabuleiro","As peças têm diferentes movimentos","São dois jogadores","O objetivo é capturar o Rei adversário","Bobby Fischer era genial nisso ♟️"] },
    { word: "ARCO-ÍRIS", emoji: "🌈", category: "🌍 Natureza", clues: ["É um fenômeno natural","Aparece no céu","Envolve luz","A luz é refratada","Aparece após a chuva","Tem várias cores","Forma um arco no céu","Vai do vermelho ao violeta","Tem 7 cores","Dopamin no final do 🌈"] },
    { word: "BUMERANGUE", emoji: "🪃", category: "🎲 Jogos", clues: ["É um objeto","Feito pelo homem","Tem forma curva","Pode ser de madeira","É leve","É arremessado","É um brinquedo ou arma","Tem propriedade aerodinâmica especial","Volta para quem lançou","Usado pelos aborígenes australianos 🪃"] },
    { word: "TRAMPOLIM", emoji: "🤸", category: "⚽ Esporte", clues: ["É um equipamento","Usado em esportes","É elástico","Feito de lona tensionada","Amplifica movimentos","Faz você ir para cima","Muito usado em academias","É uma modalidade olímpica","Você pula nele","Gymnasts adoram 🤸"] },
    { word: "MACARRÃO", emoji: "🍝", category: "🍕 Comida", clues: ["É um alimento","Rico em carboidratos","Feito de farinha","É cozido em água","Tem vários formatos","Pode ser recheado","Acompanha molho","Bolonhesa é um molho famoso","Prato típico italiano","Spaghetti é o mais famoso 🍝"] },
    { word: "VELOCIDADE", emoji: "💨", category: "🚀 Ciência", clues: ["É um conceito","Está na física","Mede uma relação","Envolve distância e tempo","Pode ser alta ou baixa","Carros são avaliados por isso","Medida em km/h ou m/s","Usain Bolt tem muita","A da luz é a máxima no universo","Fórmula: d ÷ t 💨"] },
    { word: "TUBARÃO", emoji: "🦈", category: "🐾 Animais", clues: ["É um animal","É um peixe","É um predador","Vive no oceano","Tem guelras","Tem pele áspera","Tem dentes afiados","Pode detectar sangue de longe","É o maior predador dos mares","Jaws é o mais famoso 🦈"] },
    { word: "SUSHI", emoji: "🍣", category: "🍕 Comida", clues: ["É um alimento","É um prato","Tem arroz","O arroz é temperado com vinagre","Pode ter peixe cru","Veio do Japão","Servido com molho de soja","Usa um utensílio chamado hashi","Tem vários tipos como nigiri e temaki","Prato típico japonês 🍣"] },
    { word: "EGITO", emoji: "🇪🇬", category: "🌎 Países", clues: ["É um país","Fica no norte da África","É banhado pelo mar Mediterrâneo","Tem um rio famoso chamado Nilo","Tem um deserto gigante","Tem construções milenares","Tem pirâmides","Os faraós eram seus reis","A esfinge fica aqui","Terra dos faraós 🇪🇬"] },
  ],
  hard: [
    { word: "FOTOSSÍNTESE", emoji: "🌿", category: "🚀 Ciência", clues: ["É um processo biológico","Ocorre em seres vivos","Fundamental para a vida na Terra","Ocorre em plantas, algas e algumas bactérias","Acontece nas células","Usa energia","A energia vem do sol","Produz glicose e oxigênio","Acontece nos cloroplastos","Fórmula: CO₂ + H₂O + luz → glicose 🌿"] },
    { word: "DEMOCRACIA", emoji: "🗳️", category: "🌍 Mundo", clues: ["É um conceito","É um sistema","Relacionado à organização social","Existiu na Grécia antiga","Oposto de ditadura","Envolve representação do povo","O Brasil tem este sistema","Tem eleições","O poder emana do povo","Abraham Lincoln defendia governo do povo, pelo povo, para o povo 🗳️"] },
    { word: "PALINDROMO", emoji: "🔤", category: "📚 Linguagem", clues: ["É um conceito linguístico","Envolve letras ou palavras","Existe em vários idiomas","Tem uma propriedade especial de simetria","Pode ser uma palavra ou frase","Tem a mesma leitura em dois sentidos","'Ana' é um exemplo","'Roma me tem amor' é outro","Lê-se igual de trás para frente","Ovo, arara, reviver 🔤"] },
    { word: "ALGORITMO", emoji: "💻", category: "🚀 Ciência", clues: ["É um conceito","Existe na matemática e na computação","É um conjunto de instruções","Segue uma sequência lógica","Resolve um problema passo a passo","Tem início, meio e fim","Pode ser representado em fluxograma","Google usa um famoso para buscas","É a base da programação","Receita de bolo é um exemplo 💻"] },
    { word: "RENASCIMENTO", emoji: "🎨", category: "🌍 Mundo", clues: ["É um período histórico","Ocorreu na Europa","Entre os séculos XIV e XVI","Valorizou a cultura clássica","Houve avanço nas artes","Leonardo da Vinci é desta época","Michelangelo pintou a Capela Sistina","Surgiu na Itália","Marcou a transição para a Idade Moderna","O 're-nascer' da arte e ciência 🎨"] },
    { word: "INFLAÇÃO", emoji: "💸", category: "🌍 Mundo", clues: ["É um conceito econômico","Afeta toda a sociedade","Relacionado ao dinheiro","Muda ao longo do tempo","Governos tentam controlar","Bancos centrais influenciam","Quando está alta, o dinheiro vale menos","O aumento geral dos preços","IPCA mede isso no Brasil 💸","É o oposto da deflação"] },
    { word: "QUASAR", emoji: "🌌", category: "🚀 Ciência", clues: ["Existe no universo","É um fenômeno astrofísico","Descoberto no século XX","Muito distante da Terra","Emite energia enorme","Mais brilhante que galáxias inteiras","Tem um buraco negro supermassivo no centro","O nome vem de quasi-stellar object","É um núcleo galáctico ativo","Um dos objetos mais luminosos do universo 🌌"] },
    { word: "ECOSISTEMA", emoji: "🌳", category: "🌍 Natureza", clues: ["É um conceito da ecologia","Existe na natureza","Envolve vários elementos","Tem componentes vivos e não-vivos","Interagem entre si","Pode ser grande ou pequeno","Inclui flora e fauna","Uma floresta é um exemplo","O humano está inserido nele","Amazônia é um dos maiores 🌳"] },
    { word: "AXOLOTE", emoji: "🦎", category: "🐾 Animais", clues: ["É um animal","É um vertebrado","É um anfíbio","Vive no México","Tem guelras externas","Parece um lagarto aquático","Tem a capacidade de regenerar membros","Fica em estado larval a vida toda","Fenômeno chamado neotenia","O pokémon Wooper é baseado nele 🦎"] },
    { word: "ISLÂNDIA", emoji: "🇮🇸", category: "🌎 Países", clues: ["É um país","Fica no Atlântico Norte","Tem poucos habitantes","É uma ilha","Tem muitos vulcões ativos","Tem gêiseres","Tem aurora boreal","A capital é Reykjavik","Paradoxalmente, tem muitos campos verdes","País do fogo e do gelo 🇮🇸"] },
  ],
};

const DRAW_WORDS: Record<Difficulty, string[]> = {
  easy: ["GATO","CACHORRO","PEIXE","AVIÃO","CASA","FLOR","ÁRVORE","CARRO","SOL","LUA","ESTRELA","CORAÇÃO","BOLA","PIZZA","SORVETE","ELEFANTE","GIRAFA","BORBOLETA","PÁSSARO","BARCO"],
  medium: ["VULCÃO","ARCO-ÍRIS","DINOSSAURO","ROBÔ","ASTRONAUTA","CASTELO","DRAGÃO","FADA","SEREIA","PIRATA","TRAMPOLIM","SUBMARINO","FOGUETE","BUMERANGUE","TORNADO"],
  hard: ["DEMOCRACIA","GRAVIDADE","FOTOSSÍNTESE","PARADOXO","METÁFORA","INFLAÇÃO","ECOSISTEMA","SINAPSES","QUASAR","PALINDROMO"],
};

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getWords(difficulty: Difficulty): WordEntry[] {
  return [...WORDS[difficulty]];
}

export function getDrawWords(difficulty: Difficulty): string[] {
  return [...DRAW_WORDS[difficulty]];
}

export function getClueIcon(index: number): string {
  const icons = ['💡','🔍','🧩','🌀','🎯','✨','💫','🔑','🌟','🏆'];
  return icons[Math.min(index, icons.length - 1)];
}

export const DIFFICULTY_LABELS: Record<Difficulty, { label: string; emoji: string }> = {
  easy: { label: 'Fácil', emoji: '🌱' },
  medium: { label: 'Médio', emoji: '🔥' },
  hard: { label: 'Difícil', emoji: '💀' },
};
