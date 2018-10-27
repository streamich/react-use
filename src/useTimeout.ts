import {useState, useEffect} from './react';

const useTimeout = (ms: number = 0) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      setReady(true);
    }, ms);

    return () => {
      clearTimeout(timer);
    };
  });

  return ready;
};

export default useTimeout;
