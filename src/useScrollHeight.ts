import { RefObject, useEffect, useState } from 'react';

export const useScrollHeight = (ref: RefObject<HTMLElement>): number => {
  const [scrollHeight, setScrollHeight] = useState<number>(0);

  useEffect(() => {
    if (!ref.current) return;

    setScrollHeight(ref.current.scrollHeight);
    const observer = new MutationObserver(() => {
      ref.current && setScrollHeight(ref.current.scrollHeight);
    });

    observer.observe(ref.current, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [ref]);

  return scrollHeight;
};
