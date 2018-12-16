import {useState, useEffect} from 'react';

const isClient = typeof window === 'object';

const useWindowSize = (initialWidth = Infinity, initialHeight = Infinity) => {
  const [state, setState] = useState<{width: number, height: number}>({
    width: isClient ? window.innerWidth : initialWidth,
    height: isClient ? window.innerHeight : initialHeight,
  });

  useEffect(() => {
    const handler = () => {
      setState({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [1]);

  return state;
};

export default useWindowSize;
