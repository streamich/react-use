import { act, renderHook } from '@testing-library/react-hooks';
import { replaceRaf } from 'raf-stub';
import useWindowScroll from '../src/useWindowScroll';

interface RequestAnimationFrame {
  reset: () => void;
  step: (steps?: number, duration?: number) => void;
}

declare var requestAnimationFrame: RequestAnimationFrame;

function getHook() {
  return renderHook(() => useWindowScroll());
}

function triggerScroll(axis: 'vertical' | 'horizontal', value: number): void {
  const positions = {
    vertical: (verticalValue) => {
      (window.pageYOffset as number) = verticalValue;
    },
    horizontal: (horizontalValue) => {
      (window.pageXOffset as number) = horizontalValue;
    },
  };

  positions[axis](value);

  window.dispatchEvent(new Event('scroll'));
}

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

  it('should return current scroll position', () => {
    const hook = getHook();

    expect(typeof hook.result.current).toBe('object');
    expect(typeof hook.result.current.x).toBe('number');
    expect(typeof hook.result.current.y).toBe('number');
  });

  it('should return Y axis position after vertical scroll', () => {
    const hook = getHook();

    act(() => {
      triggerScroll('vertical', 360);
      requestAnimationFrame.step();
    });

    expect(hook.result.current.y).toBe(360);

    act(() => {
      triggerScroll('vertical', 2048);
      requestAnimationFrame.step();
    });

    expect(hook.result.current.y).toBe(2048);
  });

  it('should return X axis position after horizontal scroll', () => {
    const hook = getHook();

    act(() => {
      triggerScroll('horizontal', 200);
      requestAnimationFrame.step();
    });

    expect(hook.result.current.x).toBe(200);

    act(() => {
      triggerScroll('horizontal', 400);
      requestAnimationFrame.step();
    });

    expect(hook.result.current.x).toBe(400);
  });
});
