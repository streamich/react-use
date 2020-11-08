import { useEffect, Dispatch, SetStateAction, useState } from 'react';

import { useRafState } from '.';

const useScrollStepSize = (
  ref: React.RefObject<HTMLElement>,
  scrollStepSize: number = 0
): [number, Dispatch<SetStateAction<number>>] => {
  const [scrollTop, setScrollTop] = useRafState<number>(0);
  const [children, setChildren] = useState<HTMLElement[]>([]);
  const [indexChildren, setIndexChildren] = useRafState<number>(0);

  useEffect(() => {
    if (scrollStepSize < 0) {
      throw new Error(`Item height should not be less than 0.`);
    }
  }, [scrollStepSize]);

  useEffect(() => {
    const scrollContainer = ref.current;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollTop;
    }
  }, [ref, scrollTop]);

  useEffect(() => {
    const scrollContainer = ref.current;
    if (scrollContainer) {
      setChildren(Array.prototype.slice.call(scrollContainer.children));
    }
  }, [ref]);

  useEffect(() => {
    const scrollContainer = ref.current;

    const handleScroll = (isScrollingUp: boolean) => {
      const scrollContainer = ref.current;
      if (!scrollContainer) {
        return;
      }
      let index = indexChildren;

      if (isScrollingUp) {
        index = indexChildren > 0 ? indexChildren - 1 : indexChildren;
        const heightToScroll = scrollStepSize === 0 ? children[index].clientHeight : scrollStepSize;

        setScrollTop((scrollTop) => {
          const reachInitScroll = scrollTop - heightToScroll < 0;
          return reachInitScroll ? 0 : scrollTop - heightToScroll;
        });
      } else {
        const reachEndScroll = scrollTop + scrollContainer.clientHeight > scrollContainer.scrollHeight;
        if (reachEndScroll) return;

        const heightToScroll = scrollStepSize === 0 ? children[index].clientHeight : scrollStepSize;
        setScrollTop((scrollTop) => {
          return reachEndScroll ? scrollTop : scrollTop + heightToScroll;
        });
        index = reachEndScroll ? indexChildren : indexChildren + 1;
      }
      setIndexChildren(index);
    };

    const onScroll = (event: Event): boolean => {
      const element = event.target as HTMLElement;
      const newScrollTop = element.scrollTop;

      if (scrollTop > newScrollTop) {
        handleScroll(true);
      } else if (scrollTop < newScrollTop) {
        handleScroll(false);
      }
      return false;
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', onScroll, { capture: false, passive: true });
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', onScroll);
      }
    };
  }, [ref, scrollTop, scrollStepSize, children, indexChildren, setIndexChildren, setScrollTop]);

  return [scrollTop, setScrollTop];
};

export default useScrollStepSize;
