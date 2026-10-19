import { act, renderHook } from '@testing-library/react-hooks';
import * as useUnmountModule from '../src/useUnmount';
import useThrottle from '../src/useThrottle';

describe('useThrottle', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(useThrottle).toBeDefined();
  });

  it('should have a value to be returned', () => {
    const { result } = renderHook(() => useThrottle(0, 100));
    expect(result.current).toBe(0);
  });

  it('should has same value if time is advanced less than the given time', () => {
    const { result, rerender } = renderHook((props) => useThrottle(props, 100), {
      initialProps: 0,
    });
    expect(result.current).toBe(0);
    rerender(1);
    jest.advanceTimersByTime(50);
    expect(result.current).toBe(0);
  });

  it('should update the value after the given time when prop change', (done) => {
    const hook = renderHook((props) => useThrottle(props, 100), { initialProps: 0 });
    expect(hook.result.current).toBe(0);
    hook.rerender(1);
    expect(hook.result.current).toBe(0);
    hook.waitForNextUpdate().then(() => {
      expect(hook.result.current).toBe(1);
      done();
    });
    jest.advanceTimersByTime(100);
  });

  it('should use the default ms value when missing', (done) => {
    const hook = renderHook((props) => useThrottle(props), { initialProps: 0 });
    expect(hook.result.current).toBe(0);
    hook.rerender(1);
    hook.waitForNextUpdate().then(() => {
      expect(hook.result.current).toBe(1);
      done();
    });
    jest.advanceTimersByTime(200);
  });

  it('should not update the value after the given time', () => {
    const hook = renderHook((props) => useThrottle(props, 100), { initialProps: 0 });
    expect(hook.result.current).toBe(0);
    jest.advanceTimersByTime(100);
    expect(hook.result.current).toBe(0);
  });

  it('resumes updates after a StrictMode-like effect cleanup', () => {
    // React 17 is used by this test suite, so manually replay the cleanup
    // that React 18 StrictMode invokes before restarting mounted effects.
    const originalUseUnmount = useUnmountModule.default;
    let replayCleanup: (() => any) | undefined;
    const spy = jest.spyOn(useUnmountModule, 'default').mockImplementation((fn) => {
      replayCleanup = fn;
      originalUseUnmount(fn);
    });

    try {
      const hook = renderHook((value) => useThrottle(value, 100), { initialProps: 0 });
      expect(jest.getTimerCount()).toBe(1);

      act(() => {
        if (!replayCleanup) {
          throw new Error('Unmount cleanup was not registered');
        }
        replayCleanup();
      });
      expect(jest.getTimerCount()).toBe(0);

      hook.rerender(1);
      expect(hook.result.current).toBe(1);
      expect(jest.getTimerCount()).toBe(1);

      hook.rerender(2);
      act(() => {
        jest.advanceTimersByTime(100);
      });
      expect(hook.result.current).toBe(2);
      hook.unmount();
    } finally {
      spy.mockRestore();
    }
  });

  it('should cancel timeout on unmount', () => {
    const hook = renderHook((props) => useThrottle(props, 100), { initialProps: 0 });
    expect(hook.result.current).toBe(0);
    hook.rerender(1);
    hook.unmount();
    expect(jest.getTimerCount()).toBe(0);
    jest.advanceTimersByTime(100);
    expect(hook.result.current).toBe(0);
  });
});
