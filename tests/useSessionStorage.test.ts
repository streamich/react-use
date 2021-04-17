import useSessionStorage from '../src/useSessionStorage';
import 'jest-localstorage-mock';
import { renderHook, act } from '@testing-library/react-hooks';

describe(useSessionStorage, () => {
  afterEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  it('retrieves an existing value from sessionStorage', () => {
    sessionStorage.setItem('foo', '"bar"');
    const { result } = renderHook(() => useSessionStorage('foo'));
    const [state] = result.current;
    expect(state).toEqual('bar');
  });

  it('should return initialValue if sessionStorage empty and set that to sessionStorage', () => {
    const { result } = renderHook(() => useSessionStorage('foo', 'bar'));
    const [state] = result.current;
    expect(state).toEqual('bar');
    expect(sessionStorage.__STORE__.foo).toEqual('"bar"');
  });

  it('prefers existing value over initial state', () => {
    sessionStorage.setItem('foo', '"bar"');
    const { result } = renderHook(() => useSessionStorage('foo', 'baz'));
    const [state] = result.current;
    expect(state).toEqual('bar');
  });

  it('does not clobber existing sessionStorage with initialState', () => {
    sessionStorage.setItem('foo', '"bar"');
    const { result } = renderHook(() => useSessionStorage('foo', 'buzz'));
    expect(result.current).toBeTruthy();
    expect(sessionStorage.__STORE__.foo).toEqual('"bar"');
  });

  it('correctly updates sessionStorage', () => {
    const { result, rerender } = renderHook(() => useSessionStorage('foo', 'bar'));

    const [, setFoo] = result.current;
    act(() => setFoo('baz'));
    rerender();

    expect(sessionStorage.__STORE__.foo).toEqual('"baz"');
  });

  it('should return undefined if no initialValue provided and sessionStorage empty', () => {
    const { result } = renderHook(() => useSessionStorage('some_key'));

    expect(result.current[0]).toBeUndefined();
  });

  it('returns and allows null setting', () => {
    sessionStorage.setItem('foo', 'null');
    const { result, rerender } = renderHook(() => useSessionStorage('foo'));
    const [foo1, setFoo] = result.current;
    act(() => setFoo(null));
    rerender();

    const [foo2] = result.current;
    expect(foo1).toEqual(null);
    expect(foo2).toEqual(null);
  });

  it('sets initialState if initialState is an object', () => {
    renderHook(() => useSessionStorage('foo', { bar: true }));
    expect(sessionStorage.__STORE__.foo).toEqual('{"bar":true}');
  });

  it('correctly and promptly returns a new value', () => {
    const { result, rerender } = renderHook(() => useSessionStorage('foo', 'bar'));

    const [, setFoo] = result.current;
    act(() => setFoo('baz'));
    rerender();

    const [foo] = result.current;
    expect(foo).toEqual('baz');
  });

  /*
  it('keeps multiple hooks accessing the same key in sync', () => {
    sessionStorage.setItem('foo', 'bar');
    const { result: r1, rerender: rerender1 } = renderHook(() => useSessionStorage('foo'));
    const { result: r2, rerender: rerender2 } = renderHook(() => useSessionStorage('foo'));

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

  it('parses out objects from sessionStorage', () => {
    sessionStorage.setItem('foo', JSON.stringify({ ok: true }));
    const { result } = renderHook(() => useSessionStorage<{ ok: boolean }>('foo'));
    const [foo] = result.current;
    expect(foo!.ok).toEqual(true);
  });

  it('safely initializes objects to sessionStorage', () => {
    const { result } = renderHook(() => useSessionStorage<{ ok: boolean }>('foo', { ok: true }));
    const [foo] = result.current;
    expect(foo!.ok).toEqual(true);
  });

  it('safely sets objects to sessionStorage', () => {
    const { result, rerender } = renderHook(() => useSessionStorage<{ ok: any }>('foo', { ok: true }));

    const [, setFoo] = result.current;
    act(() => setFoo({ ok: 'bar' }));
    rerender();

    const [foo] = result.current;
    expect(foo!.ok).toEqual('bar');
  });

  it('safely returns objects from updates', () => {
    const { result, rerender } = renderHook(() => useSessionStorage<{ ok: any }>('foo', { ok: true }));

    const [, setFoo] = result.current;
    act(() => setFoo({ ok: 'bar' }));
    rerender();

    const [foo] = result.current;
    expect(foo).toBeInstanceOf(Object);
    expect(foo!.ok).toEqual('bar');
  });

  it('sets sessionStorage from the function updater', () => {
    const { result, rerender } = renderHook(() =>
      useSessionStorage<{ foo: string; fizz?: string }>('foo', { foo: 'bar' })
    );

    const [, setFoo] = result.current;
    act(() => setFoo((state) => ({ ...state!, fizz: 'buzz' })));
    rerender();

    const [value] = result.current;
    expect(value!.foo).toEqual('bar');
    expect(value!.fizz).toEqual('buzz');
  });

  it("function updater doesn't get stale state", () => {
    const { result, rerender } = renderHook(() => useSessionStorage('foo', false));

    act(() => result.current[1]((state) => !state));
    rerender();
    expect(result.current[0]).toEqual(true);

    act(() => result.current[1]((state) => !state));
    rerender();
    expect(result.current[0]).toEqual(false);
  });

  it('rejects nullish or undefined keys', () => {
    const { result } = renderHook(() => useSessionStorage(null as any));
    try {
      (() => {
        return result.current;
      })();
      fail('hook should have thrown');
    } catch (e) {
      expect(String(e)).toMatch(/key may not be/i);
    }
  });

  describe('remove', () => {
    it('removes value from sessionStorage and restores initialValue', () => {
      sessionStorage.setItem('foo', '"bar"');
      const { result, rerender } = renderHook(() => useSessionStorage('foo', 'initial'));
      const [, , remove] = result.current;

      act(() => remove());
      rerender();

      const [foo] = result.current;
      expect(foo).toEqual('initial');
      expect(sessionStorage.__STORE__.foo).toBeUndefined();
    });
  });

  /* Enforces proper eslint react-hooks/rules-of-hooks usage */
  describe('eslint react-hooks/rules-of-hooks', () => {
    it('memoizes an object between rerenders', () => {
      const { result, rerender } = renderHook(() => useSessionStorage('foo', { ok: true }));
      (() => {
        return result.current; // if sessionStorage isn't set then r1 and r2 will be different
      })();
      rerender();
      const [r2] = result.current;
      rerender();
      const [r3] = result.current;
      expect(r2).toBe(r3);
    });

    it('memoizes an object immediately if sessionStorage is already set', () => {
      sessionStorage.setItem('foo', JSON.stringify({ ok: true }));
      const { result, rerender } = renderHook(() => useSessionStorage('foo', { ok: true }));

      const [r1] = result.current; // if sessionStorage isn't set then r1 and r2 will be different
      rerender();
      const [r2] = result.current;
      expect(r1).toBe(r2);
    });

    it('memoizes the setState function', () => {
      sessionStorage.setItem('foo', JSON.stringify({ ok: true }));
      const { result, rerender } = renderHook(() => useSessionStorage('foo', { ok: true }));
      const [, s1] = result.current;
      rerender();
      const [, s2] = result.current;
      expect(s1).toBe(s2);
    });
  });

  describe('Options: raw', () => {
    it('is backwards compatible with old signature', () => {
      sessionStorage.setItem('foo', JSON.stringify({ fizz: 'buzz' }));
      const { result } = renderHook(() => useSessionStorage('foo', null, (true as unknown) as { raw: true }));
      const [foo] = result.current;
      expect(typeof foo).toBe('string');
    });

    it('returns a string when sessionStorage is a stringified object', () => {
      sessionStorage.setItem('foo', JSON.stringify({ fizz: 'buzz' }));
      const { result } = renderHook(() => useSessionStorage('foo', null, { raw: true }));
      const [foo] = result.current;
      expect(typeof foo).toBe('string');
    });

    it('returns a string after an update', () => {
      sessionStorage.setItem('foo', JSON.stringify({ fizz: 'buzz' }));
      const { result, rerender } = renderHook(() => useSessionStorage('foo', null, { raw: true }));

      const [, setFoo] = result.current;

      act(() => setFoo({ fizz: 'bang' } as any));
      rerender();

      const [foo] = result.current;
      expect(typeof foo).toBe('string');

      expect(JSON.parse(foo!)).toBeInstanceOf(Object);

      // expect(JSON.parse(foo!).fizz).toEqual('bang');
    });

    it('still forces setState to a string', () => {
      sessionStorage.setItem('foo', JSON.stringify({ fizz: 'buzz' }));
      const { result, rerender } = renderHook(() => useSessionStorage('foo', null, { raw: true }));

      const [, setFoo] = result.current;

      act(() => setFoo({ fizz: 'bang' } as any));
      rerender();

      const [value] = result.current;

      expect(JSON.parse(value!).fizz).toEqual('bang');
    });
  });

  describe('Options: serializer & deserializer', () => {
    const opts = {
      raw: false,
      serializer: (value: string): string => value.toUpperCase(),
      deserializer: (value: string): string => value.toLowerCase(),
    };

    it('uses deserializer for existing value', () => {
      sessionStorage.setItem('foo', 'BAZ');
      const { result } = renderHook(() => useSessionStorage('foo', 'initial', opts));
      const [state] = result.current;
      expect(state).toEqual('baz');
    });

    it('uses serializer and deserializer when updating value', () => {
      const { result, rerender } = renderHook(() => useSessionStorage('foo', 'initial', opts));

      const [, setFoo] = result.current;
      act(() => setFoo('baz'));
      rerender();

      const [foo] = result.current;
      expect(foo).toEqual('baz');
      expect(sessionStorage.__STORE__.foo).toEqual('BAZ');
    });
  });
});
