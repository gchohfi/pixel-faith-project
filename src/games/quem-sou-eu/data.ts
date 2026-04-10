export interface QuemSouEuEntry {
  answer: string;
  emoji: string;
  category: string;
  clues: [string, string, string];
}

const ENTRIES: QuemSouEuEntry[] = [
  // ── Animais ──
  { answer: "Leão", emoji: "🦁", category: "Animal", clues: ["Sou um mamífero que vive em grupo", "Tenho uma juba majestosa", "Sou chamado de rei da selva"] },
  { answer: "Pinguim", emoji: "🐧", category: "Animal", clues: ["Sou uma ave que não voa", "Adoro nadar em águas geladas", "Pareço usar um terno preto e branco"] },
  { answer: "Camaleão", emoji: "🦎", category: "Animal", clues: ["Sou um réptil de movimentos lentos", "Meus olhos se movem independentemente", "Mudo de cor para me camuflar"] },
  { answer: "Golfinho", emoji: "🐬", category: "Animal", clues: ["Sou um mamífero que vive no mar", "Sou considerado muito inteligente", "Adoro saltar fora da água e sou muito brincalhão"] },
  { answer: "Coruja", emoji: "🦉", category: "Animal", clues: ["Sou uma ave de rapina", "Consigo girar a cabeça quase completamente", "Sou símbolo de sabedoria e enxergo no escuro"] },
  { answer: "Tartaruga", emoji: "🐢", category: "Animal", clues: ["Sou um réptil muito antigo", "Carrego minha casa nas costas", "Sou conhecida por ser lenta, mas vivo muitos anos"] },
  { answer: "Abelha", emoji: "🐝", category: "Animal", clues: ["Sou um inseto que vive em colônia", "Produzo algo muito doce", "Tenho listras amarelas e pretas e posso picar"] },
  { answer: "Polvo", emoji: "🐙", category: "Animal", clues: ["Sou um animal marinho sem ossos", "Tenho oito braços", "Posso soltar tinta para escapar dos predadores"] },
  { answer: "Morcego", emoji: "🦇", category: "Animal", clues: ["Sou o único mamífero que voa", "Durmo de cabeça para baixo", "Me oriento pelo som, usando ecolocalização"] },
  { answer: "Cavalo-marinho", emoji: "🐴", category: "Animal", clues: ["Sou um peixe com formato inusitado", "Nado na posição vertical", "O pai é quem carrega os filhotes na barriga"] },
  { answer: "Elefante", emoji: "🐘", category: "Animal", clues: ["Sou o maior animal terrestre", "Tenho uma tromba longa e versátil", "Minha memória é famosa por ser excelente"] },
  { answer: "Águia", emoji: "🦅", category: "Animal", clues: ["Sou uma ave de rapina poderosa", "Tenho uma visão incrivelmente aguçada", "Sou símbolo de liberdade em vários países"] },
  { answer: "Tubarão", emoji: "🦈", category: "Animal", clues: ["Sou um peixe cartilaginoso muito antigo", "Tenho várias fileiras de dentes", "Sou o predador mais temido dos oceanos"] },
  { answer: "Borboleta", emoji: "🦋", category: "Animal", clues: ["Começo a vida como lagarta", "Passo por uma metamorfose dentro de um casulo", "Tenho asas coloridas e voo de flor em flor"] },
  { answer: "Preguiça", emoji: "🦥", category: "Animal", clues: ["Sou um mamífero que vive em árvores", "Me movo extremamente devagar", "Durmo até 20 horas por dia e vivo na América do Sul"] },
  { answer: "Flamingo", emoji: "🦩", category: "Animal", clues: ["Sou uma ave que vive em lagos rasos", "Fico apoiada em uma perna só", "Minha cor rosa vem da minha alimentação"] },
  { answer: "Ornitorrinco", emoji: "🦆", category: "Animal", clues: ["Sou um mamífero que bota ovos", "Tenho bico parecido com o de um pato", "Vivo na Austrália e sou venenoso"] },
  { answer: "Baleia-azul", emoji: "🐋", category: "Animal", clues: ["Sou o maior animal que já existiu no planeta", "Posso medir mais de 30 metros", "Apesar do meu tamanho, me alimento de criaturas minúsculas"] },

  // ── Pessoas famosas ──
  { answer: "Albert Einstein", emoji: "🧠", category: "Pessoa", clues: ["Fui um cientista nascido na Alemanha", "Minha teoria mais famosa envolve E=mc²", "Sou conhecido pelo cabelo despenteado e pela genialidade"] },
  { answer: "Santos Dumont", emoji: "✈️", category: "Pessoa", clues: ["Sou brasileiro e inventor", "Fiz experiências com balões e aeronaves", "No Brasil, sou considerado o pai da aviação"] },
  { answer: "Frida Kahlo", emoji: "🎨", category: "Pessoa", clues: ["Fui uma artista mexicana famosa", "Pintei muitos autorretratos", "Sou reconhecida pelas sobrancelhas marcantes e flores no cabelo"] },
  { answer: "Pelé", emoji: "⚽", category: "Pessoa", clues: ["Sou brasileiro e um dos maiores atletas da história", "Marquei mais de mil gols na carreira", "Sou chamado de Rei do Futebol"] },
  { answer: "Cleopatra", emoji: "👑", category: "Pessoa", clues: ["Fui uma governante do mundo antigo", "Meu reino ficava no norte da África", "Sou a rainha mais famosa do Egito"] },
  { answer: "Leonardo da Vinci", emoji: "🖼️", category: "Pessoa", clues: ["Fui um gênio italiano do Renascimento", "Pintei um quadro com um sorriso misterioso", "Também projetei máquinas voadoras e tanques de guerra"] },
  { answer: "Marie Curie", emoji: "🔬", category: "Pessoa", clues: ["Fui uma cientista nascida na Polônia", "Ganhei dois prêmios Nobel em áreas diferentes", "Descobri elementos radioativos como o rádio e o polônio"] },
  { answer: "Beethoven", emoji: "🎵", category: "Pessoa", clues: ["Fui um compositor europeu muito famoso", "Continuei compondo mesmo após perder a audição", "Minha 9ª Sinfonia é uma das obras mais conhecidas do mundo"] },
  { answer: "Mahatma Gandhi", emoji: "☮️", category: "Pessoa", clues: ["Fui um líder político da Índia", "Lutei pela independência sem usar violência", "Sou símbolo mundial da resistência pacífica"] },
  { answer: "Amelia Earhart", emoji: "🛩️", category: "Pessoa", clues: ["Fui uma aviadora americana pioneira", "Fui a primeira mulher a cruzar o Atlântico voando sozinha", "Desapareci misteriosamente sobre o Pacífico"] },
  { answer: "Nikola Tesla", emoji: "⚡", category: "Pessoa", clues: ["Fui um inventor nascido na Sérvia", "Trabalhei com eletricidade e corrente alternada", "Meu nome virou marca de carros elétricos famosos"] },
  { answer: "Charles Darwin", emoji: "🐒", category: "Pessoa", clues: ["Fui um naturalista britânico", "Viajei pelo mundo no navio Beagle", "Criei a teoria da evolução das espécies"] },
  { answer: "Monteiro Lobato", emoji: "📚", category: "Pessoa", clues: ["Fui um escritor brasileiro muito importante", "Criei um mundo mágico chamado Sítio do Picapau Amarelo", "Meus personagens incluem Emília e Visconde"] },
  { answer: "Wolfgang Amadeus Mozart", emoji: "🎹", category: "Pessoa", clues: ["Fui um compositor austríaco prodígio", "Comecei a compor música aos 5 anos de idade", "Sou um dos maiores gênios da música clássica"] },

  // ── Objetos ──
  { answer: "Guarda-chuva", emoji: "☂️", category: "Objeto", clues: ["Sou um objeto que você carrega na bolsa", "Tenho uma haste e uma cobertura que abre", "Te protejo da chuva"] },
  { answer: "Relógio", emoji: "⏰", category: "Objeto", clues: ["Posso ser encontrado na parede ou no pulso", "Tenho ponteiros ou números digitais", "Minha função é marcar as horas"] },
  { answer: "Espelho", emoji: "🪞", category: "Objeto", clues: ["Sou feito de vidro e metal", "Você me olha todos os dias", "Mostro uma cópia exata de quem está na minha frente"] },
  { answer: "Bússola", emoji: "🧭", category: "Objeto", clues: ["Sou um instrumento de navegação muito antigo", "Tenho uma agulha que se move sozinha", "Sempre aponto para o norte magnético"] },
  { answer: "Telescópio", emoji: "🔭", category: "Objeto", clues: ["Sou um instrumento óptico com lentes", "Galileu me usou para fazer descobertas", "Sirvo para observar estrelas e planetas distantes"] },
  { answer: "Ampulheta", emoji: "⏳", category: "Objeto", clues: ["Sou um objeto com duas partes de vidro", "Areia passa de um lado para o outro dentro de mim", "Fui usada para medir o tempo antes dos relógios"] },
  { answer: "Binóculo", emoji: "🔭", category: "Objeto", clues: ["Sou um instrumento óptico que você segura com as duas mãos", "Tenho duas lentes lado a lado", "Sirvo para ver coisas distantes, como pássaros ou paisagens"] },
  { answer: "Globo terrestre", emoji: "🌍", category: "Objeto", clues: ["Sou uma esfera que fica em cima de uma base", "Posso girar e mostrar todos os continentes", "Represento o planeta Terra em miniatura"] },
  { answer: "Violão", emoji: "🎸", category: "Objeto", clues: ["Sou um instrumento musical de madeira", "Tenho seis cordas que vibram ao serem tocadas", "Sou muito popular em rodas de música no Brasil"] },
  { answer: "Lupa", emoji: "🔍", category: "Objeto", clues: ["Sou feita de vidro e metal", "Tenho uma lente que aumenta o que você vê", "Detetives famosos me usam para investigar"] },
  { answer: "Pipa", emoji: "🪁", category: "Objeto", clues: ["Sou feita de papel ou plástico e varetas", "Preciso de vento para funcionar", "Voo no céu presa por uma linha comprida"] },

  // ── Lugares ──
  { answer: "Torre Eiffel", emoji: "🗼", category: "Lugar", clues: ["Sou uma estrutura de ferro muito alta", "Fui construída para uma exposição mundial em 1889", "Sou o monumento mais visitado de Paris"] },
  { answer: "Amazônia", emoji: "🌳", category: "Lugar", clues: ["Sou a maior do meu tipo no planeta", "Abranjo vários países da América do Sul", "Sou chamada de pulmão do mundo — sou uma floresta tropical"] },
  { answer: "Coliseu", emoji: "🏟️", category: "Lugar", clues: ["Sou uma construção antiga em formato oval", "Gladiadores lutavam dentro de mim", "Fico em Roma e sou uma das 7 maravilhas do mundo moderno"] },
  { answer: "Monte Everest", emoji: "🏔️", category: "Lugar", clues: ["Sou uma formação natural na Ásia", "Tenho quase 9 mil metros de altura", "Sou o ponto mais alto do planeta Terra"] },
  { answer: "Grande Muralha da China", emoji: "🧱", category: "Lugar", clues: ["Sou uma construção com milhares de quilômetros", "Fui construída ao longo de séculos para proteção", "Sou a maior estrutura feita pelo homem e fico na Ásia"] },
  { answer: "Machu Picchu", emoji: "🏛️", category: "Lugar", clues: ["Sou uma cidade antiga no topo de uma montanha", "Fui construída pelo Império Inca", "Fico no Peru e sou uma das 7 maravilhas do mundo moderno"] },
  { answer: "Estátua da Liberdade", emoji: "🗽", category: "Lugar", clues: ["Sou um presente da França para os Estados Unidos", "Seguro uma tocha na mão direita", "Fico numa ilha em Nova York e sou símbolo de liberdade"] },
  { answer: "Pirâmides de Gizé", emoji: "🔺", category: "Lugar", clues: ["Somos construções com mais de 4 mil anos", "Fomos feitas com milhões de blocos de pedra", "Ficamos no Egito e somos túmulos de faraós"] },
  { answer: "Cristo Redentor", emoji: "⛰️", category: "Lugar", clues: ["Sou uma estátua gigante de braços abertos", "Fico no topo de um morro no Rio de Janeiro", "Sou uma das 7 maravilhas do mundo moderno e símbolo do Brasil"] },
  { answer: "Taj Mahal", emoji: "🕌", category: "Lugar", clues: ["Sou um monumento de mármore branco na Índia", "Fui construído por amor a uma imperatriz", "Sou considerado uma das construções mais bonitas do mundo"] },
  { answer: "Deserto do Saara", emoji: "🏜️", category: "Lugar", clues: ["Sou o maior deserto quente do mundo", "Fico no norte da África", "Tenho dunas de areia que podem ter mais de 100 metros de altura"] },

  // ── Alimentos ──
  { answer: "Chocolate", emoji: "🍫", category: "Alimento", clues: ["Venho de uma semente tropical chamada cacau", "Posso ser amargo, ao leite ou branco", "Sou o doce mais popular do mundo e derreto com calor"] },
  { answer: "Pipoca", emoji: "🍿", category: "Alimento", clues: ["Sou feita de um grão que estoura com calor", "Sou branca e fofinha depois de pronta", "Sou a companheira perfeita para assistir filmes"] },
  { answer: "Mel", emoji: "🍯", category: "Alimento", clues: ["Sou um líquido dourado e viscoso", "Sou produzido por insetos em colmeias", "Sou o único alimento que nunca estraga"] },
  { answer: "Queijo", emoji: "🧀", category: "Alimento", clues: ["Sou feito a partir do leite", "Existo em centenas de variedades pelo mundo", "Minas Gerais é famoso por me produzir no Brasil"] },
  { answer: "Banana", emoji: "🍌", category: "Alimento", clues: ["Sou uma fruta tropical amarela", "Tenho uma casca que precisa ser descascada", "Sou rica em potássio e macacos me adoram"] },
  { answer: "Pizza", emoji: "🍕", category: "Alimento", clues: ["Sou um prato italiano que conquistou o mundo", "Tenho uma base de massa redonda coberta de molho", "A versão mais clássica leva tomate, queijo e manjericão"] },
  { answer: "Café", emoji: "☕", category: "Alimento", clues: ["Venho de um grão que é torrado e moído", "O Brasil é o maior produtor mundial de mim", "Milhões de pessoas me bebem toda manhã para acordar"] },
  { answer: "Açaí", emoji: "🫐", category: "Alimento", clues: ["Sou uma fruta roxa da Amazônia", "Sou servido como uma pasta congelada grossa", "No Brasil, sou muito popular com granola e banana por cima"] },

  // ── Invenções / Conceitos ──
  { answer: "Internet", emoji: "🌐", category: "Invenção", clues: ["Fui criada por militares nos anos 1960", "Conecto bilhões de dispositivos no mundo todo", "Sem mim, você não usaria redes sociais nem buscadores"] },
  { answer: "Roda", emoji: "⚙️", category: "Invenção", clues: ["Sou uma das invenções mais antigas da humanidade", "Tenho formato circular e giro em torno de um eixo", "Sem mim, carros, bicicletas e trens não existiriam"] },
  { answer: "Lâmpada", emoji: "💡", category: "Invenção", clues: ["Fui aperfeiçoada por Thomas Edison", "Transformo eletricidade em algo útil", "Ilumino ambientes quando está escuro"] },
  { answer: "Vacina", emoji: "💉", category: "Invenção", clues: ["Fui desenvolvida para combater doenças", "Edward Jenner criou a primeira contra a varíola", "Treino o sistema imunológico para se defender"] },
  { answer: "Imprensa", emoji: "📰", category: "Invenção", clues: ["Fui inventada por Gutenberg no século XV", "Permitia reproduzir textos em grande quantidade", "Revolucionei a forma como livros e jornais eram feitos"] },
  { answer: "Telefone", emoji: "📞", category: "Invenção", clues: ["Fui inventado no século XIX", "Permito que pessoas conversem à distância", "Alexander Graham Bell é considerado meu criador"] },
  { answer: "Bicicleta", emoji: "🚲", category: "Invenção", clues: ["Sou um meio de transporte movido por pedais", "Tenho duas rodas e um guidão", "Sou ecológica, saudável e não preciso de combustível"] },

  // ── Personagens fictícios ──
  { answer: "Sherlock Holmes", emoji: "🔍", category: "Personagem", clues: ["Sou um personagem de livros britânicos", "Moro na Rua Baker 221B em Londres", "Sou o detetive mais famoso da ficção"] },
  { answer: "Peter Pan", emoji: "🧚", category: "Personagem", clues: ["Sou um personagem que nunca envelhece", "Vivo em um lugar mágico com fadas e piratas", "Meu inimigo é o Capitão Gancho"] },
  { answer: "Chapeuzinho Vermelho", emoji: "🧣", category: "Personagem", clues: ["Sou personagem de um conto de fadas europeu", "Vou visitar minha avó levando uma cesta", "No caminho, encontro um lobo malvado na floresta"] },
  { answer: "Robin Hood", emoji: "🏹", category: "Personagem", clues: ["Sou um personagem lendário da Inglaterra medieval", "Sou excelente com arco e flecha", "Roubava dos ricos para dar aos pobres"] },
  { answer: "Pinóquio", emoji: "🤥", category: "Personagem", clues: ["Sou um boneco de madeira que ganhou vida", "Meu criador é um carpinteiro chamado Gepetto", "Meu nariz cresce quando conto mentiras"] },
  { answer: "Alice", emoji: "🐇", category: "Personagem", clues: ["Sou uma menina curiosa que segue um coelho", "Caio dentro de uma toca e chego a um lugar mágico", "O lugar onde vou se chama País das Maravilhas"] },
  { answer: "Rapunzel", emoji: "👸", category: "Personagem", clues: ["Sou uma princesa presa em uma torre alta", "Meu cabelo é incrivelmente comprido", "Uma bruxa malvada me mantém prisioneira"] },
  { answer: "Saci-Pererê", emoji: "🌪️", category: "Personagem", clues: ["Sou um personagem do folclore brasileiro", "Tenho apenas uma perna e uso um gorro vermelho", "Adoro pregar peças e sumir dentro de redemoinhos"] },

  // ── Natureza / Ciência ──
  { answer: "Lua", emoji: "🌙", category: "Natureza", clues: ["Sou um corpo celeste que não produz luz própria", "Influencio as marés dos oceanos", "Sou o satélite natural da Terra e brilho à noite"] },
  { answer: "Arco-íris", emoji: "🌈", category: "Natureza", clues: ["Apareço no céu em certas condições climáticas", "Sou formado pela refração da luz solar", "Tenho sete cores e apareço depois da chuva"] },
  { answer: "Vulcão", emoji: "🌋", category: "Natureza", clues: ["Sou uma formação geológica com uma abertura no topo", "Posso ficar adormecido por séculos", "Quando entro em erupção, lanço lava e cinzas"] },
  { answer: "DNA", emoji: "🧬", category: "Ciência", clues: ["Existo dentro de quase todas as células vivas", "Tenho formato de dupla hélice", "Carrego as instruções genéticas de cada ser vivo"] },
  { answer: "Oxigênio", emoji: "💨", category: "Ciência", clues: ["Sou um elemento químico essencial", "Estou presente no ar que você respira", "Sem mim, não haveria fogo nem vida humana"] },
  { answer: "Sol", emoji: "☀️", category: "Natureza", clues: ["Sou uma estrela no centro do sistema solar", "Tenho cerca de 5 bilhões de anos", "Sem mim, não haveria luz nem calor na Terra"] },
  { answer: "Raio", emoji: "⚡", category: "Natureza", clues: ["Sou uma descarga elétrica muito poderosa", "Apareço durante tempestades no céu", "Posso atingir temperaturas 5 vezes mais quentes que o Sol"] },
  { answer: "Coral", emoji: "🪸", category: "Natureza", clues: ["Pareço uma planta mas sou um animal marinho", "Vivo em colônias e formo recifes nos oceanos", "A Grande Barreira na Austrália é feita de mim"] },
  { answer: "Aurora Boreal", emoji: "🌌", category: "Natureza", clues: ["Sou um fenômeno luminoso no céu noturno", "Aconteço perto dos polos da Terra", "Pareço cortinas coloridas dançando no céu"] },
  { answer: "Gravidade", emoji: "🍎", category: "Ciência", clues: ["Sou uma força invisível que atrai tudo para baixo", "Newton me descobriu ao ver uma fruta cair", "Sem mim, tudo flutuaria no espaço"] },

  // ── Profissões ──
  { answer: "Astronauta", emoji: "🧑‍🚀", category: "Profissão", clues: ["Trabalho fora do planeta Terra", "Uso um traje especial com capacete", "Viajo em foguetes e posso visitar a Estação Espacial"] },
  { answer: "Bombeiro", emoji: "🧑‍🚒", category: "Profissão", clues: ["Uso um uniforme resistente ao calor", "Dirijo um veículo vermelho com sirene", "Minha missão é apagar incêndios e salvar vidas"] },
  { answer: "Arqueólogo", emoji: "🏺", category: "Profissão", clues: ["Trabalho escavando o solo com cuidado", "Procuro objetos e construções de civilizações antigas", "Indiana Jones é o mais famoso de nós na ficção"] },
  { answer: "Veterinário", emoji: "🩺", category: "Profissão", clues: ["Cuido da saúde, mas não de humanos", "Meus pacientes têm patas, asas ou barbatanas", "Sou o médico dos animais"] },

  // ── Esportes ──
  { answer: "Futebol", emoji: "⚽", category: "Esporte", clues: ["Sou o esporte mais popular do mundo", "Sou jogado com os pés e uma bola redonda", "O Brasil é o país que mais vezes ganhou meu campeonato mundial"] },
  { answer: "Surfe", emoji: "🏄", category: "Esporte", clues: ["Sou praticado no mar, em cima de ondas", "Uso uma prancha para me equilibrar", "O Havaí é considerado meu berço"] },
  { answer: "Xadrez", emoji: "♟️", category: "Esporte", clues: ["Sou jogado em um tabuleiro quadriculado", "Cada jogador comanda um exército de 16 peças", "A peça mais importante é o rei"] },
  { answer: "Capoeira", emoji: "🤸", category: "Esporte", clues: ["Sou uma mistura de luta, dança e música", "Nasci no Brasil, criada por pessoas escravizadas", "Sou jogada dentro de uma roda ao som do berimbau"] },
];

export function getQuemSouEuEntries(): QuemSouEuEntry[] {
  return [...ENTRIES];
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
