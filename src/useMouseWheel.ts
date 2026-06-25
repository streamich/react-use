import { useEffect } from 'react';

import useRafState from './useRafState';
import { off, on } from './misc/util';

export default () => {
  const [mouseWheelScrolled, setMouseWheelScrolled] = useRafState(0);
  useEffect(() => {
    const updateScroll = (e: MouseWheelEvent) => {
      setMouseWheelScrolled(e.deltaY + mouseWheelScrolled);
    };
    on(window, 'wheel', updateScroll, false);
    return () => off(window, 'wheel', updateScroll);
  });
  return mouseWheelScrolled;
};
