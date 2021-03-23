import { useEffect, EffectCallback, DependencyList } from 'react';

const FALSE_DEP_ARRAY = [{}]

export const useConditionalEffect = (
  condition: boolean,
  effect: EffectCallback,
  dependencies: DependencyList | undefined
) => {
  useEffect(() => {
    if (condition) {
      return effect();
    }
    return undefined;
  }, condition ? dependencies : FALSE_DEP_ARRAY);
};
