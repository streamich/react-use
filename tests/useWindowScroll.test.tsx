import React, { useEffect } from 'react';
import { render, act as reactAct } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import { replaceRaf } from 'raf-stub';

import useWindowScroll from '../src/useWindowScroll';

declare var requestAnimationFrame: {
  reset: () => void;
  step: (steps?: number, duration?: number) => void;
};

describe('useWindowScroll', () => {
  beforeAll(() => {
    replaceRaf();
  });

  afterEach(() => {
    requestAnimationFrame.reset();
  });

  it('should be defined', () => {
    expect(useWindowScroll).toBeDefined();
  });

  function getHook() {
    return renderHook(() => {
      return useWindowScroll();
    });
  }

  function setWindowScroll(x: number, y: number) {
    (window.pageXOffset as number) = x;
    (window.pageYOffset as number) = y;
  }

  function triggerScroll(dimension: 'x' | 'y', value: number) {
    if (dimension === 'x') {
      (window.pageXOffset as number) = value;
    } else if (dimension === 'y') {
      (window.pageYOffset as number) = value;
    }

    window.dispatchEvent(new Event('scroll'));
  }

  it('should return window scroll value at mount time', () => {
    setWindowScroll(1, 2);

    const hook = getHook();

    expect(hook.result.current).toEqual({
      x: 1,
      y: 2,
    });
  });

  it('should re-render after X scroll change on closest RAF', () => {
    setWindowScroll(1, 2);
    const hook = getHook();

    act(() => {
      triggerScroll('x', 100);
      expect(hook.result.current.x).toBe(1);

      requestAnimationFrame.step();
    });

    expect(hook.result.current.x).toBe(100);

    act(() => {
      triggerScroll('x', 1000);
      expect(hook.result.current.x).toBe(100);
      requestAnimationFrame.step();
    });

    expect(hook.result.current.x).toBe(1000);
  });

  it('should re-render after Y scroll change on closest RAF', () => {
    setWindowScroll(1, 2);
    const hook = getHook();

    act(() => {
      triggerScroll('y', 200);
      expect(hook.result.current.y).toBe(2);
      requestAnimationFrame.step();
    });

    expect(hook.result.current.y).toBe(200);

    act(() => {
      triggerScroll('y', 300);
      expect(hook.result.current.y).toBe(200);
      requestAnimationFrame.step();
    });

    expect(hook.result.current.y).toBe(300);
  });

  it('should set window scroll in mount effect, just before subscription, to prevent losing scroll change between render and mount', () => {
    const initialScroll = { x: 1, y: 2 };
    const afterRenderScroll = { x: 2, y: 3 };
    const result = {
      x: 0,
      y: 0,
    };

    setWindowScroll(initialScroll.x, initialScroll.y);

    const TestComponent = () => {
      useEffect(() => {
        // Simulate window scroll changing between component render and useWindowScroll effect handler,
        // before adding the event listener
        setWindowScroll(afterRenderScroll.x, afterRenderScroll.y);
      }, []);

      const { x, y } = useWindowScroll();
      result.x = x;
      result.y = y;
      return <div />;
    };

    const { rerender } = render(<TestComponent />);
    rerender(<TestComponent />);

    //result update is delayed by requestAnimationFrame
    expect(result).toEqual(initialScroll);

    reactAct(() => {
      requestAnimationFrame.step();
    });

    //result is updated next requestAnimationFrame
    expect(result).toEqual(afterRenderScroll);
  });
});
