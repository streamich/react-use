import { renderHook } from '@testing-library/react-hooks';
import useLatest from '../src/useLatest';

const setUp = () => renderHook(({ state }) => useLatest(state), { initialProps: { state: 0 } });

it('should return a ref with the latest value on initial render', () => {
  const { result } = setUp();

  expect(result.current).toEqual({ current: 0 });
});

it('should always return a ref with the latest value after each update', () => {
  const { result, rerender } = setUp();

  rerender({ state: 2 });
  expect(result.current).toEqual({ current: 2 });

  rerender({ state: 4 });
  expect(result.current).toEqual({ current: 4 });

  rerender({ state: 6 });
  expect(result.current).toEqual({ current: 6 });
});
