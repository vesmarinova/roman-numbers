interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export function ProgressBar({ current, total, label }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((current / total) * 100));
  return (
    <div className="w-full">
      {label && <div className="text-sm text-roman-brown mb-1">{label}</div>}
      <div className="w-full h-3 bg-cream-dark rounded-full overflow-hidden border border-gold/30">
        <div
          className="h-full bg-gradient-to-r from-gold to-gold-dark rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-xs text-roman-brown mt-0.5 text-right">{current}/{total}</div>
    </div>
  );
}
