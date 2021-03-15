import { useEffect, EffectCallback } from 'react';

export const useConditionalEffect = (
  condition: boolean,
  effect: EffectCallback,
  dependencies: any[]
) => {
  useEffect(() => {
    if (condition) {
      return effect();
    }
    return undefined;
  }, [condition, ...dependencies]);
};
