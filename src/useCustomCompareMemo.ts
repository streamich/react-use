import { DependencyList, useMemo, useRef } from 'react';

const isPrimitive = (val: any) => val !== Object(val);

type DepsEqualFnType = (prevDeps: DependencyList, nextDeps: DependencyList) => boolean;

const useCustomCompareMemo = <T>(factory: () => T, deps: DependencyList, depsEqual: DepsEqualFnType): T => {
  if (process.env.NODE_ENV !== 'production') {
    if (!(deps instanceof Array) || !deps.length) {
      console.warn('`useCustomCompareMemo` should not be used with no dependencies. Use React.useMemo instead.');
    }

    if (deps.every(isPrimitive)) {
      console.warn(
        '`useCustomCompareMemo` should not be used with dependencies that are all primitive values. Use React.useMemo instead.'
      );
    }

    if (typeof depsEqual !== 'function') {
      console.warn('`useCustomCompareMemo` should be used with depsEqual callback for comparing deps list');
    }
  }

  const ref = useRef<DependencyList | undefined>(undefined);

  if (!ref.current || !depsEqual(deps, ref.current)) {
    ref.current = deps;
  }

  return useMemo(factory, ref.current);
};

export default useCustomCompareMemo;
