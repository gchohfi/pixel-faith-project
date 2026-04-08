import { useState, useCallback, useRef } from 'react';
import type { GameMode, Difficulty } from '@/data/words';
import type { AgeGroup } from '@/data/questions';
import { AGE_GROUP_INFO } from '@/data/questions';
import HomeScreen from '@/components/HomeScreen';
import GameScreen from '@/components/GameScreen';
import BattleScreen from '@/components/BattleScreen';
import DrawScreen from '@/components/DrawScreen';
import ArremateSelectScreen from '@/components/ArremateSelectScreen';
import ArremateScreen from '@/components/ArremateScreen';
import ResultScreen from '@/components/ResultScreen';
import { FloatingBubbles, ConfettiContainer, FeedbackOverlay } from '@/components/GameEffects';

type Screen = 'home' | 'game' | 'battle' | 'draw' | 'arremate-select' | 'arremate' | 'result';
type LastGameType = 'adivinha' | 'arremate';

interface ResultData {
  trophy: string;
  title: string;
  scoreBig?: string;
  stats: { label: string; value: string }[];
  showConfetti: boolean;
}

const Index = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [mode, setMode] = useState<GameMode>('classic');
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

  const startGame = () => {
    setLastGameType('adivinha');
    gameKeyRef.current += 1;
    if (mode === 'battle') setScreen('battle');
    else if (mode === 'draw') setScreen('draw');
    else setScreen('game');
  };

  const replayGame = () => {
    gameKeyRef.current += 1;
    if (lastGameType === 'arremate') {
      setScreen('arremate');
    } else {
      startGame();
    }
  };

  const handleGameFinish = (result: { score: number; correct: number; wrong: number; total: number }) => {
    const pct = Math.round((result.correct / result.total) * 100);
    let trophy = '😊', title = 'Bom jogo!';
    if (pct >= 80) { trophy = '🏆'; title = 'Incrível!'; }
    else if (pct >= 60) { trophy = '⭐'; title = 'Muito bem!'; }
    else if (pct >= 40) { trophy = '👍'; title = 'Bom jogo!'; }

    setResultData({
      trophy, title,
      scoreBig: `${result.score} pontos`,
      stats: [
        { label: '✅ Acertos', value: `${result.correct}` },
        { label: '❌ Erros', value: `${result.wrong}` },
        { label: '📊 Aproveitamento', value: `${pct}%` },
        { label: '🎮 Palavras', value: `${result.total}` },
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
        { label: 'Palavras jogadas', value: `${result.total}` },
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
    else if (pct >= 40) { trophy = '👍'; title = 'Bom jogo!'; }

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
      <FloatingBubbles />
      <ConfettiContainer />
      <FeedbackOverlay emoji={feedbackEmoji} />

      {screen === 'home' && (
        <HomeScreen
          mode={mode}
          difficulty={difficulty}
          onModeChange={setMode}
          onDifficultyChange={setDifficulty}
          onStartGame={startGame}
          onStartArremate={() => setScreen('arremate-select')}
        />
      )}

      {screen === 'game' && (
        <GameScreen
          key={`game-${gameKeyRef.current}`}
          mode={mode}
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

export default Index;
