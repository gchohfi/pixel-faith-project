import { useState } from 'react';
import { motion } from 'framer-motion';
import { AGE_GROUP_INFO, type AgeGroup } from '@/data/questions';

interface ArremateSelectScreenProps {
  onHome: () => void;
  onSelect: (group: AgeGroup, timePerQuestion: number) => void;
}

const groups: AgeGroup[] = ['crianca', 'juvenil', 'adulto'];
const TIME_OPTIONS = [
  { value: 10, label: '10s', desc: 'Rápido' },
  { value: 15, label: '15s', desc: 'Normal' },
  { value: 20, label: '20s', desc: 'Tranquilo' },
  { value: 30, label: '30s', desc: 'Relaxado' },
];

export default function ArremateSelectScreen({ onHome, onSelect }: ArremateSelectScreenProps) {
  const [selectedTime, setSelectedTime] = useState(15);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 flex flex-col min-h-[100dvh] py-4"
    >
      <div className="flex items-center justify-between mb-6">
        <button onClick={onHome} className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-secondary">← Menu</button>
        <h2 className="font-display text-lg text-foreground">🏆 ARremate</h2>
        <div />
      </div>

      <div className="flex flex-col items-center gap-2 mb-5">
        <p className="font-bold text-lg text-foreground">Escolha a faixa etária</p>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        {groups.map((group, i) => {
          const info = AGE_GROUP_INFO[group];
          return (
            <motion.button
              key={group}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(group, selectedTime)}
              className="flex items-center gap-4 p-4 rounded-xl border-2 border-border bg-card hover:border-primary hover:shadow-glow transition-all text-left"
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

      {/* Time selector */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-bold text-muted-foreground">⏱ Tempo por pergunta</p>
        <div className="flex gap-2">
          {TIME_OPTIONS.map(opt => (
            <motion.button
              key={opt.value}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTime(opt.value)}
              className={`flex flex-col items-center px-4 py-2 rounded-xl border-2 font-bold text-sm transition-all ${
                selectedTime === opt.value
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-primary'
              }`}
            >
              <span>{opt.label}</span>
              <span className="text-[10px] font-semibold opacity-80">{opt.desc}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
