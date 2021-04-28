import { useEffect, useState } from 'react';
import useMountedState from './useMountedState';
import { isBrowser } from './misc/util';

const useMedia = (query: string, defaultState: boolean = false) => {
  const [state, setState] = useState(
    isBrowser ? () => window.matchMedia(query).matches : defaultState
  );
  const isMounted = useMountedState();

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => {
      if (!isMounted()) {
        return;
      }
      setState(!!mql.matches);
    };

    mql.addListener(onChange);
    setState(mql.matches);

    return () => {
      mql.removeListener(onChange);
    };
  }, [query]);

  return state;
};

export default useMedia;
