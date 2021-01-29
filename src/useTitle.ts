import { useRef, useEffect } from 'react';
export interface UseTitleOptions {
  restoreOnUnmount?: boolean;
}
const DEFAULT_USE_TITLE_OPTIONS: UseTitleOptions = {
  restoreOnUnmount: false,
};
function useTitle(title: string, options: UseTitleOptions = DEFAULT_USE_TITLE_OPTIONS) {
  const optionsRef = useRef(options);
  const prevTitleRef = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    const prevTitle = prevTitleRef.current;
    return () => {
      if (optionsRef.current && optionsRef.current.restoreOnUnmount) {
        document.title = prevTitle;
      }
    };
  }, []);
}

export default typeof document !== 'undefined' ? useTitle : (_title: string) => {};
