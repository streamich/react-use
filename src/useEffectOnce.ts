import {useRef, useEffect, EffectCallback} from 'react';

const useEffectOnce = (effect: EffectCallback) => {
  const didRun = useRef(false);

  useEffect(() => {
    if (!didRun.current) {
      didRun.current = true;
      return effect();
    }
  });
}

export default useEffectOnce;
