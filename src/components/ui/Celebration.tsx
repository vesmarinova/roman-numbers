import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface CelebrationProps {
  show: boolean;
  message?: string;
  onDone?: () => void;
}

const CONFETTI_COLORS = ['#D4AF37', '#C0392B', '#27AE60', '#8B1A1A', '#F5E6A3'];

function ConfettiPiece({ index }: { index: number }) {
  const color = CONFETTI_COLORS[index % CONFETTI_COLORS.length];
  const left = Math.random() * 100;
  const delay = Math.random() * 2;
  const duration = 2 + Math.random() * 2;

  return (
    <div
      className="absolute w-3 h-3 rounded-sm opacity-0"
      style={{
        left: `${left}%`,
        top: '-10px',
        backgroundColor: color,
        animation: `confetti-fall ${duration}s ease-in ${delay}s forwards`,
      }}
    />
  );
}

export function Celebration({ show, message, onDone }: CelebrationProps) {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onDone?.();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onDone]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <ConfettiPiece key={i} index={i} />
        ))}
      </div>
      <div className="animate-pop-in bg-white rounded-3xl p-8 shadow-2xl text-center z-10 mx-4 border-4 border-gold">
        <div className="text-5xl mb-4">🏛️</div>
        <h2 className="font-roman text-3xl font-bold text-gold-dark mb-2">
          {message ?? t('congratulations')}
        </h2>
        <p className="text-roman-brown text-lg">{t('greatJob')}</p>
      </div>
    </div>
  );
}
