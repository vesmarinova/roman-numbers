import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';
import { SettingsPanel } from './SettingsPanel';

export function AppShell() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const isHome = location.pathname === '/' || location.pathname === '';

  return (
    <div className="min-h-dvh flex flex-col bg-gradient-to-b from-cream to-cream-dark">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-roman-dark text-cream shadow-lg">
        <div className="flex items-center gap-2">
          {!isHome && (
            <button
              onClick={() => navigate('/')}
              className="text-gold hover:text-gold-light text-xl p-1 cursor-pointer"
              aria-label={t('back')}
            >
              ←
            </button>
          )}
          <h1 className="font-roman text-lg sm:text-xl font-bold text-gold">
            {t('appTitle')}
          </h1>
        </div>
        <button
          onClick={() => setSettingsOpen(true)}
          className="text-xl p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          aria-label={t('settings')}
        >
          ⚙️
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center px-4 py-6 overflow-y-auto">
        <Outlet />
      </main>

      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
