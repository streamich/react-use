import { useEffect, useMemo, useState } from 'react';
import { isBrowser, off, on } from '../misc/util';

export type BreakpointSelectors = { [name: string]: number };
export const defaultBreakpoints = { laptopL: 1440, laptop: 1024, tablet: 768 };
export type DefaultBreakpoints = typeof defaultBreakpoints;
export type DefaultBreakpointKeys = keyof DefaultBreakpoints;

export type CreateBreakpointFunction = {
  (breakpoints: undefined): () => DefaultBreakpointKeys;
  <T extends BreakpointSelectors>(breakpoints: T): () => keyof T;
}

const createBreakpoint: CreateBreakpointFunction = (breakpoints = defaultBreakpoints) => () => {
  const [screen, setScreen] = useState(isBrowser ? window.innerWidth : 0);
 
  useEffect(() => {
    const setSideScreen = (): void => {
      setScreen(window.innerWidth);
    };
    setSideScreen();
    on(window, 'resize', setSideScreen);
    return () => {
      off(window, 'resize', setSideScreen);
    };
  });
  const sortedBreakpoints = useMemo(
    () => Object.entries(breakpoints).sort((a, b) => (a[1] >= b[1] ? 1 : -1)),
    [breakpoints]
  );
  const result = sortedBreakpoints.reduce((acc, [name, width]) => {
    if (screen >= width) {
      return name;
    } else {
      return acc;
    }
  }, sortedBreakpoints[0][0]);
  return result;
};

export default createBreakpoint;