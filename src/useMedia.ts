import { useEffect, useState } from 'react';
import { isBrowser, on, off } from './misc/util';

const getInitialState = (query: string, defaultState?: boolean) => {
  // Prevent a React hydration mismatch when a default value is provided by not defaulting to window.matchMedia(query).matches.
  if (defaultState !== undefined) {
    return defaultState;
  }

  if (isBrowser) {
    return window.matchMedia(query).matches;
  }

  // A default value has not been provided, and you are rendering on the server, warn of a possible hydration mismatch when defaulting to false.
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      '`useMedia` When server side rendering, defaultState should be defined to prevent a hydration mismatches.'
    );
  }

  return false;
};

const useMedia = (query: string, defaultState?: boolean) => {
  const [state, setState] = useState(getInitialState(query, defaultState));

  useEffect(() => {
    let mounted = true;
    const handler = () => {
      if (!mounted) {
        return;
      }
      setState(window.matchMedia(query).matches);
    };

    on(window, `resize`, handler);

    return () => {
      mounted = false;
      off(window, `resize`, handler);
    };
  }, [query]);

  return state;
};

export default useMedia;
