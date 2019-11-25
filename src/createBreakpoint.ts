import { useEffect, useState, useMemo } from 'react';

interface Screen {
  laptopL: number;
  laptop: number;
  tablet: number;
}

enum ScreenSize {
  LAPTOPL = 1440,
  LAPTOP = 1024,
  TABLET = 768,
}

const NAME = 0;
const WIDTH = 1;

const createBreakpoint = (
  breakpoints: Screen = {
    laptopL: ScreenSize.LAPTOPL,
    laptop: ScreenSize.LAPTOP,
    tablet: ScreenSize.TABLET,
  }
) => () => {
  const [screen, setScreen] = useState(0);

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

  const sortedBreakpoints = useMemo(
    (): [string, number][] => Object.entries(breakpoints).sort((a, b) => (a[WIDTH] >= b[WIDTH] ? 1 : -1)),
    [breakpoints]
  );

  const result =
    sortedBreakpoints.find(([_, width]) => width >= screen) || sortedBreakpoints[sortedBreakpoints.length - 1];
  return result[NAME];
};

export default createBreakpoint;
