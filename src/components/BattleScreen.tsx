import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Difficulty } from '@/data/words';
import { getWords, shuffle } from '@/data/words';
import type { WordEntry } from '@/data/words';

interface BattleScreenProps {
  difficulty: Difficulty;
  onHome: () => void;
  onFinish: (result: { ptsA: number; ptsB: number; total: number }) => void;
  onFeedback: (emoji: string) => void;
}

export default function BattleScreen({ difficulty, onHome, onFinish, onFeedback }: BattleScreenProps) {
  const [words, setWords] = useState<WordEntry[]>([]);
  const [wordIdx, setWordIdx] = useState(0);
  const [clueIdx, setClueIdx] = useState(0);
  const [ptsA, setPtsA] = useState(0);
  const [ptsB, setPtsB] = useState(0);
  const [currentTeam, setCurrentTeam] = useState<'a' | 'b'>('a');
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const pool = shuffle(getWords(difficulty)).slice(0, 6);
    setWords(pool);
  }, [difficulty]);

  const entry = words[wordIdx];
  if (!entry) return null;

  const nextClue = () => {
    const next = clueIdx + 1;
    if (next >= entry.clues.length) {
      setRevealed(true);
      return;
    }
    setClueIdx(next);
  };

  const scoreTeam = (team: 'a' | 'b' | 'none') => {
    const pts = Math.max(10 - clueIdx, 1);
    let newA = ptsA, newB = ptsB;
    if (team === 'a') { newA += pts; setPtsA(newA); onFeedback('🔴'); }
    else if (team === 'b') { newB += pts; setPtsB(newB); onFeedback('🔵'); }
    else { onFeedback('😅'); }

    const nextTeam = currentTeam === 'a' ? 'b' : 'a';
    const nextIdx = wordIdx + 1;

    setTimeout(() => {
      if (nextIdx >= words.length) {
        onFinish({ ptsA: newA, ptsB: newB, total: words.length });
      } else {
        setWordIdx(nextIdx);
        setClueIdx(0);
        setRevealed(false);
        setCurrentTeam(nextTeam);
      }
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 flex flex-col min-h-[100dvh] py-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={onHome} className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-secondary">← Início</button>
        <h2 className="font-display text-lg text-foreground">⚔️ Batalha</h2>
        <div />
      </div>

      {/* Scores */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <motion.div
          animate={{ scale: currentTeam === 'a' ? 1.05 : 1, opacity: currentTeam === 'a' ? 1 : 0.7 }}
          className={`flex-1 text-center p-3 rounded-xl border-2 transition-colors ${currentTeam === 'a' ? 'border-game-red bg-game-red/10' : 'border-border'}`}
        >
          <div className="text-sm font-bold text-foreground">🔴 Equipe A</div>
          <div className="font-display text-2xl text-game-red">{ptsA}</div>
        </motion.div>
        <div className="font-display text-muted-foreground text-lg">VS</div>
        <motion.div
          animate={{ scale: currentTeam === 'b' ? 1.05 : 1, opacity: currentTeam === 'b' ? 1 : 0.7 }}
          className={`flex-1 text-center p-3 rounded-xl border-2 transition-colors ${currentTeam === 'b' ? 'border-game-blue bg-game-blue/10' : 'border-border'}`}
        >
          <div className="text-sm font-bold text-foreground">🔵 Equipe B</div>
          <div className="font-display text-2xl text-game-blue">{ptsB}</div>
        </motion.div>
      </div>

      <div className="text-center text-sm font-bold text-muted-foreground mb-3">
        Vez de: <span className="text-foreground">{currentTeam === 'a' ? 'Equipe A 🔴' : 'Equipe B 🔵'}</span>
      </div>

      {/* Clue area */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="text-xs font-bold text-muted-foreground text-center">
          Dica {clueIdx + 1} de {entry.clues.length}
        </div>
        <div className="flex gap-1 justify-center flex-wrap">
          {entry.clues.map((_, i) => (
            <div key={i} className={`w-7 h-2 rounded-full transition-colors duration-300 ${
              i < clueIdx ? 'bg-primary' : i === clueIdx ? 'bg-game-orange-light animate-pulse' : 'bg-border'
            }`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${wordIdx}-${clueIdx}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-card border-2 border-border rounded-2xl p-6 shadow-game flex flex-col items-center gap-3 min-h-[120px] justify-center"
          >
            <p className="text-base font-bold text-center text-foreground">{entry.clues[clueIdx]}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Actions */}
      {!revealed ? (
        <div className="flex gap-3 mt-3">
          <motion.button whileTap={{ scale: 0.96 }} onClick={nextClue}
            className="flex-1 py-3.5 bg-gradient-to-br from-primary to-game-orange-dark text-primary-foreground rounded-xl font-extrabold shadow-glow">
            Próxima Dica →
          </motion.button>
          <motion.button whileTap={{ scale: 0.96 }} onClick={() => setRevealed(true)}
            className="py-3.5 px-4 bg-card border-2 border-border text-muted-foreground rounded-xl font-bold text-sm hover:border-accent hover:text-accent transition-all">
            👁
          </motion.button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border-2 border-border rounded-2xl p-5 text-center shadow-game-lg mt-3"
        >
          <div className="text-4xl mb-1">{entry.emoji}</div>
          <h2 className="font-display text-2xl text-foreground mb-3">{entry.word}</h2>
          <div className="flex gap-2">
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => scoreTeam('a')}
              className="flex-1 py-2.5 rounded-xl font-bold text-primary-foreground bg-game-red shadow-md">🔴 Equipe A</motion.button>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => scoreTeam('b')}
              className="flex-1 py-2.5 rounded-xl font-bold text-primary-foreground bg-game-blue shadow-md">🔵 Equipe B</motion.button>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => scoreTeam('none')}
              className="py-2.5 px-3 rounded-xl font-bold text-muted-foreground bg-secondary border border-border">😅</motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
