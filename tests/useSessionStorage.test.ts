import { act, renderHook } from '@testing-library/react-hooks';
import useSessionStorage from '../src/useSessionStorage';

describe('useSessionStorage', () => {
  afterEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  it.each([false, true])(
    'preserves updates when multiple instances share a key with raw=%s',
    (raw) => {
      const { result, rerender } = renderHook(() => ({
        first: useSessionStorage('shared', 'initial', raw),
        second: useSessionStorage('shared', 'initial', raw),
      }));

      act(() => result.current.first[1]('updated'));

      expect(result.current.first[0]).toBe('updated');
      expect(result.current.second[0]).toBe('initial');
      expect(sessionStorage.getItem('shared')).toBe(raw ? 'updated' : '"updated"');

      rerender();

      expect(sessionStorage.getItem('shared')).toBe(raw ? 'updated' : '"updated"');
    }
  );

  it('does not persist unchanged state on unrelated rerenders', () => {
    const { rerender } = renderHook(() => useSessionStorage('value', 'initial'));
    (sessionStorage.setItem as jest.Mock).mockClear();

    rerender();

    expect(sessionStorage.setItem).not.toHaveBeenCalled();
  });

  it('persists the current state under a new key', () => {
    const { result, rerender } = renderHook(({ key }) => useSessionStorage(key, 'initial'), {
      initialProps: { key: 'first' },
    });

    act(() => result.current[1]('updated'));
    rerender({ key: 'second' });

    expect(result.current[0]).toBe('updated');
    expect(sessionStorage.getItem('first')).toBe('"updated"');
    expect(sessionStorage.getItem('second')).toBe('"updated"');
  });

  it('persists the current state when the serialization mode changes', () => {
    const { result, rerender } = renderHook(
      ({ raw }) => useSessionStorage('value', 'initial', raw),
      {
        initialProps: { raw: false },
      }
    );

    act(() => result.current[1]('updated'));
    rerender({ raw: true });
    expect(sessionStorage.getItem('value')).toBe('updated');

    rerender({ raw: false });
    expect(sessionStorage.getItem('value')).toBe('"updated"');
  });

  it('keeps the initial state when session storage access is restricted', () => {
    (sessionStorage.getItem as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Storage access denied');
    });
    (sessionStorage.setItem as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Storage access denied');
    });

    const { result } = renderHook(() => useSessionStorage('value', 'initial'));

    expect(result.current[0]).toBe('initial');
    expect(result.error).toBeUndefined();
  });

  it('treats an empty serialized value as null', () => {
    (sessionStorage.getItem as jest.Mock).mockReturnValueOnce('');

    const { result } = renderHook(() => useSessionStorage('value', 'initial'));

    expect(result.current[0]).toBeNull();
  });
});
