import {useEffect, EffectCallback} from 'react';

const useEffectOnce = (effect: EffectCallback) => {
  useEffect(effect, []);
}

export default useEffectOnce;
