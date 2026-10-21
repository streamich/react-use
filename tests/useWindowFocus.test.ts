import { renderHook, act } from '@testing-library/react-hooks';
import useWindowFocus from '../src/useWindowFocus';

describe('useWindowFocus', () => {
  it('should be defined', () => {
    expect(useWindowFocus).toBeDefined();
  });

  it('should return false initially', () => {
    const { result } = renderHook(() => useWindowFocus());

    expect(result.current).toBe(false);
  });

  it('should return true initially when defaultState is true', () => {
    const { result } = renderHook(() => useWindowFocus(true));

    expect(result.current).toBe(true);
  });

  it('should return false initially when defaultState is false', () => {
    const { result } = renderHook(() => useWindowFocus(false));

    expect(result.current).toBe(false);
  });

  it('should return true when window receives focus', () => {
    const { result } = renderHook(() => useWindowFocus());

    act(() => {
      window.dispatchEvent(new Event('focus'));
    });

    expect(result.current).toBe(true);
  });

  it('should return false when window loses focus', () => {
    const { result } = renderHook(() => useWindowFocus());

    act(() => {
      window.dispatchEvent(new Event('focus'));
    });
    expect(result.current).toBe(true);

    act(() => {
      window.dispatchEvent(new Event('blur'));
    });
    expect(result.current).toBe(false);
  });

  it('should add event listeners on mount', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

    renderHook(() => useWindowFocus());

    expect(addEventListenerSpy).toHaveBeenCalledWith('focus', expect.any(Function));
    expect(addEventListenerSpy).toHaveBeenCalledWith('blur', expect.any(Function));

    addEventListenerSpy.mockRestore();
  });

  it('should remove the same event listeners on unmount', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useWindowFocus());
    const getHandler = (spy: jest.SpyInstance, type: string) =>
      spy.mock.calls.find(([eventType]) => eventType === type)?.[1];
    const focusHandler = getHandler(addEventListenerSpy, 'focus');
    const blurHandler = getHandler(addEventListenerSpy, 'blur');

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('focus', focusHandler);
    expect(removeEventListenerSpy).toHaveBeenCalledWith('blur', blurHandler);

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('should stop updating after unmount', () => {
    const { result, unmount } = renderHook(() => useWindowFocus());

    unmount();
    act(() => {
      window.dispatchEvent(new Event('focus'));
    });

    expect(result.current).toBe(false);
  });
});
