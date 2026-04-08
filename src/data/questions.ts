export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
  emoji: string;
}

export type AgeGroup = 'crianca' | 'juvenil' | 'adulto';

export const AGE_GROUP_INFO: Record<AgeGroup, { emoji: string; name: string; age: string; desc: string; diffLabel: string }> = {
  crianca: { emoji: '👶', name: 'Criança', age: '5 – 8 anos', desc: 'Animais, cores, natureza, números', diffLabel: 'Fácil' },
  juvenil: { emoji: '🧒', name: 'Juvenil', age: '9 – 12 anos', desc: 'Geografia, ciências, história, arte', diffLabel: 'Médio' },
  adulto: { emoji: '🧑', name: 'Adulto', age: '13+ anos', desc: 'Cultura geral, ciências, história', diffLabel: 'Difícil' },
};

export const ARREMATE_QUESTIONS: Record<AgeGroup, QuizQuestion[]> = {
  crianca: [
    { q: "Quantas patas tem um cachorro?", options: ["2","4","6","8"], correct: 1, emoji: "🐶" },
    { q: "Qual a cor do céu em um dia ensolarado?", options: ["Verde","Amarelo","Azul","Vermelho"], correct: 2, emoji: "☀️" },
    { q: "O que a vaca nos dá?", options: ["Mel","Lã","Leite","Ovos"], correct: 2, emoji: "🐄" },
    { q: "Qual desses é um fruto?", options: ["Cenoura","Batata","Banana","Alface"], correct: 2, emoji: "🍌" },
    { q: "Quantos dias tem uma semana?", options: ["5","6","7","8"], correct: 2, emoji: "📅" },
    { q: "O que a abelha produz?", options: ["Leite","Mel","Suco","Queijo"], correct: 1, emoji: "🐝" },
    { q: "Qual animal tem tromba?", options: ["Girafa","Leão","Elefante","Zebra"], correct: 2, emoji: "🐘" },
    { q: "Qual cor mistura amarelo e azul?", options: ["Roxo","Laranja","Verde","Marrom"], correct: 2, emoji: "🎨" },
    { q: "Quantos meses tem um ano?", options: ["10","11","12","13"], correct: 2, emoji: "🗓️" },
    { q: "Onde vivem os peixes?", options: ["No ar","Na terra","Na água","No fogo"], correct: 2, emoji: "🐟" },
    { q: "Qual o planeta onde vivemos?", options: ["Marte","Júpiter","Vênus","Terra"], correct: 3, emoji: "🌍" },
    { q: "Qual animal faz 'miau'?", options: ["Cachorro","Gato","Vaca","Pato"], correct: 1, emoji: "🐱" },
    { q: "Quantos lados tem um triângulo?", options: ["2","3","4","5"], correct: 1, emoji: "📐" },
    { q: "O arco-íris tem quantas cores?", options: ["5","6","7","8"], correct: 2, emoji: "🌈" },
    { q: "Qual animal vive na Antártida?", options: ["Leão","Pinguim","Tigre","Zebra"], correct: 1, emoji: "🐧" },
    { q: "Quantos zeros tem o número cem?", options: ["1","2","3","4"], correct: 1, emoji: "💯" },
    { q: "O que a galinha produz?", options: ["Leite","Lã","Ovos","Mel"], correct: 2, emoji: "🐔" },
    { q: "Qual a cor da grama?", options: ["Amarela","Azul","Verde","Vermelha"], correct: 2, emoji: "🌿" },
    { q: "Quantos dedos tem uma mão?", options: ["4","5","6","7"], correct: 1, emoji: "✋" },
    { q: "Qual desses voa?", options: ["Peixe","Cobra","Passarinho","Sapo"], correct: 2, emoji: "🐦" },
  ],
  juvenil: [
    { q: "Qual é a capital do Brasil?", options: ["São Paulo","Rio de Janeiro","Brasília","Salvador"], correct: 2, emoji: "🇧🇷" },
    { q: "Qual planeta é o maior do sistema solar?", options: ["Saturno","Marte","Júpiter","Urano"], correct: 2, emoji: "🪐" },
    { q: "Quanto é 15 × 8?", options: ["100","110","120","130"], correct: 2, emoji: "🔢" },
    { q: "Qual o maior oceano do mundo?", options: ["Atlântico","Índico","Ártico","Pacífico"], correct: 3, emoji: "🌊" },
    { q: "Em que país fica a Torre Eiffel?", options: ["Itália","Espanha","França","Portugal"], correct: 2, emoji: "🗼" },
    { q: "Qual o processo pelo qual plantas fazem alimento?", options: ["Respiração","Fotossíntese","Digestão","Fermentação"], correct: 1, emoji: "🌿" },
    { q: "Quem escreveu Dom Casmurro?", options: ["José de Alencar","Machado de Assis","Clarice Lispector","Carlos Drummond"], correct: 1, emoji: "📚" },
    { q: "Qual o menor planeta do sistema solar?", options: ["Vênus","Marte","Mercúrio","Plutão"], correct: 2, emoji: "🪐" },
    { q: "Quantos estados tem o Brasil?", options: ["25","26","27","28"], correct: 2, emoji: "🗺️" },
    { q: "Qual é a fórmula da água?", options: ["CO₂","H₂O","O₂","NaCl"], correct: 1, emoji: "💧" },
    { q: "Qual instrumento tem 88 teclas?", options: ["Violão","Flauta","Piano","Bateria"], correct: 2, emoji: "🎹" },
    { q: "Quem pintou a Mona Lisa?", options: ["Picasso","Michelangelo","Leonardo da Vinci","Rafael"], correct: 2, emoji: "🎨" },
    { q: "Quantos ossos tem o corpo humano adulto?", options: ["186","206","226","246"], correct: 1, emoji: "🦴" },
    { q: "Qual é o maior país do mundo em área?", options: ["China","EUA","Brasil","Rússia"], correct: 3, emoji: "🗺️" },
    { q: "Quem foi o primeiro homem na Lua?", options: ["Buzz Aldrin","Neil Armstrong","Yuri Gagarin","John Glenn"], correct: 1, emoji: "🚀" },
  ],
  adulto: [
    { q: "Qual é o maior órgão do corpo humano?", options: ["Fígado","Pulmão","Cérebro","Pele"], correct: 3, emoji: "🫀" },
    { q: "Em que ano acabou a Segunda Guerra Mundial?", options: ["1943","1944","1945","1946"], correct: 2, emoji: "📜" },
    { q: "Qual elemento tem símbolo 'Au' na tabela periódica?", options: ["Alumínio","Prata","Ouro","Cobre"], correct: 2, emoji: "⚗️" },
    { q: "Quem escreveu 'Cem Anos de Solidão'?", options: ["Pablo Neruda","Gabriel García Márquez","Jorge Luis Borges","Isabel Allende"], correct: 1, emoji: "📚" },
    { q: "Qual é a capital da Austrália?", options: ["Sydney","Melbourne","Brisbane","Camberra"], correct: 3, emoji: "🇦🇺" },
    { q: "Qual filósofo disse 'penso, logo existo'?", options: ["Platão","Aristóteles","Descartes","Kant"], correct: 2, emoji: "🧠" },
    { q: "Quantos cromossomos tem uma célula humana normal?", options: ["23","44","46","48"], correct: 2, emoji: "🔬" },
    { q: "Qual país tem o maior PIB do mundo?", options: ["China","Japão","EUA","Alemanha"], correct: 2, emoji: "💰" },
    { q: "Em que ano foi proclamada a República no Brasil?", options: ["1888","1889","1890","1891"], correct: 1, emoji: "🇧🇷" },
    { q: "Quem pintou 'A Noite Estrelada'?", options: ["Monet","Picasso","Van Gogh","Dalí"], correct: 2, emoji: "🎨" },
    { q: "Qual é o rio mais longo do mundo?", options: ["Amazonas","Nilo","Mississippi","Yangtze"], correct: 1, emoji: "🌊" },
    { q: "Em que ano o homem foi à Lua pela primeira vez?", options: ["1965","1967","1969","1971"], correct: 2, emoji: "🚀" },
    { q: "Qual é o menor país do mundo?", options: ["Mônaco","San Marino","Liechtenstein","Vaticano"], correct: 3, emoji: "🏛️" },
    { q: "Quantas sinfonias Beethoven compôs?", options: ["7","8","9","10"], correct: 2, emoji: "🎵" },
    { q: "Qual é o nome científico do ser humano?", options: ["Homo sapiens","Homo erectus","Homo habilis","Homo neanderthalensis"], correct: 0, emoji: "🧬" },
  ],
};
