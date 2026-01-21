import { act, renderHook } from '@testing-library/react-hooks';
import { replaceRaf } from 'raf-stub';
import useBodyScrollSize from '../src/useBodyScrollSize';
import { isBrowser } from '../src/misc/util';

declare var requestAnimationFrame: {
  reset: () => void;
  step: (steps?: number, duration?: number) => void;
};


describe('useBodyScrollSize', () => {
  beforeAll(() => {
    replaceRaf();
    Object.defineProperty(document.body, 'scrollWidth', {writable: true, configurable: true, value: 3000})
    Object.defineProperty(document.body, 'scrollHeight', {writable: true, configurable: true, value: 4000})
  });

  afterEach(() => {
    requestAnimationFrame.reset();
    Object.defineProperty(document.body, 'scrollWidth', {writable: true, configurable: true, value: 0})
    Object.defineProperty(document.body, 'scrollHeight', {writable: true, configurable: true, value: 0})
  });

  it('should be defined', () => {
    expect(useBodyScrollSize).toBeDefined();
  });

  function getHook(...args) {
    return renderHook(() => useBodyScrollSize(...args));
  }

  function triggerResize(dimension: 'width' | 'height', value: number) {
    if (dimension === 'width') {
        Object.defineProperty(document.body, 'scrollWidth', {writable: true, configurable: true, value})
    } else if (dimension === 'height') {
        Object.defineProperty(document.body, 'scrollHeight', {writable: true, configurable: true, value})
    }
    window.dispatchEvent(new Event('resize'));
  }

  it('should return current body dimensions', () => {
    const hook = getHook();

    expect(typeof hook.result.current).toBe('object');
    expect(typeof hook.result.current.height).toBe('number');
    expect(typeof hook.result.current.width).toBe('number');
  });

  it('should use passed parameters as initial values in case of non-browser use', () => {
    const hook = getHook(1, 1);

    expect(hook.result.current.height).toBe(isBrowser ? document.body.scrollHeight : 1);
    expect(hook.result.current.width).toBe(isBrowser ? document.body.scrollWidth : 1);
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
