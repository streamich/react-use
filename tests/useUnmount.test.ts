import { renderHook } from '@testing-library/react-hooks';
import { useUnmount } from '../src';

describe('useUnmount', () => {
  it('should be defined', () => {
    expect(useUnmount).toBeDefined();
  });

  it('should not call provided callback on mount', () => {
    const spy = jest.fn();
    renderHook(() => useUnmount(spy));

    expect(spy).not.toHaveBeenCalled();
  });

  it('should not call provided callback on re-renders', () => {
    const spy = jest.fn();
    const hook = renderHook(() => useUnmount(spy));

    hook.rerender();
    hook.rerender();
    hook.rerender();
    hook.rerender();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should call provided callback on unmount', () => {
    const spy = jest.fn();
    const hook = renderHook(() => useUnmount(spy));

    hook.unmount();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call provided callback if is has been changed', () => {
    const spy = jest.fn();
    const spy2 = jest.fn();
    const spy3 = jest.fn();
    const hook = renderHook((cb) => useUnmount(cb), { initialProps: spy });

    hook.rerender(spy2);
    hook.rerender(spy3);
    hook.unmount();

    expect(spy).not.toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();
    expect(spy3).toHaveBeenCalledTimes(1);
  });
});
