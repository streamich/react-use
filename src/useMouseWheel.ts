import { useEffect, useState } from 'react';
import { off, on } from './misc/util';

const useMouseWheel = () => {
  const [mouseWheelScrolled, setMouseWheelScrolled] = useState(0);
  useEffect(() => {
    const updateScroll = (e: WheelEvent) => {
      setMouseWheelScrolled(e.deltaY + mouseWheelScrolled);
    };
    on(window, 'wheel', updateScroll, false);
    return () => off(window, 'wheel', updateScroll);
  });
  return mouseWheelScrolled;
};

export default useMouseWheel;
