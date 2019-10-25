import { renderHook, RenderHookResult } from '@testing-library/react-hooks';
import useLast from '../useLast';

const isNumberPredicate = state => typeof state === 'number';
const setUp = (): RenderHookResult<{ state: number | string }, any> =>
  renderHook(({ state }) => useLast(state, isNumberPredicate), { initialProps: { state: 0 } });

it('should return undefined on initial render', () => {
  const { result } = setUp();

  expect(result.current).toBeUndefined();
});

it('should return previous state after each update if predicate passed', () => {
  const { result, rerender } = setUp();

  rerender({ state: 2 });
  expect(result.current).toBe(0);

  rerender({ state: 4 });
  expect(result.current).toBe(2);

  rerender({ state: 6 });
  expect(result.current).toBe(4);
});

it('should return last state that passed the predicate', () => {
  const { result, rerender } = setUp();

  rerender({ state: 2 });
  expect(result.current).toBe(0);

  rerender({ state: 'foo' });
  expect(result.current).toBe(2);

  rerender({ state: 6 });
  // this should still be 2 since the previous state did not pass the predicate
  expect(result.current).toBe(2);
});
