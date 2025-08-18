import { act, renderHook } from '@testing-library/react-hooks';
import useQueue from '../src/useQueue';

const setUp = (initialQueue?: any[]) => renderHook(() => useQueue(initialQueue));

it('takes initial state', () => {
  const { result } = setUp([1, 2, 3]);
  const { first, last, size } = result.current;
  expect(first).toBe(1);
  expect(last).toBe(3);
  expect(size).toBe(3);
});

it('appends new member', () => {
  const { result } = setUp([1, 2]);
  act(() => {
    result.current.add(3);
  });
  const { first, last, size } = result.current;
  expect(first).toBe(1);
  expect(last).toBe(3);
  expect(size).toBe(3);
});

it('pops oldest member', () => {
  const { result } = setUp([1, 2]);
  act(() => {
    result.current.remove();
  });
  const { first, size } = result.current;
  expect(first).toBe(2);
  expect(size).toBe(1);
});
