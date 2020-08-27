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
      setChildren(Array.prototype.slice.call(scrollContainer.children))
    }
  }, [ref])

  useEffect(() => {
    const scrollContainer = ref.current;

    const handleScroll = (isScrollingUp: boolean) => {
      const scrollContainer = ref.current;
      if (!scrollContainer) {
        return
      }
      let index = indexChildren;

      if (isScrollingUp) {
        index = indexChildren > 0 ? indexChildren - 1 : indexChildren;
        const heightToScroll = scrollStepSize === 0 ? children[index].clientHeight : scrollStepSize

        setScrollTop(scrollTop => {
          const hasNotReachBottomScroll = scrollTop - heightToScroll >= 0
          return hasNotReachBottomScroll
            ? scrollTop - heightToScroll
            : 0
        });
      } else {
        const hasNotReachEndScroll = scrollContainer.scrollHeight > scrollContainer.scrollTop + scrollContainer.clientHeight
        const heightToScroll = scrollStepSize === 0 ? children[index].clientHeight : scrollStepSize

        setScrollTop(scrollTop => {
          return hasNotReachEndScroll
            ? scrollTop + heightToScroll
            : scrollTop
        });
        index = hasNotReachEndScroll ? indexChildren + 1 : indexChildren
      }
      setIndexChildren(index)
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
  }, [ref, scrollTop, scrollStepSize, children, indexChildren]);

  return [scrollTop, setScrollTop];
};

export default useScrollStepSize;
