import { useState } from 'react';
import useKey, { KeyFilter } from './useKey';

const useKeyPress = (keyFilter: KeyFilter) => {
  const [state, set] = useState<[boolean, null | KeyboardEvent]>([false, null]);
  useKey(keyFilter, (event) => set([true, event]), { event: 'keydown' }, [state]);
  useKey(keyFilter, (event) => set([false, event]), { event: 'keyup' }, [state]);
  return state;
};

export default useKeyPress;
