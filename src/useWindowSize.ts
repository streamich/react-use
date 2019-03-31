import {useState, useEffect} from 'react';
import {isClient} from './util';

const useWindowSize = (initialWidth = Infinity, initialHeight = Infinity) => {
  const [state, setState] = useState<{width: number, height: number}>({
    width: isClient ? window.innerWidth : initialWidth,
    height: isClient ? window.innerHeight : initialHeight,
  });

  useEffect(() => {
    if (isClient) {
      const handler = () => {
        setState({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };
      window.addEventListener('resize', handler);
      return () => window.removeEventListener('resize', handler);
    } else {
      return undefined;
    }
  }, []);

  return state;
};

export default useWindowSize;
