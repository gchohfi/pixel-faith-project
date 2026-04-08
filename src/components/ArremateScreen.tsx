import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ARREMATE_QUESTIONS, type AgeGroup } from '@/data/questions';
import { shuffle } from '@/data/words';

interface ArremateScreenProps {
  ageGroup: AgeGroup;
  onBack: () => void;
  onFinish: (result: { score: number; correct: number; wrong: number; total: number; faixa: AgeGroup }) => void;
  onFeedback: (emoji: string) => void;
}

export default function ArremateScreen({ ageGroup, onBack, onFinish, onFeedback }: ArremateScreenProps) {
  const [questions, setQuestions] = useState(() => shuffle([...ARREMATE_QUESTIONS[ageGroup]]).slice(0, 10));
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const timerRef = useRef<NodeJS.Timeout>();

  const q = questions[qIdx];

  useEffect(() => {
    if (!q || answered) return;
    setTimeLeft(15);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [qIdx, answered]);

  const handleTimeout = () => {
    setAnswered(true);
    setWrongCount(w => w + 1);
    onFeedback('⏰');
    advanceAfterDelay();
  };

  const handleAnswer = (index: number) => {
    if (answered) return;
    setAnswered(true);
    setSelectedIdx(index);
    clearInterval(timerRef.current);

    const isCorrect = index === q.correct;
    if (isCorrect) {
      const pts = Math.max(timeLeft, 1);
      setScore(s => s + pts);
      setCorrectCount(c => c + 1);
      onFeedback('🎉');
    } else {
      setWrongCount(w => w + 1);
      onFeedback('😅');
    }
    advanceAfterDelay();
  };

  const advanceAfterDelay = () => {
    setTimeout(() => {
      const nextIdx = qIdx + 1;
      if (nextIdx >= questions.length) {
        // Use functional state to get latest values
        setScore(s => {
          setCorrectCount(c => {
            setWrongCount(w => {
              onFinish({ score: s, correct: c, wrong: w, total: questions.length, faixa: ageGroup });
              return w;
            });
            return c;
          });
          return s;
        });
      } else {
        setQIdx(nextIdx);
        setAnswered(false);
        setSelectedIdx(null);
      }
    }, 1200);
  };

  if (!q) return null;

  const progress = (qIdx / questions.length) * 100;
  const letters = ['A', 'B', 'C', 'D'];
  const timerColor = timeLeft <= 5 ? 'hsl(var(--game-red))' : timeLeft <= 8 ? 'hsl(var(--game-yellow))' : 'hsl(var(--accent))';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 flex flex-col min-h-[100dvh] py-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2 gap-2">
        <button onClick={onBack} className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-secondary">← Voltar</button>
        <div className="text-xs font-bold text-muted-foreground">{qIdx + 1} / {questions.length}</div>
        <div className="text-sm font-bold text-muted-foreground">Pts: <span className="text-accent text-base">{score}</span></div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-border rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-accent rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Timer + Question */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <motion.div
            key={timeLeft}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className={`font-display text-3xl ${timeLeft <= 5 ? 'animate-timer-pulse' : ''}`}
            style={{ color: timerColor }}
          >
            {timeLeft}
          </motion.div>
          <span className="text-xs text-muted-foreground font-bold">seg</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={qIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center"
          >
            <div className="text-5xl mb-3">{q.emoji}</div>
            <p className="text-lg font-bold text-foreground leading-snug max-w-xs">{q.q}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3 mt-auto">
        {q.options.map((opt, i) => {
          let btnClass = 'border-border bg-card hover:border-primary';
          if (answered) {
            if (i === q.correct) btnClass = 'border-game-green bg-game-green/15 ring-2 ring-game-green';
            else if (i === selectedIdx) btnClass = 'border-game-red bg-game-red/15 ring-2 ring-game-red';
            else btnClass = 'border-border bg-card opacity-50';
          }

          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              whileTap={!answered ? { scale: 0.97 } : {}}
              onClick={() => handleAnswer(i)}
              disabled={answered}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all font-bold text-left ${btnClass}`}
            >
              <span className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-sm font-extrabold text-muted-foreground shrink-0">
                {letters[i]}
              </span>
              <span className="text-foreground">{opt}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
