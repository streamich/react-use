import useLocalStorage from '../src/useLocalStorage';
import 'jest-localstorage-mock';
import { renderHook, act } from '@testing-library/react-hooks';

describe(useLocalStorage, () => {
  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('retrieves an existing value from localStorage', () => {
    localStorage.setItem('foo', '"bar"');
    const { result } = renderHook(() => useLocalStorage('foo'));
    const [state] = result.current;
    expect(state).toEqual('bar');
  });

  it('should return initialValue if localStorage empty and set that to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('foo', 'bar'));
    const [state] = result.current;
    expect(state).toEqual('bar');
    expect(localStorage.__STORE__.foo).toEqual('"bar"');
  });

  it('prefers existing value over initial state', () => {
    localStorage.setItem('foo', '"bar"');
    const { result } = renderHook(() => useLocalStorage('foo', 'baz'));
    const [state] = result.current;
    expect(state).toEqual('bar');
  });

  it('does not clobber existing localStorage with initialState', () => {
    localStorage.setItem('foo', '"bar"');
    const { result } = renderHook(() => useLocalStorage('foo', 'buzz'));
    expect(result.current).toBeTruthy();
    expect(localStorage.__STORE__.foo).toEqual('"bar"');
  });

  it('correctly updates localStorage', () => {
    const { result, rerender } = renderHook(() => useLocalStorage('foo', 'bar'));

    const [, setFoo] = result.current;
    act(() => setFoo('baz'));
    rerender();

    expect(localStorage.__STORE__.foo).toEqual('"baz"');
  });

  it('should return undefined if no initialValue provided and localStorage empty', () => {
    const { result } = renderHook(() => useLocalStorage('some_key'));

    expect(result.current[0]).toBeUndefined();
  });

  it('returns and allows null setting', () => {
    localStorage.setItem('foo', 'null');
    const { result, rerender } = renderHook(() => useLocalStorage('foo'));
    const [foo1, setFoo] = result.current;
    act(() => setFoo(null));
    rerender();

    const [foo2] = result.current;
    expect(foo1).toEqual(null);
    expect(foo2).toEqual(null);
  });

  it('sets initialState if initialState is an object', () => {
    renderHook(() => useLocalStorage('foo', { bar: true }));
    expect(localStorage.__STORE__.foo).toEqual('{"bar":true}');
  });

  it('correctly and promptly returns a new value', () => {
    const { result, rerender } = renderHook(() => useLocalStorage('foo', 'bar'));

    const [, setFoo] = result.current;
    act(() => setFoo('baz'));
    rerender();

    const [foo] = result.current;
    expect(foo).toEqual('baz');
  });

  it('reinitializes state when key changes', () => {
    let key = 'foo';
    const { result, rerender } = renderHook(() => useLocalStorage(key, 'bar'));

    const [, setState] = result.current;
    act(() => setState('baz'));
    key = 'bar';
    rerender();

    const [state] = result.current;
    expect(state).toEqual('bar');
  });

  /*
  it('keeps multiple hooks accessing the same key in sync', () => {
    localStorage.setItem('foo', 'bar');
    const { result: r1, rerender: rerender1 } = renderHook(() => useLocalStorage('foo'));
    const { result: r2, rerender: rerender2 } = renderHook(() => useLocalStorage('foo'));

    const [, setFoo] = r1.current;
    act(() => setFoo('potato'));
    rerender1();
    rerender2();

    const [val1] = r1.current;
    const [val2] = r2.current;

    expect(val1).toEqual(val2);
    expect(val1).toEqual('potato');
    expect(val2).toEqual('potato');
  });
  */

  it('parses out objects from localStorage', () => {
    localStorage.setItem('foo', JSON.stringify({ ok: true }));
    const { result } = renderHook(() => useLocalStorage<{ ok: boolean }>('foo'));
    const [foo] = result.current;
    expect(foo!.ok).toEqual(true);
  });

  it('safely initializes objects to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage<{ ok: boolean }>('foo', { ok: true }));
    const [foo] = result.current;
    expect(foo!.ok).toEqual(true);
  });

  it('safely sets objects to localStorage', () => {
    const { result, rerender } = renderHook(() =>
      useLocalStorage<{ ok: any }>('foo', { ok: true })
    );

    const [, setFoo] = result.current;
    act(() => setFoo({ ok: 'bar' }));
    rerender();

    const [foo] = result.current;
    expect(foo!.ok).toEqual('bar');
  });

  it('safely returns objects from updates', () => {
    const { result, rerender } = renderHook(() =>
      useLocalStorage<{ ok: any }>('foo', { ok: true })
    );

    const [, setFoo] = result.current;
    act(() => setFoo({ ok: 'bar' }));
    rerender();

    const [foo] = result.current;
    expect(foo).toBeInstanceOf(Object);
    expect(foo!.ok).toEqual('bar');
  });

  it('sets localStorage from the function updater', () => {
    const { result, rerender } = renderHook(() =>
      useLocalStorage<{ foo: string; fizz?: string }>('foo', { foo: 'bar' })
    );

    const [, setFoo] = result.current;
    act(() => setFoo((state) => ({ ...state!, fizz: 'buzz' })));
    rerender();

    const [value] = result.current;
    expect(value!.foo).toEqual('bar');
    expect(value!.fizz).toEqual('buzz');
  });

  it('rejects nullish or undefined keys', () => {
    const { result } = renderHook(() => useLocalStorage(null as any));
    try {
      (() => {
        return result.current;
      })();
      fail('hook should have thrown');
    } catch (e) {
      expect(String(e)).toMatch(/key may not be/i);
    }
  });

  /* Enforces proper eslint react-hooks/rules-of-hooks usage */
  describe('eslint react-hooks/rules-of-hooks', () => {
    it('memoizes an object between rerenders', () => {
      const { result, rerender } = renderHook(() => useLocalStorage('foo', { ok: true }));
      (() => {
        return result.current; // if localStorage isn't set then r1 and r2 will be different
      })();
      rerender();
      const [r2] = result.current;
      rerender();
      const [r3] = result.current;
      expect(r2).toBe(r3);
    });

    it('memoizes an object immediately if localStorage is already set', () => {
      localStorage.setItem('foo', JSON.stringify({ ok: true }));
      const { result, rerender } = renderHook(() => useLocalStorage('foo', { ok: true }));

      const [r1] = result.current; // if localStorage isn't set then r1 and r2 will be different
      rerender();
      const [r2] = result.current;
      expect(r1).toBe(r2);
    });

    it('memoizes the setState function', () => {
      localStorage.setItem('foo', JSON.stringify({ ok: true }));
      const { result, rerender } = renderHook(() => useLocalStorage('foo', { ok: true }));
      const [, s1] = result.current;
      rerender();
      const [, s2] = result.current;
      expect(s1).toBe(s2);
    });
  });

  describe('Options: raw', () => {
    it('returns a string when localStorage is a stringified object', () => {
      localStorage.setItem('foo', JSON.stringify({ fizz: 'buzz' }));
      const { result } = renderHook(() => useLocalStorage('foo', null, { raw: true }));
      const [foo] = result.current;
      expect(typeof foo).toBe('string');
    });

    it('returns a string after an update', () => {
      localStorage.setItem('foo', JSON.stringify({ fizz: 'buzz' }));
      const { result, rerender } = renderHook(() => useLocalStorage('foo', null, { raw: true }));

      const [, setFoo] = result.current;

      act(() => setFoo({ fizz: 'bang' } as any));
      rerender();

      const [foo] = result.current;
      expect(typeof foo).toBe('string');

      expect(JSON.parse(foo!)).toBeInstanceOf(Object);

      // expect(JSON.parse(foo!).fizz).toEqual('bang');
    });

    it('still forces setState to a string', () => {
      localStorage.setItem('foo', JSON.stringify({ fizz: 'buzz' }));
      const { result, rerender } = renderHook(() => useLocalStorage('foo', null, { raw: true }));

      const [, setFoo] = result.current;

      act(() => setFoo({ fizz: 'bang' } as any));
      rerender();

      const [value] = result.current;

      expect(JSON.parse(value!).fizz).toEqual('bang');
    });
  });
});
