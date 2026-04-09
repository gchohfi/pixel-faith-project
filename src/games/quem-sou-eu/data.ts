export interface QuemSouEuEntry {
  answer: string;
  emoji: string;
  category: string;
  clues: [string, string, string];
}

const ENTRIES: QuemSouEuEntry[] = [
  // Animais
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

  // Pessoas famosas
  { answer: "Albert Einstein", emoji: "🧠", category: "Pessoa", clues: ["Fui um cientista nascido na Alemanha", "Minha teoria mais famosa envolve E=mc²", "Sou conhecido pelo cabelo despenteado e pela genialidade"] },
  { answer: "Santos Dumont", emoji: "✈️", category: "Pessoa", clues: ["Sou brasileiro e inventor", "Fiz experiências com balões e aeronaves", "No Brasil, sou considerado o pai da aviação"] },
  { answer: "Frida Kahlo", emoji: "🎨", category: "Pessoa", clues: ["Fui uma artista mexicana famosa", "Pintei muitos autorretratos", "Sou reconhecida pelas sobrancelhas marcantes e flores no cabelo"] },
  { answer: "Pelé", emoji: "⚽", category: "Pessoa", clues: ["Sou brasileiro e um dos maiores atletas da história", "Marquei mais de mil gols na carreira", "Sou chamado de Rei do Futebol"] },
  { answer: "Cleopatra", emoji: "👑", category: "Pessoa", clues: ["Fui uma governante do mundo antigo", "Meu reino ficava no norte da África", "Sou a rainha mais famosa do Egito"] },
  { answer: "Leonardo da Vinci", emoji: "🖼️", category: "Pessoa", clues: ["Fui um gênio italiano do Renascimento", "Pintei um quadro com um sorriso misterioso", "Também projetei máquinas voadoras e tanques de guerra"] },
  { answer: "Marie Curie", emoji: "🔬", category: "Pessoa", clues: ["Fui uma cientista nascida na Polônia", "Ganhei dois prêmios Nobel em áreas diferentes", "Descobri elementos radioativos como o rádio e o polônio"] },
  { answer: "Beethoven", emoji: "🎵", category: "Pessoa", clues: ["Fui um compositor europeu muito famoso", "Continuei compondo mesmo após perder a audição", "Minha 9ª Sinfonia é uma das obras mais conhecidas do mundo"] },

  // Objetos
  { answer: "Guarda-chuva", emoji: "☂️", category: "Objeto", clues: ["Sou um objeto que você carrega na bolsa", "Tenho uma haste e uma cobertura que abre", "Te protejo da chuva"] },
  { answer: "Relógio", emoji: "⏰", category: "Objeto", clues: ["Posso ser encontrado na parede ou no pulso", "Tenho ponteiros ou números digitais", "Minha função é marcar as horas"] },
  { answer: "Espelho", emoji: "🪞", category: "Objeto", clues: ["Sou feito de vidro e metal", "Você me olha todos os dias", "Mostro uma cópia exata de quem está na minha frente"] },
  { answer: "Bússola", emoji: "🧭", category: "Objeto", clues: ["Sou um instrumento de navegação muito antigo", "Tenho uma agulha que se move sozinha", "Sempre aponto para o norte magnético"] },
  { answer: "Telescópio", emoji: "🔭", category: "Objeto", clues: ["Sou um instrumento óptico com lentes", "Galileu me usou para fazer descobertas", "Sirvo para observar estrelas e planetas distantes"] },
  { answer: "Ampulheta", emoji: "⏳", category: "Objeto", clues: ["Sou um objeto com duas partes de vidro", "Areia passa de um lado para o outro dentro de mim", "Fui usada para medir o tempo antes dos relógios"] },

  // Lugares
  { answer: "Torre Eiffel", emoji: "🗼", category: "Lugar", clues: ["Sou uma estrutura de ferro muito alta", "Fui construída para uma exposição mundial em 1889", "Sou o monumento mais visitado de Paris"] },
  { answer: "Amazônia", emoji: "🌳", category: "Lugar", clues: ["Sou a maior do meu tipo no planeta", "Abranjo vários países da América do Sul", "Sou chamada de pulmão do mundo — sou uma floresta tropical"] },
  { answer: "Coliseu", emoji: "🏟️", category: "Lugar", clues: ["Sou uma construção antiga em formato oval", "Gladiadores lutavam dentro de mim", "Fico em Roma e sou uma das 7 maravilhas do mundo moderno"] },
  { answer: "Monte Everest", emoji: "🏔️", category: "Lugar", clues: ["Sou uma formação natural na Ásia", "Tenho quase 9 mil metros de altura", "Sou o ponto mais alto do planeta Terra"] },
  { answer: "Grande Muralha da China", emoji: "🧱", category: "Lugar", clues: ["Sou uma construção com milhares de quilômetros", "Fui construída ao longo de séculos para proteção", "Sou a maior estrutura feita pelo homem e fico na Ásia"] },

  // Alimentos
  { answer: "Chocolate", emoji: "🍫", category: "Alimento", clues: ["Venho de uma semente tropical chamada cacau", "Posso ser amargo, ao leite ou branco", "Sou o doce mais popular do mundo e derreto com calor"] },
  { answer: "Pipoca", emoji: "🍿", category: "Alimento", clues: ["Sou feita de um grão que estoura com calor", "Sou branca e fofinha depois de pronta", "Sou a companheira perfeita para assistir filmes"] },
  { answer: "Mel", emoji: "🍯", category: "Alimento", clues: ["Sou um líquido dourado e viscoso", "Sou produzido por insetos em colmeias", "Sou o único alimento que nunca estraga"] },
  { answer: "Queijo", emoji: "🧀", category: "Alimento", clues: ["Sou feito a partir do leite", "Existo em centenas de variedades pelo mundo", "Minas Gerais é famoso por me produzir no Brasil"] },

  // Invenções / Conceitos
  { answer: "Internet", emoji: "🌐", category: "Invenção", clues: ["Fui criada por militares nos anos 1960", "Conecto bilhões de dispositivos no mundo todo", "Sem mim, você não usaria redes sociais nem buscadores"] },
  { answer: "Roda", emoji: "⚙️", category: "Invenção", clues: ["Sou uma das invenções mais antigas da humanidade", "Tenho formato circular e giro em torno de um eixo", "Sem mim, carros, bicicletas e trens não existiriam"] },
  { answer: "Lâmpada", emoji: "💡", category: "Invenção", clues: ["Fui aperfeiçoada por Thomas Edison", "Transformo eletricidade em algo útil", "Ilumino ambientes quando está escuro"] },
  { answer: "Vacina", emoji: "💉", category: "Invenção", clues: ["Fui desenvolvida para combater doenças", "Edward Jenner criou a primeira contra a varíola", "Treino o sistema imunológico para se defender"] },

  // Personagens fictícios
  { answer: "Sherlock Holmes", emoji: "🔍", category: "Personagem", clues: ["Sou um personagem de livros britânicos", "Moro na Rua Baker 221B em Londres", "Sou o detetive mais famoso da ficção"] },
  { answer: "Peter Pan", emoji: "🧚", category: "Personagem", clues: ["Sou um personagem que nunca envelhece", "Vivo em um lugar mágico com fadas e piratas", "Meu inimigo é o Capitão Gancho"] },
  { answer: "Chapeuzinho Vermelho", emoji: "🧣", category: "Personagem", clues: ["Sou personagem de um conto de fadas europeu", "Vou visitar minha avó levando uma cesta", "No caminho, encontro um lobo malvado na floresta"] },
  { answer: "Robin Hood", emoji: "🏹", category: "Personagem", clues: ["Sou um personagem lendário da Inglaterra medieval", "Sou excelente com arco e flecha", "Roubava dos ricos para dar aos pobres"] },

  // Natureza / Ciência
  { answer: "Lua", emoji: "🌙", category: "Natureza", clues: ["Sou um corpo celeste que não produz luz própria", "Influencio as marés dos oceanos", "Sou o satélite natural da Terra e brilho à noite"] },
  { answer: "Arco-íris", emoji: "🌈", category: "Natureza", clues: ["Apareço no céu em certas condições climáticas", "Sou formado pela refração da luz solar", "Tenho sete cores e apareço depois da chuva"] },
  { answer: "Vulcão", emoji: "🌋", category: "Natureza", clues: ["Sou uma formação geológica com uma abertura no topo", "Posso ficar adormecido por séculos", "Quando entro em erupção, lanço lava e cinzas"] },
  { answer: "DNA", emoji: "🧬", category: "Ciência", clues: ["Existo dentro de quase todas as células vivas", "Tenho formato de dupla hélice", "Carrego as instruções genéticas de cada ser vivo"] },
  { answer: "Oxigênio", emoji: "💨", category: "Ciência", clues: ["Sou um elemento químico essencial", "Estou presente no ar que você respira", "Sem mim, não haveria fogo nem vida humana"] },
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
