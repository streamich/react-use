import { useEffect } from 'react';

import useRafState from './useRafState';
import { isBrowser, off, on } from './misc/util';

// Define the type for options that can be passed to the hook
interface Options {
  initialWidth?: number; // Initial width of the window (Default value is Infinity)
  initialHeight?: number; // Initial height of the window (Default value is Infinity)
  onChange?: (width: number, height: number) => void; // Callback function to execute on window resize (optional)
}

const useWindowSize = ({
  initialWidth = Infinity,
  initialHeight = Infinity,
  onChange,
}: Options = {}) => {
  // Use the useRafState hook to maintain the current window size (width and height)
  const [state, setState] = useRafState<{ width: number; height: number }>({
    width: isBrowser ? window.innerWidth : initialWidth,
    height: isBrowser ? window.innerHeight : initialHeight,
  });

  useEffect((): (() => void) | void => {
    // Only run the effect on the browser (to avoid issues with SSR)
    if (isBrowser) {
      const handler = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Update the state with the new window size
        setState({
          width,
          height,
        });

        // If an onChange callback is provided, call it with the new dimensions
        if (onChange) onChange(width, height);
      };

      // Add event listener for the resize event
      on(window, 'resize', handler);

      // Cleanup function to remove the event listener when the component is unmounted (it's for performance optimization)
      return () => {
        off(window, 'resize', handler);
      };
    }
  }, []);

  // Return the current window size (width and height)
  return state;
};

export default useWindowSize;
