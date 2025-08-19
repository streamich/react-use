import { useEffect } from 'react';

type EffectCallbackWithTimestamp = (time: number) => (time: number) => void | undefined | void;

const useRafEffect = (effectFn: EffectCallbackWithTimestamp, deps: any[]) => {
  useEffect(() => {
    let cleanupFn;
    window.requestAnimationFrame((time) => {
      cleanupFn = effectFn(time);
    });
    return () => {
      if (cleanupFn) {
        window.requestAnimationFrame((time) => {
          cleanupFn(time);
        });
      }
    };
  }, deps);
};

export default useRafEffect;
