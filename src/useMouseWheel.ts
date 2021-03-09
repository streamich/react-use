import { useEffect, useState } from 'react';
import { off, on } from './misc/util';

export default () => {
  const [mouseWheelScrolled, setMouseWheelScrolled] = useState(0);
  useEffect(() => {
    const updateScroll = (e: MouseWheelEvent) => {
      setMouseWheelScrolled(e.deltaY + mouseWheelScrolled);
    };
    on(window, 'wheel', updateScroll, false);
    return () => off(window, 'wheel', updateScroll);
  });
  return mouseWheelScrolled;
};
