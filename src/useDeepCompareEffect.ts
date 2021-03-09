import { DependencyList, EffectCallback } from 'react';
import useCustomCompareEffect from './useCustomCompareEffect';
import isDeepEqual from './misc/isDeepEqual';

const isPrimitive = (val: any) => val !== Object(val);

const useDeepCompareEffect = (effect: EffectCallback, deps: DependencyList) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!(deps instanceof Array) || !deps.length) {
      console.warn(
        '`useDeepCompareEffect` should not be used with no dependencies. Use React.useEffect instead.'
      );
    }

    if (deps.every(isPrimitive)) {
      console.warn(
        '`useDeepCompareEffect` should not be used with dependencies that are all primitive values. Use React.useEffect instead.'
      );
    }
  }

  useCustomCompareEffect(effect, deps, isDeepEqual);
};

export default useDeepCompareEffect;
