import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WordEntry, Difficulty, GameMode } from '@/data/words';
import { getWords, getClueIcon, shuffle, DIFFICULTY_LABELS } from '@/data/words';

interface GameScreenProps {
  mode: GameMode;
  difficulty: Difficulty;
  onHome: () => void;
  onFinish: (result: { score: number; correct: number; wrong: number; total: number }) => void;
  onFeedback: (emoji: string) => void;
}

export default function GameScreen({ mode, difficulty, onHome, onFinish, onFeedback }: GameScreenProps) {
  const [words, setWords] = useState<WordEntry[]>([]);
  const [wordIdx, setWordIdx] = useState(0);
  const [clueIdx, setClueIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [timer, setTimer] = useState(60);
  const [clueKey, setClueKey] = useState(0);

  useEffect(() => {
    const pool = shuffle(getWords(difficulty)).slice(0, 5);
    setWords(pool);
    setWordIdx(0);
    setClueIdx(0);
    setScore(0);
    setCorrect(0);
    setWrong(0);
    setRevealed(false);
    setHistory([]);
    setTimer(60);
  }, [difficulty]);

  // Speed timer
  useEffect(() => {
    if (mode !== 'speed' || revealed || words.length === 0) return;
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setRevealed(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [mode, revealed, wordIdx, words.length]);

  const entry = words[wordIdx];
  if (!entry) return null;

  const nextClue = () => {
    setHistory(prev => [...prev, `${clueIdx + 1}. ${entry.clues[clueIdx]}`]);
    const next = clueIdx + 1;
    if (next >= entry.clues.length) {
      setRevealed(true);
      return;
    }
    setClueIdx(next);
    setClueKey(prev => prev + 1);
  };

  const reveal = () => {
    setRevealed(true);
  };

  const markCorrect = () => {
    const pts = Math.max(10 - clueIdx, 1);
    setScore(s => s + pts);
    setCorrect(c => c + 1);
    onFeedback('🎉');
    advance();
  };

  const markWrong = () => {
    setWrong(w => w + 1);
    onFeedback('😅');
    advance();
  };

  const advance = () => {
    const nextIdx = wordIdx + 1;
    if (nextIdx >= words.length) {
      setTimeout(() => {
        onFinish({ score: score + (wrong === wrong ? 0 : 0), correct, wrong, total: words.length });
      }, 600);
      // We need to pass the actual current values - use a workaround
      return;
    }
    setTimeout(() => {
      setWordIdx(nextIdx);
      setClueIdx(0);
      setRevealed(false);
      setHistory([]);
      setTimer(60);
      setClueKey(prev => prev + 1);
    }, 600);
  };

  // Fix the finish call to use refs for current values
  const handleCorrect = () => {
    const pts = Math.max(10 - clueIdx, 1);
    const newScore = score + pts;
    const newCorrect = correct + 1;
    setScore(newScore);
    setCorrect(newCorrect);
    onFeedback('🎉');

    const nextIdx = wordIdx + 1;
    if (nextIdx >= words.length) {
      setTimeout(() => onFinish({ score: newScore, correct: newCorrect, wrong, total: words.length }), 600);
    } else {
      setTimeout(() => {
        setWordIdx(nextIdx);
        setClueIdx(0);
        setRevealed(false);
        setHistory([]);
        setTimer(60);
        setClueKey(prev => prev + 1);
      }, 600);
    }
  };

  const handleWrong = () => {
    const newWrong = wrong + 1;
    setWrong(newWrong);
    onFeedback('😅');

    const nextIdx = wordIdx + 1;
    if (nextIdx >= words.length) {
      setTimeout(() => onFinish({ score, correct, wrong: newWrong, total: words.length }), 600);
    } else {
      setTimeout(() => {
        setWordIdx(nextIdx);
        setClueIdx(0);
        setRevealed(false);
        setHistory([]);
        setTimer(60);
        setClueKey(prev => prev + 1);
      }, 600);
    }
  };

  const pts = Math.max(10 - clueIdx, 1);
  const diffInfo = DIFFICULTY_LABELS[difficulty];
  const timerPct = timer / 60;
  const circumference = 2 * Math.PI * 26;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 flex flex-col min-h-[100dvh] py-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 gap-2">
        <button onClick={onHome} className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-secondary">
          ← Início
        </button>
        <div className="flex gap-1.5 items-center flex-wrap">
          <span className="text-xs font-bold px-2.5 py-1 bg-secondary rounded-full text-foreground">{entry.category}</span>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{
            backgroundColor: difficulty === 'easy' ? 'hsla(var(--game-green)/0.15)' : difficulty === 'medium' ? 'hsla(var(--game-yellow)/0.15)' : 'hsla(var(--game-red)/0.15)',
            color: difficulty === 'easy' ? 'hsl(var(--game-green))' : difficulty === 'medium' ? 'hsl(var(--game-yellow))' : 'hsl(var(--game-red))',
          }}>
            {diffInfo.emoji} {diffInfo.label}
          </span>
        </div>
        <div className="text-sm font-bold text-muted-foreground whitespace-nowrap">
          Pts: <span className="text-primary text-base">{score}</span>
        </div>
      </div>

      {/* Timer (speed mode) */}
      {mode === 'speed' && (
        <div className="flex justify-center mb-3">
          <div className={`relative w-16 h-16 ${timer <= 10 ? 'animate-timer-pulse' : ''}`}>
            <svg viewBox="0 0 60 60" className="w-16 h-16">
              <circle cx="30" cy="30" r="26" fill="none" stroke="hsl(var(--border))" strokeWidth="4" />
              <circle
                cx="30" cy="30" r="26" fill="none"
                stroke={timer <= 10 ? 'hsl(var(--game-red))' : timer <= 20 ? 'hsl(var(--game-yellow))' : 'hsl(var(--primary))'}
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - timerPct)}
                strokeLinecap="round"
                transform="rotate(-90 30 30)"
                className="transition-all duration-1000"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-display text-lg"
              style={{ color: timer <= 10 ? 'hsl(var(--game-red))' : timer <= 20 ? 'hsl(var(--game-yellow))' : 'hsl(var(--primary))' }}>
              {timer}
            </span>
          </div>
        </div>
      )}

      {/* Clue area */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="text-xs font-bold text-muted-foreground text-center">
          Dica {clueIdx + 1} de {entry.clues.length}
        </div>

        {/* Clue bar */}
        <div className="flex gap-1 justify-center flex-wrap">
          {entry.clues.map((_, i) => (
            <div key={i} className={`w-7 h-2 rounded-full transition-colors duration-300 ${
              i < clueIdx ? 'bg-primary' :
              i === clueIdx ? 'bg-game-orange-light animate-pulse' :
              'bg-border'
            }`} />
          ))}
        </div>

        {/* Clue box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={clueKey}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-card border-2 border-border rounded-2xl p-6 shadow-game flex flex-col items-center gap-3 min-h-[130px] justify-center"
          >
            <div className="text-4xl">{getClueIcon(clueIdx)}</div>
            <p className="text-base font-bold text-center leading-relaxed max-w-[30ch] text-foreground">
              {entry.clues[clueIdx]}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* History */}
        {history.length > 0 && (
          <div className="flex flex-col gap-1.5 max-h-32 overflow-y-auto">
            {history.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs text-muted-foreground px-3 py-1.5 bg-secondary rounded-lg"
              >
                {h}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      {!revealed ? (
        <div className="flex gap-3 mt-3">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={nextClue}
            disabled={clueIdx >= entry.clues.length - 1}
            className="flex-1 py-3.5 bg-gradient-to-br from-primary to-game-orange-dark text-primary-foreground rounded-xl font-extrabold text-base shadow-glow disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:shadow-[0_8px_20px_hsla(var(--primary)/0.4)]"
          >
            Próxima Dica →
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={reveal}
            className="py-3.5 px-4 bg-card border-2 border-border text-muted-foreground rounded-xl font-bold text-sm hover:border-accent hover:text-accent transition-all"
          >
            👁 Revelar
          </motion.button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', damping: 20 }}
          className="bg-card border-2 border-border rounded-2xl p-6 text-center shadow-game-lg mt-3"
        >
          <div className="text-5xl mb-2">{entry.emoji}</div>
          <h2 className="font-display text-3xl text-foreground mb-1">{entry.word}</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Revelado na dica {clueIdx + 1} de {entry.clues.length} · vale {pts} pts
          </p>
          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCorrect}
              className="flex-1 py-3 rounded-xl font-bold text-primary-foreground bg-game-green shadow-md hover:brightness-110 transition-all"
            >
              ✅ Acertei!
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleWrong}
              className="flex-1 py-3 rounded-xl font-bold text-primary-foreground bg-game-red shadow-md hover:brightness-110 transition-all"
            >
              ❌ Errei
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
