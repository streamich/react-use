import { useEffect, DependencyList, EffectCallback } from 'react';
import { useFirstMountState } from './useFirstMountState';

const useUpdateEffect = (effect: EffectCallback, deps: DependencyList): void => {
  const isFirstMount = useFirstMountState();

  useEffect(() => {
    if (!isFirstMount) {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useUpdateEffect;
