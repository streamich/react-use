import { EffectCallback, useEffect, useRef } from 'react';

const useEffectOnce = (effect: EffectCallback) => {
  const hasExecuted = useRef(false);

  useEffect(() => {
    if (hasExecuted.current) {
      return;
    }

    hasExecuted.current = true;
    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useEffectOnce;
