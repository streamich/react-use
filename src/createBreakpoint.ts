import { useEffect, useState, useMemo } from 'react';

const createBreakpoint = (
  breakpoints: { [name: string]: number } = { laptopL: 1440, laptop: 1024, tablet: 768 }
) => () => {
  const [screen, setScreen] = useState(0);
  const NAME = 0;
  const WIDTH = 1;

  useEffect(() => {
    const setSideScreen = (): void => {
      setScreen(window.innerWidth);
    };
    setSideScreen();
    window.addEventListener('resize', setSideScreen);
    return () => {
      window.removeEventListener('resize', setSideScreen);
    };
  });

  const sortedBreakpoints = useMemo(() => Object.entries(breakpoints).sort((a, b) => (a[WIDTH] >= b[WIDTH] ? 1 : -1)), [
    breakpoints,
  ]);

  const result =
    sortedBreakpoints.find(([_, width]) => width >= screen) || sortedBreakpoints[sortedBreakpoints.length - 1];
  return result[NAME];
};

export default createBreakpoint;
