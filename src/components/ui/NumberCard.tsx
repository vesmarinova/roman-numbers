interface NumberCardProps {
  value: string | number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const SIZES: Record<string, string> = {
  sm: 'text-2xl px-4 py-2',
  md: 'text-4xl px-6 py-4',
  lg: 'text-6xl px-8 py-6',
};

export function NumberCard({ value, label, size = 'md' }: NumberCardProps) {
  return (
    <div className={`font-roman font-bold text-roman-dark bg-gradient-to-b from-white to-marble rounded-2xl border-2 border-gold shadow-lg text-center ${SIZES[size]}`}>
      <div>{value}</div>
      {label && <div className="text-sm font-body text-roman-brown mt-1">{label}</div>}
    </div>
  );
}
