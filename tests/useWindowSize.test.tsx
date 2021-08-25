import { act, renderHook } from '@testing-library/react-hooks';
import { replaceRaf } from 'raf-stub';
import useWindowSize from '../src/useWindowSize';
import { isBrowser } from '../src/misc/util';

declare var requestAnimationFrame: {
  reset: () => void;
  step: (steps?: number, duration?: number) => void;
};

describe('useWindowSize', () => {
  beforeAll(() => {
    replaceRaf();
  });

  afterEach(() => {
    requestAnimationFrame.reset();
  });

  it('should be defined', () => {
    expect(useWindowSize).toBeDefined();
  });

  function getHook(...args) {
    return renderHook(() => useWindowSize(...args));
  }

  function triggerResize(dimension: 'width' | 'height', value: number) {
    if (dimension === 'width') {
      (window.innerWidth as number) = value;
    } else if (dimension === 'height') {
      (window.innerHeight as number) = value;
    }

    window.dispatchEvent(new Event('resize'));
  }

  it('should return current window dimensions', () => {
    const hook = getHook();

    expect(typeof hook.result.current).toBe('object');
    expect(typeof hook.result.current.height).toBe('number');
    expect(typeof hook.result.current.width).toBe('number');
  });

  it('should use passed parameters as initial values in case of non-browser use', () => {
    const hook = getHook(1, 1);

    expect(hook.result.current.height).toBe(isBrowser ? window.innerHeight : 1);
    expect(hook.result.current.width).toBe(isBrowser ? window.innerWidth : 1);
  });

  it('should re-render after height change on closest RAF', () => {
    const hook = getHook();

    act(() => {
      triggerResize('height', 360);
      requestAnimationFrame.step();
    });

    expect(hook.result.current.height).toBe(360);

    act(() => {
      triggerResize('height', 2048);
      requestAnimationFrame.step();
    });

    expect(hook.result.current.height).toBe(2048);
  });

  it('should re-render after width change on closest RAF', () => {
    const hook = getHook();

    act(() => {
      triggerResize('width', 360);
      requestAnimationFrame.step();
    });

    expect(hook.result.current.width).toBe(360);

    act(() => {
      triggerResize('width', 2048);
      requestAnimationFrame.step();
    });

    expect(hook.result.current.width).toBe(2048);
  });
});
