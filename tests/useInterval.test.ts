import { renderHook } from '@testing-library/react-hooks';
import { useInterval } from '../src';

let callback;

beforeEach(() => {
  callback = jest.fn();
});

beforeAll(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  callback.mockRestore();
  jest.clearAllTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

it('should init hook with default delay', () => {
  const { result } = renderHook(() => useInterval(callback));

  expect(result.current).toBeUndefined();
  expect(setInterval).toHaveBeenCalledTimes(1);
  // if not delay provided, it's assumed as 0
  expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 0);
});

it('should init hook with custom delay', () => {
  const { result } = renderHook(() => useInterval(callback, 5000));

  expect(result.current).toBeUndefined();
  expect(setInterval).toHaveBeenCalledTimes(1);
  expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 5000);
});

it('should init hook without delay', () => {
  const { result } = renderHook(() => useInterval(callback, null));

  expect(result.current).toBeUndefined();
  // if null delay provided, it's assumed as no delay
  expect(setInterval).not.toHaveBeenCalled();
});

it('should repeatedly calls provided callback with a fixed time delay between each call', () => {
  renderHook(() => useInterval(callback, 200));
  expect(callback).not.toHaveBeenCalled();

  // fast-forward time until 1s before it should be executed
  jest.advanceTimersByTime(199);
  expect(callback).not.toHaveBeenCalled();

  // fast-forward until 1st call should be executed
  jest.advanceTimersByTime(1);
  expect(callback).toHaveBeenCalledTimes(1);

  // fast-forward until next timer should be executed
  jest.advanceTimersToNextTimer();
  expect(callback).toHaveBeenCalledTimes(2);

  // fast-forward until 3 more timers should be executed
  jest.advanceTimersToNextTimer(3);
  expect(callback).toHaveBeenCalledTimes(5);
});

it('should clear interval on unmount', () => {
  const { unmount } = renderHook(() => useInterval(callback, 200));
  const initialTimerCount = jest.getTimerCount();
  expect(clearInterval).not.toHaveBeenCalled();

  unmount();

  expect(clearInterval).toHaveBeenCalledTimes(1);
  expect(jest.getTimerCount()).toBe(initialTimerCount - 1);
});

it('should handle new interval when delay is updated', () => {
  let delay = 200;
  const { rerender } = renderHook(() => useInterval(callback, delay));
  expect(callback).not.toHaveBeenCalled();

  // fast-forward initial delay
  jest.advanceTimersByTime(200);
  expect(callback).toHaveBeenCalledTimes(1);

  // update delay by increasing previous one
  delay = 500;
  rerender();

  // fast-forward initial delay again but this time it should not execute the cb
  jest.advanceTimersByTime(200);
  expect(callback).toHaveBeenCalledTimes(1);

  // fast-forward remaining time for new delay
  jest.advanceTimersByTime(300);
  expect(callback).toHaveBeenCalledTimes(2);
});

it('should clear pending interval when delay is updated', () => {
  let delay = 200;
  const { rerender } = renderHook(() => useInterval(callback, delay));
  expect(clearInterval).not.toHaveBeenCalled();
  const initialTimerCount = jest.getTimerCount();

  // update delay while there is a pending interval
  delay = 500;
  rerender();

  expect(clearInterval).toHaveBeenCalledTimes(1);
  expect(jest.getTimerCount()).toBe(initialTimerCount);
});
