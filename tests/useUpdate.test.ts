import { act, renderHook } from '@testing-library/react-hooks';
import useUpdate from '../src/useUpdate';

describe('useUpdate', () => {
  it('should be defined', () => {
    expect(useUpdate).toBeDefined();
  });

  it('should return a function', () => {
    const { result } = renderHook(() => useUpdate());

    expect(typeof result.current).toBe('function');
  });

  it('should re-render component each time returned function is called', () => {
    let renders = 0;
    const {
      result: { current: update },
    } = renderHook(() => {
      renders++;
      return useUpdate();
    });

    expect(renders).toBe(1);

    act(() => update());
    expect(renders).toBe(2);

    act(() => update());
    expect(renders).toBe(3);
  });

  it('should return exact same function in between renders', () => {
    let renders = 0;
    const { result } = renderHook(() => {
      renders++;
      return useUpdate();
    });
    let initialUpdateFn = result.current;

    expect(renders).toBe(1);

    act(() => result.current());
    expect(renders).toBe(2);
    expect(initialUpdateFn).toBe(result.current);

    act(() => result.current());
    expect(renders).toBe(3);
    expect(initialUpdateFn).toBe(result.current);
  });

  it('passing the argument to returned function should not affect the use', () => {
    let renders = 0;
    const { result } = renderHook(() => {
      renders++;
      return useUpdate();
    });
    let initialUpdateFn = result.current;

    expect(renders).toBe(1);

    /* @ts-expect-error */
    act(() => result.current(1));
    expect(renders).toBe(2);
    expect(initialUpdateFn).toBe(result.current);

    /* @ts-expect-error */
    act(() => result.current(1));
    expect(renders).toBe(3);
    expect(initialUpdateFn).toBe(result.current);
  });
});
