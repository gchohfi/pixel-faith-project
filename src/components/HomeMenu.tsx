import { motion } from 'framer-motion';

interface GameInfo {
  id: string;
  icon: string;
  name: string;
  desc: string;
  color: string;
  bgColor: string;
}

const GAMES: GameInfo[] = [
  { id: 'adivinha', icon: '🎯', name: 'Adivinhação', desc: '10 dicas para adivinhar a palavra secreta', color: 'hsl(var(--primary))', bgColor: 'hsla(var(--primary) / 0.1)' },
  { id: 'stop', icon: '✏️', name: 'Stop!', desc: 'Categorias e letras — clássico da família', color: 'hsl(var(--game-teal))', bgColor: 'hsla(var(--game-teal) / 0.1)' },
  { id: 'arremate', icon: '🏆', name: 'ARremate', desc: 'Quiz por faixa etária com timer', color: 'hsl(var(--accent))', bgColor: 'hsla(var(--accent) / 0.1)' },
  { id: 'batalha', icon: '⚔️', name: 'Batalha', desc: 'Equipes competindo por dicas', color: 'hsl(var(--game-red))', bgColor: 'hsla(var(--game-red) / 0.1)' },
  { id: 'desenha', icon: '🎨', name: 'Desenha', desc: 'Desenhe ou mime para os outros adivinharem', color: 'hsl(var(--game-yellow))', bgColor: 'hsla(var(--game-yellow) / 0.1)' },
];

interface HomeMenuProps {
  onSelectGame: (gameId: string) => void;
}

export default function HomeMenu({ onSelectGame }: HomeMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 flex flex-col items-center gap-6 pt-8 pb-8"
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, type: 'spring' }}
        className="flex flex-col items-center gap-1"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-glow rotate-3">
          <span className="font-display text-3xl text-primary-foreground">?!</span>
        </div>
        <h1 className="font-display text-3xl leading-tight text-center text-foreground mt-3">
          Jogos em<br /><span className="text-primary">Família</span>
        </h1>
        <p className="text-muted-foreground font-semibold text-sm text-center mt-1">
          Mini-jogos para jogar juntos 🎲
        </p>
      </motion.div>

      {/* Games grid */}
      <div className="w-full flex flex-col gap-3 mt-2">
        {GAMES.map((game, i) => (
          <motion.button
            key={game.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.06 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectGame(game.id)}
            className="flex items-center gap-4 p-4 rounded-xl border-2 border-border bg-card hover:border-primary/50 transition-all text-left group"
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0 transition-transform group-hover:scale-110"
              style={{ backgroundColor: game.bgColor }}
            >
              {game.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-foreground text-base">{game.name}</div>
              <div className="text-xs text-muted-foreground leading-tight mt-0.5">{game.desc}</div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-muted-foreground shrink-0 group-hover:text-primary transition-colors">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>
        ))}
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap justify-center mt-2">
        {['Offline', '1 celular', '+300 palavras', '+400 perguntas'].map(t => (
          <span key={t} className="text-xs font-semibold text-muted-foreground bg-secondary px-3 py-1.5 rounded-lg">
            ✓ {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
