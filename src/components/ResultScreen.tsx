import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { launchConfetti } from '@/components/GameEffects';

interface ResultScreenProps {
  trophy: string;
  title: string;
  scoreBig?: string;
  stats: { label: string; value: string }[];
  showConfetti?: boolean;
  onPlayAgain: () => void;
  onHome: () => void;
}

export default function ResultScreen({ trophy, title, scoreBig, stats, showConfetti, onPlayAgain, onHome }: ResultScreenProps) {
  useEffect(() => {
    if (showConfetti) {
      const timeout = setTimeout(() => launchConfetti(), 300);
      return () => clearTimeout(timeout);
    }
  }, [showConfetti]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 20 }}
      className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] py-8 gap-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', damping: 10 }}
        className="text-8xl"
      >
        {trophy}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-display text-3xl text-foreground text-center"
      >
        {title}
      </motion.h2>

      {scoreBig && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-display text-5xl text-primary"
        >
          {scoreBig}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-xs bg-card border-2 border-border rounded-2xl p-5 shadow-game"
      >
        {stats.map((s, i) => (
          <div key={i} className="flex justify-between py-2 border-b border-border last:border-0">
            <span className="text-sm text-muted-foreground">{s.label}</span>
            <span className="text-sm font-bold text-foreground">{s.value}</span>
          </div>
        ))}
      </motion.div>

      <div className="flex gap-3 mt-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onPlayAgain}
          className="px-8 py-3.5 bg-gradient-to-br from-primary to-game-orange-dark text-primary-foreground rounded-full font-display text-lg shadow-glow"
        >
          🔄 Jogar Novamente
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onHome}
          className="px-6 py-3.5 bg-card border-2 border-border text-muted-foreground rounded-full font-bold hover:border-primary transition-all"
        >
          🏠 Início
        </motion.button>
      </div>
    </motion.div>
  );
}
