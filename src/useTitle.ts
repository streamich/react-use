import { useEffect, useMemo, useRef } from 'react';

export interface UseTitleOptions {
  restoreOnUnmount?: boolean;
  restoreOriginalOnUnmount?: boolean;
}

const DEFAULT_USE_TITLE_OPTIONS: UseTitleOptions = {
  restoreOnUnmount: false,
  restoreOriginalOnUnmount: false,
};

function useTitle(title: string, options: UseTitleOptions = DEFAULT_USE_TITLE_OPTIONS) {
  const prevTitleRef = useRef(document.title);
  const originalTitle = useMemo(() => document.title, []);

  if (document.title !== title) document.title = title;

  useEffect(() => {
    
    if (options && options.restoreOnUnmount && !options.restoreOriginalOnUnmount) {
      return () => {
        document.title = prevTitleRef.current;
      };
    } else if (options && options.restoreOriginalOnUnmount && !options.restoreOnUnmount) {
      return () => {
        document.title = originalTitle;
      }
    } else {
      return;
    }
  }, []);
}

export default typeof document !== 'undefined' ? useTitle : (_title: string) => {};
