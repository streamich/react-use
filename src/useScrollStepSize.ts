import { useEffect, Dispatch, SetStateAction, useState } from 'react';

import useRafState from './useRafState';

const useScrollStepSize = (
  ref: React.RefObject<HTMLElement>,
  scrollStepSize: number = 0
): [number, Dispatch<SetStateAction<number>>] => {
  const [scrollTop, setScrollTop] = useRafState<number>(0);
  const [children, setChildren] = useState<HTMLElement[]>([]);
  const [indexChildren, setIndexChildren] = useState<number>(0);

  useEffect(() => {
    if (scrollStepSize < 0) {
      throw new Error(`itemHeight should not be less than 0.`);
    }
  }, [scrollStepSize]);

  useEffect(() => {
    const scrollContainer = ref.current;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollTop;
      setChildren(Array.prototype.slice.call(scrollContainer.children))
    }
  }, [ref, scrollTop]);

  useEffect(() => {
  }, [children])

  useEffect(() => {
    const scrollContainer = ref.current;

    const handleScroll = (isScrollingUp: boolean): void => {
      if (isScrollingUp) {
        const newIndex = indexChildren > 0 ? indexChildren - 1 : indexChildren;
        setScrollTop(currentScrollTop => {
          if (scrollStepSize !== 0 && currentScrollTop - scrollStepSize >= 0) {
            return currentScrollTop - scrollStepSize;
          } else if (scrollStepSize === 0 && currentScrollTop - (children[newIndex].clientHeight || 0) >= 0) {
            return currentScrollTop - (children[newIndex].clientHeight || 0);
          }
          return currentScrollTop;
        });
        setIndexChildren(newIndex);
      } else {
        const hasNotReachEndScroll = scrollContainer!.scrollHeight > scrollContainer!.scrollTop + scrollContainer!.clientHeight
        setScrollTop(currentScrollTop => {
          if (hasNotReachEndScroll) {
            return currentScrollTop + (scrollStepSize === 0 ? (children[indexChildren]?.clientHeight || 0) : scrollStepSize);
          }
          return currentScrollTop;
        });
        setIndexChildren(hasNotReachEndScroll ? indexChildren + 1 : indexChildren)
      }
    };

    const onScroll = (event: Event): boolean => {
      const element = event.srcElement as HTMLElement;
      const newScrollTop = element.scrollTop;

      if (scrollTop > newScrollTop) {
        handleScroll(true);
      } else if (scrollTop < newScrollTop) {
        handleScroll(false);
      }
      return false;
    };

    const onWheel = (event: WheelEvent): boolean => {
      if (event.shiftKey) {
        return true;
      } else if (event.deltaY > 0) {
        handleScroll(false);
      } else {
        handleScroll(true);
      }
      return false;
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', onScroll, { capture: false, passive: true });
      scrollContainer.addEventListener('wheel', onWheel, { capture: false, passive: true });
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', onScroll);
        scrollContainer.removeEventListener('wheel', onWheel);
      }
    };
  }, [ref, scrollTop, setScrollTop, scrollStepSize, indexChildren, children]);

  return [scrollTop, setScrollTop];
};

export default useScrollStepSize;
