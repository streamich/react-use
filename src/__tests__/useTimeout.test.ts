import { act, renderHook } from '@testing-library/react-hooks';
import useTimeout from '../useTimeout';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

it('should init ready bool to false', () => {
  const { result } = renderHook(() => useTimeout());

  expect(result.current).toBe(false);
});

it('should return ready as true on default timeout reached', () => {
  const { result } = renderHook(() => useTimeout());

  act(() => {
    // default timeout is 0 so we just basically start running scheduled timer
    jest.advanceTimersByTime(0);
  });

  expect(result.current).toBe(true);
});

it('should return ready as true on custom timeout reached', () => {
  const { result } = renderHook(() => useTimeout(200));

  act(() => {
    jest.advanceTimersByTime(200);
  });

  expect(result.current).toBe(true);
});

it('should always return ready as false on custom timeout not reached', () => {
  const { result } = renderHook(() => useTimeout(200));

  act(() => {
    jest.advanceTimersByTime(100);
  });
  expect(result.current).toBe(false);

  act(() => {
    jest.advanceTimersByTime(90);
  });
  expect(result.current).toBe(false);

  act(() => {
    jest.advanceTimersByTime(9);
  });
  expect(result.current).toBe(false);
});

it('should always return ready as true after custom timeout reached', () => {
  const { result } = renderHook(() => useTimeout(200));

  act(() => {
    jest.advanceTimersByTime(200);
  });
  expect(result.current).toBe(true);

  act(() => {
    jest.advanceTimersByTime(20);
  });
  expect(result.current).toBe(true);

  act(() => {
    jest.advanceTimersByTime(100);
  });
  expect(result.current).toBe(true);
});

it('should clear pending timer on unmount', () => {
  const { unmount } = renderHook(() => useTimeout());
  // @ts-ignore getTimerCount is not defined on jest types
  expect(jest.getTimerCount()).toBe(1);

  unmount();
  // @ts-ignore getTimerCount is not defined on jest types
  expect(jest.getTimerCount()).toBe(0);
});
