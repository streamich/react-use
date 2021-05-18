import { useEffect, useRef } from 'react';

export interface UseTitleOptions {
  restoreOnUnmount?: boolean;
}

const DEFAULT_USE_TITLE_OPTIONS: UseTitleOptions = {
  restoreOnUnmount: true,
};

function useTitle(title: string, options: UseTitleOptions = DEFAULT_USE_TITLE_OPTIONS) {
  const orignalTitleRef = useRef(document.title);
  useEffect(() => {
    if (options && options.restoreOnUnmount) {
      return () => {
        document.title = orignalTitleRef.current;
      };
    }
    return;
  }, []);

  useEffect(() => {
    document.title = title;
  }, [title]);
}

export default typeof document !== "undefined" ? useTitle : (_title: string) => {};
