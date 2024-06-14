import { useEffect, useRef } from 'react';

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
  const originalRender = useRef(true);
  
  if (document.title !== title) document.title = title;

  useEffect(() => {
    if (options) {
      if (options.restoreOnUnmount) {
        return () => {
          document.title = prevTitleRef.current;
        };
      } else if (options.restoreOriginalOnUnmount) {
        return () => {
          document.title = originalTitle;
        }
      } else {
        return;
      }
    }

    return;
  }, [title]);
}

export default typeof document !== 'undefined' ? useTitle : (_title: string) => {};
