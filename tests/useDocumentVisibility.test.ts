import { renderHook, act } from '@testing-library/react-hooks';
import useDocumentVisibility from '../src/useDocumentVisibility';

describe('useDocumentVisibility', () => {
  const originalVisibilityState = document.visibilityState;

  afterEach(() => {
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      value: originalVisibilityState,
    });
  });

  it('should be defined', () => {
    expect(useDocumentVisibility).toBeDefined();
  });

  it('should return false initially', () => {
    const { result } = renderHook(() => useDocumentVisibility());

    expect(result.current).toBe(false);
  });

  it('should return true initially when initialState is true', () => {
    const { result } = renderHook(() => useDocumentVisibility(true));

    expect(result.current).toBe(true);
  });

  it('should return false initially when initialState is false', () => {
    const { result } = renderHook(() => useDocumentVisibility(false));

    expect(result.current).toBe(false);
  });

  it('should return true when document becomes visible', () => {
    const { result } = renderHook(() => useDocumentVisibility(true));

    act(() => {
      Object.defineProperty(document, 'visibilityState', {
        configurable: true,
        value: 'visible',
      });
      document.dispatchEvent(new Event('visibilitychange'));
    });

    expect(result.current).toBe(true);
  });

  it('should return false when document becomes hidden', () => {
    const { result } = renderHook(() => useDocumentVisibility());

    act(() => {
      Object.defineProperty(document, 'visibilityState', {
        configurable: true,
        value: 'visible',
      });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    expect(result.current).toBe(true);

    act(() => {
      Object.defineProperty(document, 'visibilityState', {
        configurable: true,
        value: 'hidden',
      });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    expect(result.current).toBe(false);
  });

  it('should add event listener on mount', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');

    renderHook(() => useDocumentVisibility());

    expect(addEventListenerSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function));

    addEventListenerSpy.mockRestore();
  });

  it('should remove event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    const { unmount } = renderHook(() => useDocumentVisibility());
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });
});
