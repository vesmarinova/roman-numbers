import { useLanguage } from '../../context/LanguageContext';
import { useGame } from '../../context/GameContext';

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
}

export function SettingsPanel({ open, onClose }: SettingsPanelProps) {
  const { lang, toggleLanguage, t } = useLanguage();
  const { state, dispatch } = useGame();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center bg-black/30" onClick={onClose}>
      <div
        className="bg-cream rounded-t-3xl sm:rounded-3xl w-full sm:max-w-sm p-6 shadow-2xl border-t-4 sm:border-4 border-gold"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-roman text-xl font-bold text-roman-dark">{t('settings')}</h2>
          <button onClick={onClose} className="text-2xl text-roman-brown hover:text-roman-dark cursor-pointer">✕</button>
        </div>

        {/* Language */}
        <div className="flex items-center justify-between py-3 border-b border-gold/20">
          <span className="text-roman-dark font-medium">{t('language')}</span>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gold/40 shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <span className="text-xl">{lang === 'en' ? '🇬🇧' : '🇧🇬'}</span>
            <span className="font-medium">{lang === 'en' ? 'English' : 'Български'}</span>
          </button>
        </div>

        {/* Sound */}
        <div className="flex items-center justify-between py-3">
          <span className="text-roman-dark font-medium">{t('sound')}</span>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_SOUND' })}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gold/40 shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <span className="text-xl">{state.soundEnabled ? '🔊' : '🔇'}</span>
            <span className="font-medium">{state.soundEnabled ? t('soundOn') : t('soundOff')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
