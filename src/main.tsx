import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import { GameProvider } from './context/GameContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </LanguageProvider>
  </StrictMode>,
);
