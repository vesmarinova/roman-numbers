import { useLanguage } from '../../../context/LanguageContext';
import { type RomanSymbol } from '../../../data/romans';
import { Button } from '../../ui/Button';

interface SymbolLessonProps {
  symbol: RomanSymbol;
  onNext: () => void;
}

export function SymbolLesson({ symbol, onNext }: SymbolLessonProps) {
  const { t } = useLanguage();

  return (
    <div className="text-center animate-pop-in w-full">
      <div className="w-28 h-28 mx-auto mb-4 rounded-2xl border-4 border-gold bg-gradient-to-b from-white to-marble shadow-xl flex items-center justify-center">
        <span className="font-roman text-6xl font-bold text-roman-dark">{symbol.symbol}</span>
      </div>
      <p className="text-xl text-roman-brown mb-1">
        <span className="font-roman font-bold text-roman-dark text-2xl">{symbol.symbol}</span>
        {' '}{t('symbolMeans')}{' '}
        <span className="font-bold text-gold-dark text-2xl">{symbol.value}</span>
      </p>
      <div className="mt-6">
        <Button variant="secondary" onClick={onNext}>{t('next')} →</Button>
      </div>
    </div>
  );
}
