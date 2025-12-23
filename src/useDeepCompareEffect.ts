import { DependencyList, EffectCallback } from 'react';
import useCustomCompareEffect from './useCustomCompareEffect';
import isDeepEqual from './misc/isDeepEqual';

const useDeepCompareEffect = (effect: EffectCallback, deps: DependencyList) => {
  useCustomCompareEffect(effect, deps, isDeepEqual);
};

export default useDeepCompareEffect;
