interface ScoreDisplayProps {
  score: number;
}

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <div className="flex items-center gap-1 font-bold text-lg text-gold-dark">
      <span>🪙</span>
      <span className="font-roman">{score}</span>
    </div>
  );
}
