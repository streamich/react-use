import { DependencyList } from 'react';
import { equal as isShallowEqual } from 'fast-shallow-equal';
import useCustomCompareMemo from './useCustomCompareMemo';

const isPrimitive = (val: any) => val !== Object(val);
const shallowEqualDepsList = (prevDeps: DependencyList, nextDeps: DependencyList) =>
  prevDeps.every((dep, index) => isShallowEqual(dep, nextDeps[index]));

const useShallowCompareMemo = <T>(factory: () => T, deps: DependencyList): T => {
  if (process.env.NODE_ENV !== 'production') {
    if (!(deps instanceof Array) || !deps.length) {
      console.warn('`useShallowCompareMemo` should not be used with no dependencies. Use React.useMemo instead.');
    }

    if (deps.every(isPrimitive)) {
      console.warn(
        '`useShallowCompareMemo` should not be used with dependencies that are all primitive values. Use React.useMemo instead.'
      );
    }
  }

  return useCustomCompareMemo(factory, deps, shallowEqualDepsList);
};

export default useShallowCompareMemo;
