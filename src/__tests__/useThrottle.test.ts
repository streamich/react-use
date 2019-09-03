import { renderHook, act } from '@testing-library/react-hooks';
import useThrottle from '../useThrottle';

it('should throttle the given value by specific time', () => {
  jest.useFakeTimers();
  const { result, rerender, unmount } = renderHook(props => useThrottle(props, 1000), { initialProps: 0 });
  expect(result.current).toBe(0);
  rerender(1);
  expect(result.current).toBe(0);
  act(() => jest.advanceTimersByTime(1000));
  expect(result.current).toBe(1);
  act(() => jest.advanceTimersByTime(1000));
  rerender(2);
  act(() => jest.advanceTimersByTime(500));
  unmount();
});
