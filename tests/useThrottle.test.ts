import { renderHook } from '@testing-library/react-hooks';
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
