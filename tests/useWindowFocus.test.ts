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
    // Mock document.hasFocus() to return true
    const hasFocusSpy = jest.spyOn(document, 'hasFocus').mockReturnValue(true);

    const { result } = renderHook(() => useWindowFocus(true));

    expect(result.current).toBe(true);

    hasFocusSpy.mockRestore();
  });

  it('should return false initially when initialState is false', () => {
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

  it('should remove event listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useWindowFocus());
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('focus', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('blur', expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });
});
