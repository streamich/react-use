import { act, renderHook } from '@testing-library/react-hooks';
import { replaceRaf } from 'raf-stub';
import useDevicePixelRatio from '../src/useDevicePixelRatio';
import { isBrowser } from '../src/misc/util';

declare var requestAnimationFrame: {
  reset: () => void;
  step: (steps?: number, duration?: number) => void;
};

describe('useDevicePixelRatio', () => {
  beforeAll(() => {
    replaceRaf();
  });

  afterEach(() => {
    requestAnimationFrame.reset();
  });

  it('should be defined', () => {
    expect(useDevicePixelRatio).toBeDefined();
  });

  function getHook(...args) {
    return renderHook(() => useDevicePixelRatio(...args));
  }

  function triggerResize(dimension: 'width' | 'height', value: number) {
    if (dimension === 'width') {
      (window.innerWidth as number) = value;
    } else if (dimension === 'height') {
      (window.innerHeight as number) = value;
    }

    window.dispatchEvent(new Event('resize'));
  }

  function setDevicePixelRatio(value: number) {
    (window.devicePixelRatio as number) = value;
  }

  it('should return current device pixel ratio', () => {
    const hook = getHook();

    expect(typeof hook.result.current).toBe('number');
  });

  it('should use passed parameters as initial values in case of non-browser use', () => {
    const hook = getHook(1);

    expect(hook.result.current).toBe(isBrowser ? window.devicePixelRatio : 1);
  });

  it('should re-render after height change on closest RAF', () => {
    const hook = getHook();

    act(() => {
      setDevicePixelRatio(1);
      triggerResize('height', 720);
      requestAnimationFrame.step();
    });

    expect(hook.result.current).toBe(1);

    act(() => {
      setDevicePixelRatio(1.5);
      triggerResize('height', 480);
      requestAnimationFrame.step();
    });

    expect(hook.result.current).toBe(1.5);
  });

  it('should re-render after width change on closest RAF', () => {
    const hook = getHook();

    act(() => {
      setDevicePixelRatio(1);
      triggerResize('width', 1280);
      requestAnimationFrame.step();
    });

    expect(hook.result.current).toBe(1);

    act(() => {
      setDevicePixelRatio(2);
      triggerResize('width', 640);
      requestAnimationFrame.step();
    });

    expect(hook.result.current).toBe(2);
  });
});
