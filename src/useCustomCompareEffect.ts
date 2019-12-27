import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

const isPrimitive = (val: any) => val !== Object(val);

type DepsEqualFnType = (prevDeps: DependencyList, nextDeps: DependencyList) => boolean;

const useCustomCompareEffect = (effect: EffectCallback, deps: DependencyList, depsEqual: DepsEqualFnType) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!deps || !deps.length) {
      console.warn('`useCustomCompareEffect` should not be used with no dependencies. Use React.useEffect instead.');
    }

    if (deps.every(isPrimitive)) {
      console.warn(
        '`useCustomCompareEffect` should not be used with dependencies that are all primitive values. Use React.useEffect instead.'
      );
    }

    if (typeof depsEqual !== 'function') {
      console.warn('`useCustomCompareEffect` should be used with depsEqual callback for comparing deps list');
    }
  }

  const ref = useRef<DependencyList | undefined>(undefined);

  if (!ref.current || !depsEqual(deps, ref.current)) {
    ref.current = deps;
  }

  useEffect(effect, ref.current);
};

export default useCustomCompareEffect;
