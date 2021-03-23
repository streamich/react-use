import { useLayoutEffect, EffectCallback } from 'react';

const FALSE_DEP_ARRAY = [{}]

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
  }, condition ? dependencies : FALSE_DEP_ARRAY);
};
