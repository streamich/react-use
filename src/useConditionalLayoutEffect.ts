import { useLayoutEffect, EffectCallback } from 'react';

export const useConditionalLayoutEffect = (
  condition: boolean,
  effect: EffectCallback,
  dependencies: any[]
) => {
  useLayoutEffect(() => {
    if (condition) {
      return effect();
    }
    return undefined;
  }, [condition, ...dependencies]);
};
