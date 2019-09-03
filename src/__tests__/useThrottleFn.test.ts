import { renderHook, act } from '@testing-library/react-hooks';
import useThrottleFn from '../useThrottleFn';

const mockFn = jest.fn(count => count);
jest.useFakeTimers();

it('it should throttle the given function by specific time', () => {
  const { result, rerender, unmount } = renderHook(props => useThrottleFn(mockFn, 1000, [props]), { initialProps: 1 });
  // Only called once if the mockFn called multiple times in 1 second.
  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(result.current).toBe(1);
  rerender(2);
  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(result.current).toBe(1);
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  // The mockFn can be called again after 1 second.
  rerender(2);
  expect(mockFn).toHaveBeenCalledTimes(2);
  expect(result.current).toBe(2);
  // wait 1 second to intialize the timeout ref
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  // Call clearTimeout when unmount.
  rerender(3);
  act(() => {
    jest.advanceTimersByTime(500);
  });
  unmount();
});
