import {useState, useEffect} from './react';
import {on, off} from './util';

const isClient = typeof window === 'object';

const useLocalStorage = (key: string): string | undefined => {
  if (!isClient) {
    return undefined;
  }

  const [state, setState] = useState<string | undefined>(undefined);

  useEffect(() => {
    try {
      setState(localStorage[key]);
    } catch {}

    const onChange = (event) => {
      console.log('onChange')
      if (event.key === key) {
        setState(event.newValue);
      }
    }

    on(window, 'storage', onChange);

    return () => {
      off(window, 'storage', onChange);
    };
  }, [key]);

  return state;
};

export default useLocalStorage;
