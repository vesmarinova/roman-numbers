interface TimerProps {
  seconds: number;
  warning?: boolean;
}

export function Timer({ seconds, warning }: TimerProps) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const display = mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`;

  return (
    <div className={`font-roman text-xl font-bold flex items-center gap-1 ${warning || seconds <= 5 ? 'text-wrong animate-pulse' : 'text-roman-dark'}`}>
      <span>⏱</span>
      <span>{display}</span>
    </div>
  );
}
