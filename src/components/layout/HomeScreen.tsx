import { useNavigate } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';

const MODES = [
  { path: '/tutorial', icon: '📖', titleKey: 'tutorial', descKey: 'tutorialDesc' },
  { path: '/converter', icon: '🏗️', titleKey: 'converter', descKey: 'converterDesc' },
  { path: '/challenge', icon: '⚔️', titleKey: 'challenge', descKey: 'challengeDesc' },
  { path: '/match', icon: '🃏', titleKey: 'quickMatch', descKey: 'quickMatchDesc' },
];

export function HomeScreen() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-6">
      {/* Hero */}
      <div className="text-center mt-2">
        <div className="text-6xl mb-2">🏛️</div>
        <h2 className="font-roman text-2xl sm:text-3xl font-bold text-roman-dark">
          {t('appTitle')}
        </h2>
        <p className="text-roman-brown mt-1">{t('appSubtitle')}</p>
      </div>

      {/* Mode Cards */}
      <div className="w-full grid gap-4">
        {MODES.map((mode) => (
          <button
            key={mode.path}
            onClick={() => navigate(mode.path)}
            className="w-full flex items-center gap-4 p-5 bg-white/80 rounded-2xl border-2 border-gold/30 shadow-md
              hover:shadow-lg hover:border-gold hover:bg-white transition-all duration-200 active:scale-[0.98] text-left cursor-pointer"
          >
            <span className="text-4xl">{mode.icon}</span>
            <div>
              <div className="font-roman font-bold text-lg text-roman-dark">{t(mode.titleKey)}</div>
              <div className="text-sm text-roman-brown">{t(mode.descKey)}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
