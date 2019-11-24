import { useEffect } from 'react';
import { useFirstMountState } from './useFirstMountState';

const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirstMount = useFirstMountState();

  useEffect(() => {
    !isFirstMount && effect();
  }, deps);
};

export default useUpdateEffect;
