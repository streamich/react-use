import {useState, useEffect} from 'react';
import useMount from './useMount';

const useKeyboardJs = (combination: string) => {
  const [state, set] = useState(false);
  const [keyboardJs, setKeyboardJs] = useState<any>(null);

  useMount(() => {
    import('keyboardjs').then(setKeyboardJs);
  });

  useEffect(() => {
    if (!keyboardJs) return;

    const down = () => set(true);
    const up = () => set(false);
    keyboardJs.bind(combination, down, up);

    return () => {
      keyboardJs.unbind(combination, down, up);
    };
  }, [combination, keyboardJs]);

  return state;
};

export default useKeyboardJs;
