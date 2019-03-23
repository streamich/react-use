import {useRef, useEffect} from 'react';
import {isClient} from './util';
import useUnmount from './useUnmount';

const useLockBodyScroll = (enabled: boolean = true) => {
  const originalOverflow = useRef(
    isClient ? window.getComputedStyle(document.body).overflow : 'visible'
  );

  useEffect(() => {
    document.body.style.overflow = enabled ? "hidden" : originalOverflow.current;
  }, [enabled]);

  useUnmount(() => {
    document.body.style.overflow = originalOverflow.current
  });
}

export default useLockBodyScroll;
