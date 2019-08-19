import { useRef, useEffect, useState } from 'react';
import { isClient } from './util';

const useWindowSize = (initialWidth = Infinity, initialHeight = Infinity) => {
  const frame = useRef(0);
  const [state, setState] = useState<{ width: number; height: number }>({
    width: isClient ? window.innerWidth : initialWidth,
    height: isClient ? window.innerHeight : initialHeight,
  });

  useEffect(() => {
    if (isClient) {
      const handler = () => {
        cancelAnimationFrame(frame.current);

        frame.current = requestAnimationFrame(() => {
          setState({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        });
      };

      window.addEventListener('resize', handler);

      return () => {
        cancelAnimationFrame(frame.current);

        window.removeEventListener('resize', handler);
      };
    } else {
      return undefined;
    }
  }, []);

  return state;
};

export default useWindowSize;
