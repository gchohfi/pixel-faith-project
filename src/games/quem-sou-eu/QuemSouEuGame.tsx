import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getQuemSouEuEntries, shuffle, type QuemSouEuEntry } from './data';

interface QuemSouEuGameProps {
  onHome: () => void;
  onFeedback: (emoji: string) => void;
}

type Phase = 'intro' | 'playing' | 'revealed';

const ROUND_OPTIONS = [5, 8, 10, 15] as const;

export default function QuemSouEuGame({ onHome, onFeedback }: QuemSouEuGameProps) {
  const [selectedRounds, setSelectedRounds] = useState(8);
  const [entries, setEntries] = useState(() => shuffle(getQuemSouEuEntries()).slice(0, 8));
  const [roundIdx, setRoundIdx] = useState(0);
  const [clueIdx, setClueIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('intro');
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [finished, setFinished] = useState(false);

  const entry = entries[roundIdx];

  const startPlaying = () => {
    const newEntries = shuffle(getQuemSouEuEntries()).slice(0, selectedRounds);
    setEntries(newEntries);
    setRoundIdx(0);
    setClueIdx(0);
    setScore(0);
    setCorrect(0);
    setWrong(0);
    setFinished(false);
    setPhase('playing');
  };

  const showNextClue = () => {
    if (clueIdx < 2) {
      setClueIdx(clueIdx + 1);
    }
  };

  const handleGuessCorrect = useCallback(() => {
    const pts = 3 - clueIdx; // 3pts na 1ª dica, 2 na 2ª, 1 na 3ª
    const newScore = score + pts;
    const newCorrect = correct + 1;
    setScore(newScore);
    setCorrect(newCorrect);
    onFeedback('🎉');
    setPhase('revealed');
  }, [clueIdx, score, correct, onFeedback]);

  const handleGuessWrong = useCallback(() => {
    if (clueIdx < 2) {
      // Still has more clues, reveal next
      onFeedback('🤔');
      setClueIdx(clueIdx + 1);
    } else {
      // No more clues, mark wrong
      setWrong(wrong + 1);
      onFeedback('😅');
      setPhase('revealed');
    }
  }, [clueIdx, wrong, onFeedback]);

  const handleGiveUp = useCallback(() => {
    setWrong(wrong + 1);
    onFeedback('😅');
    setPhase('revealed');
  }, [wrong, onFeedback]);

  const nextRound = () => {
    const next = roundIdx + 1;
    if (next >= entries.length) {
      setFinished(true);
    } else {
      setRoundIdx(next);
      setClueIdx(0);
      setPhase('playing');
    }
  };

  // Results screen
  if (finished) {
    const pct = Math.round((correct / entries.length) * 100);
    const trophy = pct >= 80 ? '🏆' : pct >= 50 ? '⭐' : '😊';
    const title = pct >= 80 ? 'Incrível!' : pct >= 50 ? 'Muito bem!' : 'Bom jogo!';

    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] py-8 gap-5">
        <div className="text-7xl">{trophy}</div>
        <h2 className="font-display text-3xl text-foreground">{title}</h2>
        <div className="font-display text-4xl text-primary">{score} pts</div>

        <div className="w-full max-w-xs bg-card border-2 border-border rounded-xl p-5">
          {[
            { label: '✅ Acertos', value: `${correct}` },
            { label: '❌ Erros', value: `${wrong}` },
            { label: '📊 Aproveitamento', value: `${pct}%` },
            { label: '🎮 Rodadas', value: `${entries.length}` },
          ].map((s, i) => (
            <div key={i} className="flex justify-between py-2 border-b border-border last:border-0">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <span className="text-sm font-bold text-foreground">{s.value}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <motion.button whileTap={{ scale: 0.95 }} onClick={startPlaying}
            className="px-6 py-3.5 bg-primary text-primary-foreground rounded-xl font-display text-base shadow-glow">
            🔄 Jogar Novamente
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={onHome}
            className="px-5 py-3.5 bg-card border-2 border-border text-muted-foreground rounded-xl font-bold hover:border-primary transition-all">
            🏠 Menu
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (!entry) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="relative z-10 flex flex-col min-h-[100dvh] py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={onHome} className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-secondary">
          ← Menu
        </button>
        <h2 className="font-display text-lg text-foreground">🤔 Quem Sou Eu?</h2>
        <div className="text-sm font-bold text-muted-foreground">
          <span className="text-primary">{score}</span> pts
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-bold text-muted-foreground">{roundIdx + 1}/{entries.length}</span>
        <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
          <motion.div className="h-full bg-primary rounded-full" animate={{ width: `${((roundIdx) / entries.length) * 100}%` }} />
        </div>
      </div>

      {/* Intro */}
      {phase === 'intro' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex-1 flex flex-col items-center justify-center gap-6">
          <div className="text-7xl">🤔</div>
          <h3 className="font-display text-2xl text-foreground text-center">Quem Sou Eu?</h3>
          <p className="text-center text-muted-foreground font-semibold max-w-xs">
            Você receberá 3 dicas progressivas. Tente adivinhar quem ou o que é com o menor número de dicas!
          </p>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span>🥇 1ª dica = 3 pontos</span>
            <span>🥈 2ª dica = 2 pontos</span>
            <span>🥉 3ª dica = 1 ponto</span>
          </div>

          <div className="flex flex-col gap-2 w-full max-w-xs">
            <p className="text-sm font-bold text-muted-foreground text-center">Rodadas</p>
            <div className="flex gap-2 justify-center">
              {ROUND_OPTIONS.map(r => (
                <motion.button key={r} whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedRounds(r)}
                  className={`px-4 py-2 rounded-xl border-2 font-bold text-sm transition-all ${
                    selectedRounds === r
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-muted-foreground hover:border-primary'
                  }`}>
                  {r}
                </motion.button>
              ))}
            </div>
          </div>
          <motion.button whileTap={{ scale: 0.97 }} onClick={startPlaying}
            className="w-full max-w-xs py-4 bg-primary text-primary-foreground rounded-xl font-display text-xl shadow-glow">
            ▶ Começar!
          </motion.button>
        </motion.div>
      )}

      {/* Playing */}
      {phase === 'playing' && (
        <div className="flex-1 flex flex-col gap-4">
          {/* Category badge */}
          <div className="flex justify-center">
            <span className="text-xs font-bold px-3 py-1 bg-secondary rounded-lg text-muted-foreground">
              {entry.category}
            </span>
          </div>

          {/* Clue dots */}
          <div className="flex gap-2 justify-center">
            {[0, 1, 2].map(i => (
              <div key={i} className={`w-10 h-2 rounded-full transition-all duration-300 ${
                i < clueIdx ? 'bg-primary' :
                i === clueIdx ? 'bg-primary animate-pulse' :
                'bg-border'
              }`} />
            ))}
          </div>

          {/* Clues */}
          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {[0, 1, 2].filter(i => i <= clueIdx).map(i => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-card border-2 rounded-xl p-4 ${
                    i === clueIdx ? 'border-primary shadow-glow' : 'border-border'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-display text-lg text-primary shrink-0">
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}
                    </span>
                    <div>
                      <span className="text-xs font-bold text-muted-foreground">Dica {i + 1} — vale {3 - i} pts</span>
                      <p className="font-bold text-foreground mt-1">{entry.clues[i]}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="mt-auto flex flex-col gap-2">
            <div className="flex gap-2">
              <motion.button whileTap={{ scale: 0.97 }} onClick={handleGuessCorrect}
                className="flex-1 py-3.5 rounded-xl font-bold text-primary-foreground bg-game-green transition-all">
                ✅ Acertei!
              </motion.button>
              <motion.button whileTap={{ scale: 0.97 }} onClick={handleGuessWrong}
                className="flex-1 py-3.5 rounded-xl font-bold text-primary-foreground bg-game-red transition-all">
                {clueIdx < 2 ? '❌ Errei — mais dica' : '❌ Errei'}
              </motion.button>
            </div>
            {clueIdx < 2 && (
              <motion.button whileTap={{ scale: 0.97 }} onClick={showNextClue}
                className="py-3 rounded-xl font-bold text-muted-foreground bg-secondary border-2 border-border hover:border-primary transition-all">
                💡 Mais uma dica ({2 - clueIdx} restante{2 - clueIdx > 1 ? 's' : ''})
              </motion.button>
            )}
            <motion.button whileTap={{ scale: 0.97 }} onClick={handleGiveUp}
              className="py-2.5 rounded-xl font-bold text-muted-foreground text-sm hover:text-foreground transition-all">
              🏳️ Desistir
            </motion.button>
          </div>
        </div>
      )}

      {/* Revealed */}
      {phase === 'revealed' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col items-center justify-center gap-5">
          <div className="text-6xl">{entry.emoji}</div>
          <h3 className="font-display text-3xl text-foreground">{entry.answer}</h3>
          <span className="text-xs font-bold px-3 py-1 bg-secondary rounded-lg text-muted-foreground">{entry.category}</span>

          <div className="w-full bg-card border-2 border-border rounded-xl p-4 space-y-2">
            {entry.clues.map((clue, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-sm shrink-0">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
                <p className="text-sm text-muted-foreground">{clue}</p>
              </div>
            ))}
          </div>

          <motion.button whileTap={{ scale: 0.97 }} onClick={nextRound}
            className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-display text-lg shadow-glow">
            {roundIdx + 1 >= entries.length ? '🏆 Ver resultado' : '➡️ Próximo'}
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
