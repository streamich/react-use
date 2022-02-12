import { act, renderHook } from '@testing-library/react-hooks';
import { useForceUpdate } from '../src';

it('should re-render component when function is called', () => {
  const onRender = jest.fn();
  const { result } = renderHook(() => {
    onRender();
    return useForceUpdate();
  });

  expect(onRender).toHaveBeenCalledTimes(1);
  act(() => result.current());
  expect(onRender).toHaveBeenCalledTimes(2);
});

it('should get the same function instance', () => {
  const { rerender, result } = renderHook(() => useForceUpdate());
  const firstRenderReturn = result.current;

  rerender();
  const secondRenderReturn = result.current;

  expect(firstRenderReturn).toBe(secondRenderReturn);
});
