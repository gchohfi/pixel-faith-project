import { useEffect, useRef } from 'react';

const COLORS = ['#FF6B35','#8B5CF6','#10B981','#F59E0B','#3B82F6','#EF4444','#EC4899'];

export function launchConfetti() {
  const container = document.getElementById('confetti-container');
  if (!container) return;
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    piece.style.cssText = `
      left: ${Math.random() * 100}vw;
      background: ${color};
      width: ${6 + Math.random() * 8}px;
      height: ${8 + Math.random() * 10}px;
      animation-duration: ${2 + Math.random() * 2}s;
      animation-delay: ${Math.random() * 0.8}s;
      transform: rotate(${Math.random() * 360}deg);
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
    `;
    container.appendChild(piece);
  }
  setTimeout(() => { if (container) container.innerHTML = ''; }, 4000);
}

export function ConfettiContainer() {
  return <div id="confetti-container" className="fixed inset-0 pointer-events-none z-50" />;
}

interface FeedbackOverlayProps {
  emoji: string | null;
}

export function FeedbackOverlay({ emoji }: FeedbackOverlayProps) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  if (!emoji) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
      <div className="text-8xl animate-bounce">{emoji}</div>
    </div>
  );
}

export function FloatingBubbles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-primary opacity-[0.12] animate-float" />
      <div className="absolute bottom-20 -left-12 w-40 h-40 rounded-full bg-accent opacity-[0.12] animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[40%] left-[20%] w-24 h-24 rounded-full bg-game-green opacity-[0.12] animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-[25%] right-[12%] w-[70px] h-[70px] rounded-full bg-game-yellow opacity-[0.12] animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-[20%] -right-8 w-32 h-32 rounded-full bg-game-blue opacity-[0.12] animate-float" style={{ animationDelay: '1.5s' }} />
    </div>
  );
}
