import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StopGameProps {
  onHome: () => void;
  onFinish: (result: { scores: number[]; playerCount: number; letter: string }) => void;
  onFeedback: (emoji: string) => void;
}

const CATEGORIES = [
  { name: 'Animal', emoji: '🐾' },
  { name: 'Comida', emoji: '🍕' },
  { name: 'Lugar/Cidade', emoji: '🌍' },
  { name: 'Nome próprio', emoji: '👤' },
  { name: 'Objeto', emoji: '📦' },
  { name: 'Profissão', emoji: '👷' },
];

const LETTERS = 'ABCDEFGHIJLMNOPRSTV'.split('');

type Phase = 'setup' | 'playing' | 'scoring' | 'results';

export default function StopGame({ onHome, onFinish, onFeedback }: StopGameProps) {
  const [phase, setPhase] = useState<Phase>('setup');
  const [playerCount, setPlayerCount] = useState(2);
  const [letter, setLetter] = useState('');
  const [timer, setTimer] = useState(60);
  const [timeLimit, setTimeLimit] = useState(60);
  const [scores, setScores] = useState<number[][]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  const pickLetter = useCallback(() => {
    setSpinning(true);
    let count = 0;
    const interval = setInterval(() => {
      setLetter(LETTERS[Math.floor(Math.random() * LETTERS.length)]);
      count++;
      if (count > 15) {
        clearInterval(interval);
        const final = LETTERS[Math.floor(Math.random() * LETTERS.length)];
        setLetter(final);
        setSpinning(false);
      }
    }, 80);
  }, []);

  const startRound = () => {
    if (!letter || spinning) return;
    setPhase('playing');
    setTimer(timeLimit);
  };

  useEffect(() => {
    if (phase !== 'playing') return;
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setPhase('scoring');
          setScores(Array.from({ length: playerCount }, () => Array(CATEGORIES.length).fill(0)));
          setCurrentPlayer(0);
          setCurrentCategory(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase, timeLimit, playerCount]);

  const stopEarly = () => {
    clearInterval(timerRef.current);
    onFeedback('✋');
    setPhase('scoring');
    setScores(Array.from({ length: playerCount }, () => Array(CATEGORIES.length).fill(0)));
    setCurrentPlayer(0);
    setCurrentCategory(0);
  };

  const markAnswer = (points: number) => {
    const newScores = scores.map(row => [...row]);
    newScores[currentPlayer][currentCategory] = points;
    setScores(newScores);

    // Advance
    let nextPlayer = currentPlayer + 1;
    let nextCategory = currentCategory;
    if (nextPlayer >= playerCount) {
      nextPlayer = 0;
      nextCategory = currentCategory + 1;
    }

    if (nextCategory >= CATEGORIES.length) {
      // All done
      onFeedback('🏆');
      setPhase('results');
    } else {
      setCurrentPlayer(nextPlayer);
      setCurrentCategory(nextCategory);
    }
  };

  const totals = scores.map(row => row.reduce((a, b) => a + b, 0));

  const circumference = 2 * Math.PI * 40;
  const timerPct = timer / timeLimit;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 flex flex-col min-h-[100dvh] py-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={onHome} className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-secondary">
          ← Menu
        </button>
        <h2 className="font-display text-lg text-foreground">✏️ Stop!</h2>
        <div />
      </div>

      {/* SETUP */}
      {phase === 'setup' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center gap-6 pt-4">
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between bg-card border-2 border-border rounded-xl p-4">
              <span className="font-bold text-foreground">Jogadores</span>
              <div className="flex items-center gap-3">
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => setPlayerCount(Math.max(2, playerCount - 1))}
                  className="w-9 h-9 rounded-lg bg-secondary font-bold text-lg text-foreground flex items-center justify-center">−</motion.button>
                <span className="font-display text-2xl text-primary w-8 text-center">{playerCount}</span>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => setPlayerCount(Math.min(6, playerCount + 1))}
                  className="w-9 h-9 rounded-lg bg-secondary font-bold text-lg text-foreground flex items-center justify-center">+</motion.button>
              </div>
            </div>

            <div className="flex items-center justify-between bg-card border-2 border-border rounded-xl p-4">
              <span className="font-bold text-foreground">Tempo</span>
              <div className="flex gap-2">
                {[30, 60, 90].map(t => (
                  <motion.button key={t} whileTap={{ scale: 0.95 }}
                    onClick={() => setTimeLimit(t)}
                    className={`px-3 py-1.5 rounded-lg font-bold text-sm transition-all ${
                      timeLimit === t
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-muted-foreground hover:text-foreground'
                    }`}>
                    {t}s
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Letter picker */}
          <div className="flex flex-col items-center gap-4 mt-4">
            <p className="text-sm font-bold text-muted-foreground">Letra da rodada</p>
            <motion.div
              animate={spinning ? { rotate: [0, 360] } : {}}
              transition={spinning ? { duration: 0.3, repeat: Infinity } : {}}
              className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center shadow-glow"
            >
              <span className="font-display text-5xl text-primary-foreground">
                {letter || '?'}
              </span>
            </motion.div>
            <motion.button whileTap={{ scale: 0.95 }} onClick={pickLetter}
              disabled={spinning}
              className="px-6 py-2.5 bg-card border-2 border-border rounded-xl font-bold text-foreground hover:border-primary transition-all disabled:opacity-50">
              🎲 Sortear Letra
            </motion.button>
          </div>

          {/* Categories preview */}
          <div className="w-full">
            <p className="text-sm font-bold text-muted-foreground mb-2">Categorias desta rodada:</p>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map(cat => (
                <div key={cat.name} className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
                  <span className="text-lg">{cat.emoji}</span>
                  <span className="text-sm font-bold text-foreground">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>

          {letter && !spinning && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.97 }}
              onClick={startRound}
              className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-display text-xl shadow-glow mt-2"
            >
              ▶ Começar!
            </motion.button>
          )}
        </motion.div>
      )}

      {/* PLAYING */}
      {phase === 'playing' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center gap-6">
          {/* Timer circle */}
          <div className={`relative w-28 h-28 ${timer <= 10 ? 'animate-timer-pulse' : ''}`}>
            <svg viewBox="0 0 90 90" className="w-28 h-28">
              <circle cx="45" cy="45" r="40" fill="none" stroke="hsl(var(--border))" strokeWidth="5" />
              <circle cx="45" cy="45" r="40" fill="none"
                stroke={timer <= 10 ? 'hsl(var(--game-red))' : timer <= 20 ? 'hsl(var(--game-yellow))' : 'hsl(var(--primary))'}
                strokeWidth="5" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - timerPct)}
                strokeLinecap="round" transform="rotate(-90 45 45)" className="transition-all duration-1000" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-display text-3xl"
              style={{ color: timer <= 10 ? 'hsl(var(--game-red))' : 'hsl(var(--primary))' }}>
              {timer}
            </span>
          </div>

          {/* Letter display */}
          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-glow">
            <span className="font-display text-4xl text-primary-foreground">{letter}</span>
          </div>

          {/* Categories */}
          <div className="w-full grid grid-cols-2 gap-2">
            {CATEGORIES.map(cat => (
              <div key={cat.name} className="flex items-center gap-2 bg-card border-2 border-border rounded-xl px-4 py-3">
                <span className="text-xl">{cat.emoji}</span>
                <span className="font-bold text-foreground text-sm">{cat.name}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground font-semibold text-center">
            Todos escrevem palavras com a letra <span className="text-primary font-display text-lg">{letter}</span> para cada categoria!
          </p>

          <motion.button whileTap={{ scale: 0.95 }} onClick={stopEarly}
            className="w-full py-4 bg-destructive text-destructive-foreground rounded-xl font-display text-xl mt-auto">
            ✋ STOP!
          </motion.button>
        </motion.div>
      )}

      {/* SCORING */}
      {phase === 'scoring' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col gap-4">
          <div className="text-center">
            <p className="text-sm font-bold text-muted-foreground">Pontuação — Letra <span className="text-primary font-display text-lg">{letter}</span></p>
            <p className="text-xs text-muted-foreground mt-1">
              Jogador {currentPlayer + 1} · {CATEGORIES[currentCategory].emoji} {CATEGORIES[currentCategory].name}
            </p>
          </div>

          <div className="bg-card border-2 border-border rounded-xl p-5 text-center">
            <p className="text-lg font-bold text-foreground mb-1">
              Jogador {currentPlayer + 1}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              {CATEGORIES[currentCategory].emoji} {CATEGORIES[currentCategory].name} com <span className="text-primary font-display">{letter}</span>
            </p>

            <div className="flex flex-col gap-2">
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => markAnswer(10)}
                className="py-3 rounded-xl font-bold text-primary-foreground bg-game-green transition-all">
                ✅ Resposta única (10 pts)
              </motion.button>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => markAnswer(5)}
                className="py-3 rounded-xl font-bold text-primary-foreground bg-game-yellow transition-all">
                🤝 Resposta repetida (5 pts)
              </motion.button>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => markAnswer(0)}
                className="py-3 rounded-xl font-bold text-muted-foreground bg-secondary border-2 border-border transition-all">
                ❌ Sem resposta (0 pts)
              </motion.button>
            </div>
          </div>

          {/* Progress */}
          <div className="w-full h-2 bg-border rounded-full overflow-hidden">
            <motion.div className="h-full bg-primary rounded-full"
              animate={{ width: `${((currentCategory * playerCount + currentPlayer) / (CATEGORIES.length * playerCount)) * 100}%` }}
            />
          </div>
        </motion.div>
      )}

      {/* RESULTS */}
      {phase === 'results' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center gap-5 pt-4">
          <div className="text-6xl">🏆</div>
          <h2 className="font-display text-2xl text-foreground">Resultado — Letra {letter}</h2>

          <div className="w-full bg-card border-2 border-border rounded-xl overflow-hidden">
            {totals
              .map((total, idx) => ({ total, idx }))
              .sort((a, b) => b.total - a.total)
              .map((entry, rank) => (
                <div key={entry.idx} className={`flex items-center justify-between px-4 py-3 border-b border-border last:border-0 ${rank === 0 ? 'bg-primary/5' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-lg">{rank === 0 ? '🥇' : rank === 1 ? '🥈' : rank === 2 ? '🥉' : `${rank + 1}º`}</span>
                    <span className="font-bold text-foreground">Jogador {entry.idx + 1}</span>
                  </div>
                  <span className="font-display text-xl text-primary">{entry.total} pts</span>
                </div>
              ))}
          </div>

          <div className="flex gap-3 w-full mt-2">
            <motion.button whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase('setup');
                setLetter('');
                setScores([]);
              }}
              className="flex-1 py-3.5 bg-primary text-primary-foreground rounded-xl font-display text-base shadow-glow">
              🔄 Nova Rodada
            </motion.button>
            <motion.button whileTap={{ scale: 0.95 }} onClick={onHome}
              className="py-3.5 px-5 bg-card border-2 border-border text-muted-foreground rounded-xl font-bold hover:border-primary transition-all">
              🏠 Menu
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
