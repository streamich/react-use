import {useState} from 'react';
import useKey, {KeyFilter} from './useKey';

const useKeyPress = (keyFilter: KeyFilter) => {
  const [isDown, set] = useState(false);
  useKey(keyFilter, () => set(true), {event: 'keydown'}, [isDown]);
  useKey(keyFilter, () => set(false), {event: 'keyup'}, [isDown]);
  return isDown;
};

export default useKeyPress;
