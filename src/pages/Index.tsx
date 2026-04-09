import { useState, useCallback, useRef } from 'react';
import type { Difficulty } from '@/data/words';
import type { AgeGroup } from '@/data/questions';
import { AGE_GROUP_INFO } from '@/data/questions';
import HomeMenu from '@/components/HomeMenu';
import GameScreen from '@/components/GameScreen';
import BattleScreen from '@/components/BattleScreen';
import DrawScreen from '@/components/DrawScreen';
import ArremateSelectScreen from '@/components/ArremateSelectScreen';
import ArremateScreen from '@/components/ArremateScreen';
import ResultScreen from '@/components/ResultScreen';
import StopGame from '@/games/stop/StopGame';
import QuemSouEuGame from '@/games/quem-sou-eu/QuemSouEuGame';
import { ConfettiContainer, FeedbackOverlay } from '@/components/GameEffects';

type Screen = 'home' | 'adivinha-setup' | 'game' | 'battle' | 'draw' | 'arremate-select' | 'arremate' | 'stop' | 'quemsoueu' | 'result';
type LastGameType = 'adivinha' | 'arremate' | 'stop' | 'quemsoueu';

interface ResultData {
  trophy: string;
  title: string;
  scoreBig?: string;
  stats: { label: string; value: string }[];
  showConfetti: boolean;
}

const Index = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('crianca');
  const [lastGameType, setLastGameType] = useState<LastGameType>('adivinha');
  const [feedbackEmoji, setFeedbackEmoji] = useState<string | null>(null);
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const gameKeyRef = useRef(0);

  const showFeedback = useCallback((emoji: string) => {
    setFeedbackEmoji(emoji);
    setTimeout(() => setFeedbackEmoji(null), 700);
  }, []);

  const goHome = useCallback(() => setScreen('home'), []);

  const handleSelectGame = (gameId: string) => {
    gameKeyRef.current += 1;
    switch (gameId) {
      case 'adivinha':
        setLastGameType('adivinha');
        setScreen('adivinha-setup');
        break;
      case 'stop':
        setLastGameType('stop');
        setScreen('stop');
        break;
      case 'arremate':
        setScreen('arremate-select');
        break;
      case 'quemsoueu':
        setLastGameType('quemsoueu');
        setScreen('quemsoueu');
        break;
      case 'batalha':
        setLastGameType('adivinha');
        setScreen('battle');
        break;
      case 'desenha':
        setLastGameType('adivinha');
        setScreen('draw');
        break;
    }
  };

  const replayGame = () => {
    gameKeyRef.current += 1;
    if (lastGameType === 'arremate') setScreen('arremate');
    else if (lastGameType === 'stop') setScreen('stop');
    else if (lastGameType === 'quemsoueu') setScreen('quemsoueu');
    else setScreen('game');
  };

  const handleGameFinish = (result: { score: number; correct: number; wrong: number; total: number }) => {
    const pct = Math.round((result.correct / result.total) * 100);
    let trophy = '😊', title = 'Bom jogo!';
    if (pct >= 80) { trophy = '🏆'; title = 'Incrível!'; }
    else if (pct >= 60) { trophy = '⭐'; title = 'Muito bem!'; }

    setResultData({
      trophy, title,
      scoreBig: `${result.score} pontos`,
      stats: [
        { label: '✅ Acertos', value: `${result.correct}` },
        { label: '❌ Erros', value: `${result.wrong}` },
        { label: '📊 Aproveitamento', value: `${pct}%` },
      ],
      showConfetti: pct >= 60,
    });
    setScreen('result');
  };

  const handleBattleFinish = (result: { ptsA: number; ptsB: number; total: number }) => {
    const winner = result.ptsA > result.ptsB ? '🔴 Equipe A' :
                   result.ptsB > result.ptsA ? '🔵 Equipe B' : 'Empate!';
    setResultData({
      trophy: result.ptsA === result.ptsB ? '🤝' : '🏆',
      title: result.ptsA === result.ptsB ? 'Empate!' : `Venceu: ${winner}`,
      stats: [
        { label: '🔴 Equipe A', value: `${result.ptsA} pts` },
        { label: '🔵 Equipe B', value: `${result.ptsB} pts` },
      ],
      showConfetti: result.ptsA !== result.ptsB,
    });
    setScreen('result');
  };

  const handleDrawFinish = (result: { score: number; total: number }) => {
    setResultData({
      trophy: result.score >= 30 ? '🏆' : '🎨',
      title: result.score >= 30 ? 'Turma talentosa!' : 'Foi divertido!',
      scoreBig: `${result.score} pts`,
      stats: [
        { label: 'Palavras jogadas', value: `${result.total}` },
        { label: 'Pontuação', value: `${result.score}` },
      ],
      showConfetti: result.score >= 40,
    });
    setScreen('result');
  };

  const handleArremateFinish = (result: { score: number; correct: number; wrong: number; total: number; faixa: AgeGroup }) => {
    setLastGameType('arremate');
    const pct = Math.round((result.correct / result.total) * 100);
    const faixaLabel = AGE_GROUP_INFO[result.faixa];
    let trophy = '😊', title = 'Bom jogo!';
    if (pct >= 80) { trophy = '🏆'; title = 'Mestre do ARremate!'; }
    else if (pct >= 60) { trophy = '⭐'; title = 'Muito bem!'; }

    setResultData({
      trophy, title,
      scoreBig: `${result.score} pts`,
      stats: [
        { label: 'Faixa', value: `${faixaLabel.emoji} ${faixaLabel.name}` },
        { label: '✅ Acertos', value: `${result.correct}` },
        { label: '❌ Erros', value: `${result.wrong}` },
        { label: '📊 Aproveitamento', value: `${pct}%` },
      ],
      showConfetti: pct >= 60,
    });
    setScreen('result');
  };

  return (
    <div className="min-h-[100dvh] max-w-[480px] mx-auto px-4 relative">
      <ConfettiContainer />
      <FeedbackOverlay emoji={feedbackEmoji} />

      {screen === 'home' && (
        <HomeMenu onSelectGame={handleSelectGame} />
      )}

      {screen === 'adivinha-setup' && (
        <AdivinhaSetup
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
          onStart={() => { gameKeyRef.current += 1; setScreen('game'); }}
          onHome={goHome}
        />
      )}

      {screen === 'game' && (
        <GameScreen
          key={`game-${gameKeyRef.current}`}
          mode="classic"
          difficulty={difficulty}
          onHome={goHome}
          onFinish={handleGameFinish}
          onFeedback={showFeedback}
        />
      )}

      {screen === 'battle' && (
        <BattleScreen
          key={`battle-${gameKeyRef.current}`}
          difficulty={difficulty}
          onHome={goHome}
          onFinish={handleBattleFinish}
          onFeedback={showFeedback}
        />
      )}

      {screen === 'draw' && (
        <DrawScreen
          key={`draw-${gameKeyRef.current}`}
          difficulty={difficulty}
          onHome={goHome}
          onFinish={handleDrawFinish}
          onFeedback={showFeedback}
        />
      )}

      {screen === 'stop' && (
        <StopGame
          key={`stop-${gameKeyRef.current}`}
          onHome={goHome}
          onFinish={() => {}}
          onFeedback={showFeedback}
        />
      )}

      {screen === 'quemsoueu' && (
        <QuemSouEuGame
          key={`quemsoueu-${gameKeyRef.current}`}
          onHome={goHome}
          onFeedback={showFeedback}
        />
      )}


      {screen === 'arremate-select' && (
        <ArremateSelectScreen
          onHome={goHome}
          onSelect={(group) => { setAgeGroup(group); gameKeyRef.current += 1; setScreen('arremate'); }}
        />
      )}

      {screen === 'arremate' && (
        <ArremateScreen
          key={`arremate-${gameKeyRef.current}`}
          ageGroup={ageGroup}
          onBack={() => setScreen('arremate-select')}
          onFinish={handleArremateFinish}
          onFeedback={showFeedback}
        />
      )}

      {screen === 'result' && resultData && (
        <ResultScreen
          {...resultData}
          onPlayAgain={replayGame}
          onHome={goHome}
        />
      )}
    </div>
  );
};

// Quick difficulty selector for Adivinhação
import { motion } from 'framer-motion';

const DIFFICULTIES = [
  { id: 'easy' as const, emoji: '🌱', label: 'Fácil' },
  { id: 'medium' as const, emoji: '🔥', label: 'Médio' },
  { id: 'hard' as const, emoji: '💀', label: 'Difícil' },
];

function AdivinhaSetup({ difficulty, onDifficultyChange, onStart, onHome }: {
  difficulty: Difficulty;
  onDifficultyChange: (d: Difficulty) => void;
  onStart: () => void;
  onHome: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 flex flex-col items-center min-h-[100dvh] py-4 gap-6"
    >
      <div className="flex items-center justify-between w-full">
        <button onClick={onHome} className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-secondary">
          ← Menu
        </button>
        <h2 className="font-display text-lg text-foreground">🎯 Adivinhação</h2>
        <div />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className="text-6xl">🎯</div>
        <p className="text-center text-muted-foreground font-semibold max-w-xs">
          Receba 10 dicas e tente adivinhar a palavra secreta o mais rápido possível!
        </p>

        <div className="flex flex-col gap-2 w-full">
          <p className="text-sm font-bold text-muted-foreground text-center">Dificuldade</p>
          <div className="flex gap-2 justify-center">
            {DIFFICULTIES.map(d => (
              <motion.button key={d.id} whileTap={{ scale: 0.95 }}
                onClick={() => onDifficultyChange(d.id)}
                className={`px-5 py-2 rounded-xl border-2 font-bold text-sm transition-all ${
                  difficulty === d.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground hover:border-primary'
                }`}>
                {d.emoji} {d.label}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.button whileTap={{ scale: 0.97 }} onClick={onStart}
          className="w-full max-w-xs py-4 bg-primary text-primary-foreground rounded-xl font-display text-xl shadow-glow mt-4">
          ▶ Jogar
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Index;
