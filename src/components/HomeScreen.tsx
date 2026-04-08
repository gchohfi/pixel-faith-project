import { motion } from 'framer-motion';
import type { GameMode, Difficulty } from '@/data/words';

interface HomeScreenProps {
  mode: GameMode;
  difficulty: Difficulty;
  onModeChange: (mode: GameMode) => void;
  onDifficultyChange: (diff: Difficulty) => void;
  onStartGame: () => void;
  onStartArremate: () => void;
}

const MODES: { id: GameMode; icon: string; name: string; desc: string }[] = [
  { id: 'classic', icon: '🎯', name: 'Clássico', desc: '10 dicas, adivinhe a palavra' },
  { id: 'speed', icon: '⚡', name: 'Contra o Relógio', desc: '60 segundos para adivinhar' },
  { id: 'battle', icon: '⚔️', name: 'Batalha', desc: 'Equipes competindo' },
  { id: 'draw', icon: '🎨', name: 'Desenha & Adivinha', desc: 'Gestos e mímica' },
];

const DIFFICULTIES: { id: Difficulty; emoji: string; label: string }[] = [
  { id: 'easy', emoji: '🌱', label: 'Fácil' },
  { id: 'medium', emoji: '🔥', label: 'Médio' },
  { id: 'hard', emoji: '💀', label: 'Difícil' },
];

export default function HomeScreen({ mode, difficulty, onModeChange, onDifficultyChange, onStartGame, onStartArremate }: HomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 flex flex-col items-center gap-6 pt-6 pb-8"
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, type: 'spring' }}
        className="flex flex-col items-center gap-2"
      >
        <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="38" fill="hsl(var(--primary))" opacity="0.15" />
          <circle cx="40" cy="40" r="28" fill="hsl(var(--primary))" opacity="0.25" />
          <text x="40" y="53" textAnchor="middle" fontFamily="'Fredoka One'" fontSize="34" fill="hsl(var(--primary))">?</text>
          <path d="M12 40 Q16 28 28 24" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
          <path d="M68 40 Q64 28 52 24" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        </svg>
        <h1 className="font-display text-4xl leading-tight text-center text-foreground">
          Adivinha<br /><span className="text-primary">em Família!</span>
        </h1>
      </motion.div>

      <p className="text-muted-foreground font-semibold text-center">O jogo perfeito para o jantar 🍽️</p>

      {/* Section: Modos */}
      <div className="text-sm font-bold text-muted-foreground">🎮 Modos de Adivinhação</div>

      <div className="grid grid-cols-2 gap-3 w-full">
        {MODES.map((m, i) => (
          <motion.button
            key={m.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.06 }}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onModeChange(m.id)}
            className={`
              text-left p-4 rounded-xl border-2 transition-colors shadow-game
              ${mode === m.id
                ? 'border-primary bg-secondary shadow-glow'
                : 'border-border bg-card hover:border-primary/50'}
            `}
          >
            <div className="text-3xl mb-1">{m.icon}</div>
            <div className="font-extrabold text-sm text-foreground">{m.name}</div>
            <div className="text-xs text-muted-foreground leading-tight mt-0.5">{m.desc}</div>
          </motion.button>
        ))}
      </div>

      {/* Difficulty */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <span className="font-bold text-sm text-muted-foreground">Dificuldade:</span>
        {DIFFICULTIES.map((d) => (
          <motion.button
            key={d.id}
            whileTap={{ scale: 0.93 }}
            onClick={() => onDifficultyChange(d.id)}
            className={`
              px-4 py-1.5 rounded-full border-2 text-sm font-bold transition-all
              ${difficulty === d.id
                ? 'border-primary bg-primary text-primary-foreground shadow-glow'
                : 'border-border bg-card text-muted-foreground hover:border-primary hover:text-primary'}
            `}
          >
            {d.emoji} {d.label}
          </motion.button>
        ))}
      </div>

      {/* Play button */}
      <motion.button
        whileHover={{ y: -3, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStartGame}
        className="flex items-center gap-3 bg-gradient-to-br from-primary to-game-orange-dark text-primary-foreground font-display text-2xl px-10 py-4 rounded-full shadow-glow transition-shadow hover:shadow-[0_10px_28px_hsla(var(--primary)/0.5)]"
      >
        <span>Jogar Agora!</span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
      </motion.button>

      {/* Divider */}
      <div className="flex items-center gap-3 w-full">
        <div className="flex-1 h-px bg-border" />
        <span className="text-sm font-bold text-muted-foreground">ou</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* ARremate */}
      <div className="text-sm font-bold text-muted-foreground">🏆 Quiz ARremate</div>
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStartArremate}
        className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-border bg-card shadow-game hover:border-accent hover:shadow-[0_0_0_3px_hsla(var(--accent)/0.15)] transition-all"
      >
        <div className="text-3xl">🏆</div>
        <div className="flex-1 text-left">
          <div className="font-extrabold text-foreground">ARremate</div>
          <div className="text-xs text-muted-foreground">Quiz de perguntas por faixa etária · 4 alternativas · timer</div>
        </div>
        <div className="text-xl text-muted-foreground">→</div>
      </motion.button>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap justify-center">
        {['✓ Offline', '✓ Toda a família', '✓ +300 palavras', '✓ +75 perguntas'].map(t => (
          <span key={t} className="text-xs font-semibold text-muted-foreground bg-secondary px-3 py-1 rounded-full">{t}</span>
        ))}
      </div>
    </motion.div>
  );
}
