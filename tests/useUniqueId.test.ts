import { renderHook } from '@testing-library/react-hooks';
import { useUniqueId } from '../src';

it('should provide an ID string with given prefix', () => {
  const { result } = renderHook(() => useUniqueId('test-prefix'));

  expect(result.current).toMatch(/^test-prefix-\d+/);
});

it('should use a default prefix of "id"', () => {
  const { result } = renderHook(() => useUniqueId());

  expect(result.current).toMatch(/^id-\d+/);
});

it('changes the ID if a dependency changes', () => {
  let x = 1;
  const { result, rerender } = renderHook(() => useUniqueId('test-prefix', [x]));

  const firstResult = result.current;

  x = 2;
  rerender();

  expect(result.current).not.toEqual(firstResult);
});
