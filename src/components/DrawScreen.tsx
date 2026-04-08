import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Difficulty } from '@/data/words';
import { getDrawWords, shuffle } from '@/data/words';

interface DrawScreenProps {
  difficulty: Difficulty;
  onHome: () => void;
  onFinish: (result: { score: number; total: number }) => void;
  onFeedback: (emoji: string) => void;
}

type Phase = 'reveal' | 'drawing' | 'result';

export default function DrawScreen({ difficulty, onHome, onFinish, onFeedback }: DrawScreenProps) {
  const [words, setWords] = useState<string[]>([]);
  const [wordIdx, setWordIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<Phase>('reveal');
  const [timer, setTimer] = useState(60);
  const [wordVisible, setWordVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const pool = shuffle(getDrawWords(difficulty)).slice(0, 5);
    setWords(pool);
  }, [difficulty]);

  useEffect(() => {
    if (phase !== 'drawing') return;
    setTimer(60);
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setPhase('result');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  const word = words[wordIdx];
  if (!word) return null;

  const startDrawing = () => {
    setPhase('drawing');
  };

  const handleResult = (correct: boolean) => {
    clearInterval(timerRef.current);
    const newScore = correct ? score + 10 : score;
    if (correct) { setScore(newScore); onFeedback('🎨'); }
    else { onFeedback('😅'); }

    const nextIdx = wordIdx + 1;
    if (nextIdx >= words.length) {
      setTimeout(() => onFinish({ score: newScore, total: words.length }), 600);
    } else {
      setTimeout(() => {
        setWordIdx(nextIdx);
        setPhase('reveal');
        setWordVisible(false);
      }, 600);
    }
  };

  const circumference = 2 * Math.PI * 34;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 flex flex-col min-h-[100dvh] py-4"
    >
      <div className="flex items-center justify-between mb-4">
        <button onClick={onHome} className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-secondary">← Início</button>
        <h2 className="font-display text-lg text-foreground">🎨 Desenha & Adivinha</h2>
        <div className="text-sm font-bold text-muted-foreground">Pts: <span className="text-primary">{score}</span></div>
      </div>

      <div className="text-center text-sm font-bold text-muted-foreground mb-2">
        Palavra {wordIdx + 1} de {words.length}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        {phase === 'reveal' && (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-6 text-center">
            <div className="text-6xl">🎨</div>
            <p className="text-muted-foreground font-semibold">Um jogador vê a palavra e desenha/mima.<br />Os outros tentam adivinhar!</p>
            {wordVisible ? (
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-card border-2 border-primary rounded-2xl p-6 shadow-glow">
                <p className="text-xs text-muted-foreground mb-1">A palavra é:</p>
                <h2 className="font-display text-3xl text-primary">{word}</h2>
              </motion.div>
            ) : (
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => setWordVisible(true)}
                className="px-6 py-3 bg-card border-2 border-border rounded-xl font-bold text-foreground shadow-game hover:border-primary transition-all">
                👁 Mostrar Palavra
              </motion.button>
            )}
            {wordVisible && (
              <motion.button whileTap={{ scale: 0.95 }} onClick={startDrawing}
                className="px-8 py-3.5 bg-gradient-to-br from-primary to-game-orange-dark text-primary-foreground rounded-full font-display text-lg shadow-glow">
                ⏱ Começar Timer!
              </motion.button>
            )}
          </motion.div>
        )}

        {phase === 'drawing' && (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-6">
            <div className={`relative w-24 h-24 ${timer <= 10 ? 'animate-timer-pulse' : ''}`}>
              <svg viewBox="0 0 76 76" className="w-24 h-24">
                <circle cx="38" cy="38" r="34" fill="none" stroke="hsl(var(--border))" strokeWidth="5" />
                <circle cx="38" cy="38" r="34" fill="none"
                  stroke={timer <= 10 ? 'hsl(var(--game-red))' : 'hsl(var(--primary))'}
                  strokeWidth="5" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - timer / 60)}
                  strokeLinecap="round" transform="rotate(-90 38 38)" className="transition-all duration-1000" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-display text-2xl"
                style={{ color: timer <= 10 ? 'hsl(var(--game-red))' : 'hsl(var(--primary))' }}>
                {timer}
              </span>
            </div>
            <p className="text-lg font-bold text-muted-foreground">Desenha ou mima agora!</p>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => { clearInterval(timerRef.current); setPhase('result'); }}
              className="px-6 py-2.5 bg-card border-2 border-border rounded-xl font-bold text-muted-foreground hover:border-accent transition-all">
              Parar Timer
            </motion.button>
          </motion.div>
        )}

        {phase === 'result' && (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-4 text-center">
            <div className="text-5xl">🎨</div>
            <h2 className="font-display text-2xl text-foreground">A palavra era:</h2>
            <div className="font-display text-4xl text-primary">{word}</div>
            <div className="flex gap-3 mt-2">
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleResult(true)}
                className="flex-1 py-3 px-6 rounded-xl font-bold text-primary-foreground bg-game-green shadow-md">
                ✅ Acertaram!
              </motion.button>
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleResult(false)}
                className="flex-1 py-3 px-6 rounded-xl font-bold text-primary-foreground bg-game-red shadow-md">
                ❌ Não acertaram
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
