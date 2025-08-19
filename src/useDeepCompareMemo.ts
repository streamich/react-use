import { DependencyList } from 'react';
import { isDeepEqual } from './util';
import useCustomCompareMemo from './useCustomCompareMemo';

const isPrimitive = (val: any) => val !== Object(val);

const useDeepCompareMemo = <T>(factory: () => T, deps: DependencyList): T => {
  if (process.env.NODE_ENV !== 'production') {
    if (!(deps instanceof Array) || !deps.length) {
      console.warn('`useDeepCompareMemo` should not be used with no dependencies. Use React.useMemo instead.');
    }

    if (deps.every(isPrimitive)) {
      console.warn(
        '`useDeepCompareMemo` should not be used with dependencies that are all primitive values. Use React.useMemo instead.'
      );
    }
  }

  return useCustomCompareMemo(factory, deps, isDeepEqual);
};

export default useDeepCompareMemo;
