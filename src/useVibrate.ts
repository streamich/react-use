import { useEffect } from 'react';

export type VibrationPattern = number | number[];

const isVibrationApiSupported = typeof navigator === 'object' && 'vibrate' in navigator;

const useVibrateMock = () => {};

function useVibrate(enabled: boolean = true, pattern: VibrationPattern = [1000, 1000], loop: boolean = true): void {
  useEffect(() => {
    let interval;

    if (enabled) {
      navigator.vibrate(pattern);

      if (loop) {
        const duration = pattern instanceof Array ? pattern.reduce((a, b) => a + b) : (pattern as number);

        interval = setInterval(() => {
          navigator.vibrate(pattern);
        }, duration);
      }
    }

    return () => {
      if (enabled) {
        navigator.vibrate(0);

        if (loop) {
          clearInterval(interval);
        }
      }
    };
  }, [enabled]);
}

export default isVibrationApiSupported ? useVibrate : useVibrateMock;
