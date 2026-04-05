import { useCallback, useRef, useEffect } from 'react';
import { Howl } from 'howler';
import { useGame } from '../context/GameContext';

const SOUND_URLS: Record<string, string> = {
  correct: '/roman-numbers/sounds/correct.mp3',
  wrong: '/roman-numbers/sounds/wrong.mp3',
  flip: '/roman-numbers/sounds/flip.mp3',
  match: '/roman-numbers/sounds/match.mp3',
  fanfare: '/roman-numbers/sounds/fanfare.mp3',
  click: '/roman-numbers/sounds/click.mp3',
};

export function useSound() {
  const { state } = useGame();
  const soundsRef = useRef<Record<string, Howl>>({});

  useEffect(() => {
    // Pre-load sounds
    for (const [key, url] of Object.entries(SOUND_URLS)) {
      if (!soundsRef.current[key]) {
        soundsRef.current[key] = new Howl({ src: [url], volume: 0.5, preload: true });
      }
    }
  }, []);

  const play = useCallback(
    (name: string) => {
      if (!state.soundEnabled) return;
      const sound = soundsRef.current[name];
      if (sound) sound.play();
    },
    [state.soundEnabled]
  );

  return { play };
}
