import { renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { useThrottleFn } from '../src';

describe('useThrottleFn', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should be defined', () => {
    expect(useThrottleFn).toBeDefined();
  });

  const getHook = <T>(initialProps: T, ms?: number): [Function, RenderHookResult<T, T>] => {
    const mockFn = jest.fn((props) => props);
    return [mockFn, renderHook((props) => useThrottleFn(mockFn, ms, [props]), { initialProps })];
  };

  it('should return the value that the given function return', () => {
    const [fn, hook] = getHook(10, 100);

    expect(hook.result.current).toBe(10);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should has same value if time is advanced less than the given time', () => {
    const [fn, hook] = getHook(10, 100);

    expect(hook.result.current).toBe(10);
    expect(fn).toHaveBeenCalledTimes(1);

    hook.rerender(20);
    jest.advanceTimersByTime(50);

    expect(hook.result.current).toBe(10);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(jest.getTimerCount()).toBe(1);
  });

  it('should update the value after the given time when arguments change', (done) => {
    const [fn, hook] = getHook('boo', 100);

    expect(hook.result.current).toBe('boo');
    expect(fn).toHaveBeenCalledTimes(1);

    hook.rerender('foo');
    hook.waitForNextUpdate().then(() => {
      expect(hook.result.current).toBe('foo');
      expect(fn).toHaveBeenCalledTimes(2);
      done();
    });
    jest.advanceTimersByTime(100);
  });

  it('should use the default ms value when missing', (done) => {
    const [fn, hook] = getHook('boo');

    expect(hook.result.current).toBe('boo');
    expect(fn).toHaveBeenCalledTimes(1);

    hook.rerender('foo');
    hook.waitForNextUpdate().then(() => {
      expect(hook.result.current).toBe('foo');
      expect(fn).toHaveBeenCalledTimes(2);
      done();
    });
    jest.advanceTimersByTime(200);
  });
  it('should not exist timer when arguments did not update after the given time', () => {
    const [fn, hook] = getHook('boo', 100);

    expect(hook.result.current).toBe('boo');
    expect(fn).toHaveBeenCalledTimes(1);
    expect(jest.getTimerCount()).toBe(1);

    jest.advanceTimersByTime(100);

    expect(jest.getTimerCount()).toBe(0);
  });
  it('should cancel timeout on unmount', () => {
    const [fn, hook] = getHook('boo', 100);

    expect(hook.result.current).toBe('boo');
    expect(fn).toHaveBeenCalledTimes(1);

    hook.rerender('foo');
    hook.unmount();

    expect(jest.getTimerCount()).toBe(0);
    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
