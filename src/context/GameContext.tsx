import { createContext, useContext, useReducer, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface UnlockedLevels {
  converter: number[];
  challenge: number[];
  match: number[];
}

interface GameState {
  soundEnabled: boolean;
  tutorialComplete: boolean;
  unlockedLevels: UnlockedLevels;
  highScores: Record<string, number>;
  bestStreaks: Record<string, number>;
  bestTimes: Record<string, number>;
}

type GameAction =
  | { type: 'TOGGLE_SOUND' }
  | { type: 'COMPLETE_TUTORIAL' }
  | { type: 'UNLOCK_LEVEL'; mode: keyof UnlockedLevels; level: number }
  | { type: 'SET_HIGH_SCORE'; key: string; score: number }
  | { type: 'SET_BEST_STREAK'; key: string; streak: number }
  | { type: 'SET_BEST_TIME'; key: string; time: number };

const DEFAULT_STATE: GameState = {
  soundEnabled: true,
  tutorialComplete: false,
  unlockedLevels: {
    converter: [1],
    challenge: [1],
    match: [1],
  },
  highScores: {},
  bestStreaks: {},
  bestTimes: {},
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'TOGGLE_SOUND':
      return { ...state, soundEnabled: !state.soundEnabled };
    case 'COMPLETE_TUTORIAL':
      return { ...state, tutorialComplete: true };
    case 'UNLOCK_LEVEL': {
      const current = state.unlockedLevels[action.mode];
      if (current.includes(action.level)) return state;
      return {
        ...state,
        unlockedLevels: {
          ...state.unlockedLevels,
          [action.mode]: [...current, action.level],
        },
      };
    }
    case 'SET_HIGH_SCORE': {
      const prev = state.highScores[action.key] ?? 0;
      if (action.score <= prev) return state;
      return { ...state, highScores: { ...state.highScores, [action.key]: action.score } };
    }
    case 'SET_BEST_STREAK': {
      const prev = state.bestStreaks[action.key] ?? 0;
      if (action.streak <= prev) return state;
      return { ...state, bestStreaks: { ...state.bestStreaks, [action.key]: action.streak } };
    }
    case 'SET_BEST_TIME': {
      const prev = state.bestTimes[action.key] ?? Infinity;
      if (action.time >= prev) return state;
      return { ...state, bestTimes: { ...state.bestTimes, [action.key]: action.time } };
    }
    default:
      return state;
  }
}

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [persisted, setPersisted] = useLocalStorage<GameState>('roman-game', DEFAULT_STATE);

  const [state, rawDispatch] = useReducer(gameReducer, persisted);

  const dispatch = (action: GameAction) => {
    rawDispatch(action);
    // Persist after dispatch — use reducer to compute next state
    setPersisted((prev) => gameReducer(prev, action));
  };

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
