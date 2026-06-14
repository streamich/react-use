import { useEffect, useRef } from 'react';

export interface UseTitleOptions {
  restoreOnUnmount?: boolean;
}

const DEFAULT_USE_TITLE_OPTIONS: UseTitleOptions = {
  restoreOnUnmount: false,
};

function useTitle(title: string, options: UseTitleOptions = DEFAULT_USE_TITLE_OPTIONS) {
  const prevTitleRef = useRef(document.title);

  if (document.title !== title) document.title = title;

  useEffect(() => {
    const curTitleRef = prevTitleRef.current;
    if (options && options.restoreOnUnmount) {
      return () => {
        document.title = curTitleRef;
      };
    } else {
      return;
    }
  }, [options]);
}

export default typeof document !== 'undefined' ? useTitle : (_title: string) => {};
