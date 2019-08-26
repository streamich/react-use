import { act, renderHook } from '@testing-library/react-hooks';
import useUpdate from '../useUpdate';

it('should init update function', () => {
  const { result } = renderHook(() => useUpdate());
  const update = result.current;

  expect(update).toBeInstanceOf(Function);
});

it('should forces a re-render every time update function is called', () => {
  let renderCount = 0;
  const { result } = renderHook(() => {
    renderCount++;
    return useUpdate();
  });
  const update = result.current;

  expect(renderCount).toBe(1);

  act(() => update());
  expect(renderCount).toBe(2);

  act(() => update());
  expect(renderCount).toBe(3);
});

it('should return same update function instance on each update', () => {
  const { result, rerender } = renderHook(() => useUpdate());
  const { current: updateCb } = result;

  rerender();

  expect(Object.is(result.current, updateCb)).toBe(true);
});
