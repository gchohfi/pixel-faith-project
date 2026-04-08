import { motion } from 'framer-motion';
import { AGE_GROUP_INFO, type AgeGroup } from '@/data/questions';

interface ArremateSelectScreenProps {
  onHome: () => void;
  onSelect: (group: AgeGroup) => void;
}

const groups: AgeGroup[] = ['crianca', 'juvenil', 'adulto'];

export default function ArremateSelectScreen({ onHome, onSelect }: ArremateSelectScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 flex flex-col min-h-[100dvh] py-4"
    >
      <div className="flex items-center justify-between mb-6">
        <button onClick={onHome} className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-secondary">← Início</button>
        <h2 className="font-display text-lg text-foreground">🏆 ARremate</h2>
        <div />
      </div>

      <div className="flex flex-col items-center gap-2 mb-6">
        <p className="font-bold text-lg text-foreground">Escolha a faixa etária</p>
        <p className="text-sm text-muted-foreground text-center">Cada rodada tem 10 perguntas com 15s por pergunta</p>
      </div>

      <div className="flex flex-col gap-3">
        {groups.map((group, i) => {
          const info = AGE_GROUP_INFO[group];
          return (
            <motion.button
              key={group}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(group)}
              className="flex items-center gap-4 p-4 rounded-xl border-2 border-border bg-card shadow-game hover:border-primary hover:shadow-glow transition-all text-left"
            >
              <div className="text-4xl">{info.emoji}</div>
              <div className="flex-1">
                <div className="font-extrabold text-foreground">{info.name}</div>
                <div className="text-xs font-semibold text-muted-foreground">{info.age}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{info.desc}</div>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                group === 'crianca' ? 'bg-game-green/15 text-game-green' :
                group === 'juvenil' ? 'bg-game-yellow/15 text-game-yellow' :
                'bg-game-red/15 text-game-red'
              }`}>
                {info.diffLabel}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
