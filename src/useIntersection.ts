import { RefObject, useEffect, useState } from 'react';

const useIntersection = (
  ref: RefObject<HTMLElement>,
  options: IntersectionObserverInit
): IntersectionObserverEntry | null => {
  const [intersectionObserverEntry, setIntersectionObserverEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const intersect = (): (() => void) => {
      if (ref.current) {
        const handler = (entries: IntersectionObserverEntry[]) => {
          setIntersectionObserverEntry(entries[0]);
        };

        const observer = new IntersectionObserver(handler, options);
        observer.observe(ref.current);

        return () => {
          if (ref.current) {
            observer.disconnect();
          }
        };
      }
      return () => {};
    };
    return intersect();
  }, [ref, options.threshold, options.root, options.rootMargin, options]);

  return intersectionObserverEntry;
};

export default useIntersection;
