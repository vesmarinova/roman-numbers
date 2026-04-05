interface StreakCounterProps {
  streak: number;
}

export function StreakCounter({ streak }: StreakCounterProps) {
  return (
    <div className={`flex items-center gap-1 font-bold text-lg ${streak > 0 ? 'text-orange-500' : 'text-roman-brown/50'}`}>
      <span className={streak >= 3 ? 'animate-bounce' : ''}>🔥</span>
      <span>{streak}</span>
    </div>
  );
}
