interface RomanSymbolTileProps {
  symbol: string;
  value: number;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

const SIZES: Record<string, string> = {
  sm: 'w-10 h-10 text-lg',
  md: 'w-14 h-14 text-2xl',
  lg: 'w-18 h-18 text-3xl',
};

export function RomanSymbolTile({ symbol, value, onClick, disabled, size = 'md', showValue = false }: RomanSymbolTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`font-roman font-bold rounded-xl border-2 border-gold bg-gradient-to-b from-cream to-cream-dark text-roman-dark
        shadow-md transition-all duration-150 active:scale-90 hover:shadow-lg hover:border-gold-dark
        disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer
        flex flex-col items-center justify-center select-none ${SIZES[size]}`}
    >
      <span>{symbol}</span>
      {showValue && <span className="text-xs text-roman-brown">{value}</span>}
    </button>
  );
}
