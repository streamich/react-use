import { renderHook, act } from '@testing-library/react-hooks';
import useDocumentVisibility from '../src/useDocumentVisibility';

type VisibilityState = 'visible' | 'hidden';

const setVisibilityState = (state: VisibilityState) => {
  Object.defineProperty(document, 'visibilityState', {
    configurable: true,
    value: state,
  });
  document.dispatchEvent(new Event('visibilitychange'));
};

describe('useDocumentVisibility', () => {
  afterEach(() => {
    // Remove the own-property override so the native getter is used again
    delete (document as { visibilityState?: VisibilityState }).visibilityState;
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
    const { result } = renderHook(() => useDocumentVisibility(false));

    act(() => {
      setVisibilityState('visible');
    });

    expect(result.current).toBe(true);
  });

  it('should return false when document becomes hidden', () => {
    const { result } = renderHook(() => useDocumentVisibility(true));

    act(() => {
      setVisibilityState('hidden');
    });

    expect(result.current).toBe(false);
  });

  it('should track multiple visibility changes', () => {
    const { result } = renderHook(() => useDocumentVisibility());

    act(() => {
      setVisibilityState('visible');
    });
    expect(result.current).toBe(true);

    act(() => {
      setVisibilityState('hidden');
    });
    expect(result.current).toBe(false);
  });

  it('should add event listener on mount', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');

    renderHook(() => useDocumentVisibility());

    expect(addEventListenerSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function));

    addEventListenerSpy.mockRestore();
  });

  it('should remove the same event listener on unmount', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    const { unmount } = renderHook(() => useDocumentVisibility());
    const handler = addEventListenerSpy.mock.calls.find(
      ([type]) => type === 'visibilitychange'
    )?.[1];

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('visibilitychange', handler);

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('should stop updating after unmount', () => {
    const { result, unmount } = renderHook(() => useDocumentVisibility());

    unmount();
    act(() => {
      setVisibilityState('visible');
    });

    expect(result.current).toBe(false);
  });
});
