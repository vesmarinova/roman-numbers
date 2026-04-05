import { useState, useRef, useCallback, useEffect } from 'react';

interface UseTimerOptions {
  mode: 'countdown' | 'elapsed';
  initialSeconds: number;
  onComplete?: () => void;
  autoStart?: boolean;
}

export function useTimer({ mode, initialSeconds, onComplete, autoStart = false }: UseTimerOptions) {
  const [seconds, setSeconds] = useState(mode === 'countdown' ? initialSeconds : 0);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const stop = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const reset = useCallback(() => {
    stop();
    setSeconds(mode === 'countdown' ? initialSeconds : 0);
  }, [stop, mode, initialSeconds]);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (mode === 'countdown') {
          if (prev <= 1) {
            stop();
            onCompleteRef.current?.();
            return 0;
          }
          return prev - 1;
        }
        return prev + 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, mode, stop]);

  return { seconds, isRunning, start, stop, reset };
}
