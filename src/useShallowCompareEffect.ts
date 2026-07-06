import { DependencyList, EffectCallback } from 'react';
import { equal as isShallowEqual } from 'fast-shallow-equal';
import useCustomCompareEffect from './useCustomCompareEffect';

const shallowEqualDepsList = (prevDeps: DependencyList, nextDeps: DependencyList) =>
  prevDeps.every((dep, index) => isShallowEqual(dep, nextDeps[index]));

const useShallowCompareEffect = (effect: EffectCallback, deps: DependencyList) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!(deps instanceof Array) || !deps.length) {
      console.warn(
        '`useShallowCompareEffect` should not be used with no dependencies. Use React.useEffect instead.'
      );
    }
  }

  useCustomCompareEffect(effect, deps, shallowEqualDepsList);
};

export default useShallowCompareEffect;
