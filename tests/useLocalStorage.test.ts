import useLocalStorage from '../src/useLocalStorage';
import 'jest-localstorage-mock';
import { renderHook, act } from '@testing-library/react-hooks';

describe(useLocalStorage, () => {
  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('retrieves an existing value from localStorage', () => {
    localStorage.setItem('foo', 'bar');
    const { result } = renderHook(() => useLocalStorage('foo'));
    const [state] = result.current;
    expect(state).toEqual('bar');
  });
  it('should return initialValue if localStorage empty and set that to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('foo', 'bar'));
    const [state] = result.current;
    expect(state).toEqual('bar');
    expect(localStorage.__STORE__.foo).toEqual('bar');
  });
  it('prefers existing value over initial state', () => {
    localStorage.setItem('foo', 'bar');
    const { result } = renderHook(() => useLocalStorage('foo', 'baz'));
    const [state] = result.current;
    expect(state).toEqual('bar');
  });
  it('does not clobber existing localStorage with initialState', () => {
    localStorage.setItem('foo', 'bar');
    const { result } = renderHook(() => useLocalStorage('foo', 'buzz'));
    result.current; // invoke current to make sure things are set
    expect(localStorage.__STORE__.foo).toEqual('bar');
  });
  it('correctly updates localStorage', () => {
    const { result, rerender } = renderHook(() => useLocalStorage('foo', 'bar'));

    const [, setFoo] = result.current;
    act(() => setFoo('baz'));
    rerender();

    expect(localStorage.__STORE__.foo).toEqual('baz');
  });
  it('should return undefined if no initialValue provided and localStorage empty', () => {
    const { result } = renderHook(() => useLocalStorage('some_key'));

    expect(result.current[0]).toBeUndefined();
  });
  it('returns and allow setting null', () => {
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
  it('should not double-JSON-stringify stringy values', () => {
    const { result, rerender } = renderHook(() => useLocalStorage('foo', 'bar'));

    const [, setFoo] = result.current;
    act(() => setFoo(JSON.stringify('baz')));
    rerender();

    const [foo] = result.current;
    expect(foo).not.toMatch(/\\/i); // should not contain extra escapes
    expect(foo).toBe('baz');
  });
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
  it('parses out objects from localStorage', () => {
    localStorage.setItem('foo', JSON.stringify({ ok: true }));
    const { result } = renderHook(() => useLocalStorage<{ ok: boolean }>('foo'));
    const [foo] = result.current;
    expect(foo.ok).toEqual(true);
  });
  it('safely initializes objects to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage<{ ok: boolean }>('foo', { ok: true }));
    const [foo] = result.current;
    expect(foo.ok).toEqual(true);
  });
  it('safely sets objects to localStorage', () => {
    const { result, rerender } = renderHook(() => useLocalStorage<{ ok: any }>('foo', { ok: true }));

    const [, setFoo] = result.current;
    act(() => setFoo({ ok: 'bar' }));
    rerender();

    const [foo] = result.current;
    expect(foo.ok).toEqual('bar');
  });
  it('safely returns objects from updates', () => {
    const { result, rerender } = renderHook(() => useLocalStorage<{ ok: any }>('foo', { ok: true }));

    const [, setFoo] = result.current;
    act(() => setFoo({ ok: 'bar' }));
    rerender();

    const [foo] = result.current;
    expect(foo).toBeInstanceOf(Object);
    expect(foo.ok).toEqual('bar');
  });
  it('sets localStorage from the function updater', () => {
    const { result, rerender } = renderHook(() =>
      useLocalStorage<{ foo: string; fizz?: string }>('foo', { foo: 'bar' })
    );

    const [, setFoo] = result.current;
    act(() => setFoo(state => ({ ...state, fizz: 'buzz' })));
    rerender();

    const [value] = result.current;
    expect(value.foo).toEqual('bar');
    expect(value.fizz).toEqual('buzz');
  });
  it('rejects nullish or undefined keys', () => {
    const { result } = renderHook(() => useLocalStorage(null as any));
    try {
      result.current;
      fail('hook should have thrown');
    } catch (e) {
      expect(String(e)).toMatch(/key may not be/i);
    }
  });
  it('should properly update the localStorageOnChange when component unmounts', () => {
    const key = 'some_key';
    const updatedValue = { b: 'a' };
    const expectedValue = '{"b":"a"}';

    const { result, unmount } = renderHook(() => useLocalStorage(key));

    unmount();

    act(() => {
      result.current[1](updatedValue);
    });

    expect(localStorage.__STORE__[key]).toBe(expectedValue);
  });
  /* Enforces proper eslint react-hooks/rules-of-hooks usage */
  describe('eslint react-hooks/rules-of-hooks', () => {
    it('memoizes an object between rerenders', () => {
      const { result, rerender } = renderHook(() => useLocalStorage('foo', { ok: true }));

      result.current; // if localStorage isn't set then r1 and r2 will be different
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
    const STRINGIFIED_VALUE = '{"a":"b"}';
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
      // @ts-ignore
      act(() => setFoo({ fizz: 'bang' }));
      rerender();

      const [foo] = result.current;
      expect(typeof foo).toBe('string');
      // @ts-ignore
      expect(JSON.parse(foo)).toBeInstanceOf(Object);
      // @ts-ignore
      expect(JSON.parse(foo).fizz).toEqual('bang');
    });
    it('still forces setState to a string', () => {
      localStorage.setItem('foo', JSON.stringify({ fizz: 'buzz' }));
      const { result, rerender } = renderHook(() => useLocalStorage('foo', null, { raw: true }));

      const [, setFoo] = result.current;
      // @ts-ignore
      act(() => setFoo({ fizz: 'bang' }));
      rerender();

      const [value] = result.current;
      // @ts-ignore
      expect(JSON.parse(value).fizz).toEqual('bang');
    });
    describe('raw true', () => {
      it('should set the value from existing localStorage key', () => {
        const key = 'some_key';
        localStorage.setItem(key, STRINGIFIED_VALUE);

        const { result } = renderHook(() => useLocalStorage(key, '', { raw: true }));

        expect(result.current[0]).toEqual(STRINGIFIED_VALUE);
      });
      it('should return initialValue if localStorage empty and set that to localStorage', () => {
        const key = 'some_key';

        const { result } = renderHook(() => useLocalStorage(key, STRINGIFIED_VALUE, { raw: true }));

        expect(result.current[0]).toBe(STRINGIFIED_VALUE);
        expect(localStorage.__STORE__[key]).toBe(STRINGIFIED_VALUE);
      });
    });
    describe('raw false and provided serializer/deserializer', () => {
      const serializer = (_: string) => '321';
      const deserializer = (_: string) => '123';
      it('should return valid serialized value from existing localStorage key', () => {
        const key = 'some_key';
        localStorage.setItem(key, STRINGIFIED_VALUE);

        const { result } = renderHook(() =>
          useLocalStorage(key, STRINGIFIED_VALUE, { raw: false, serializer, deserializer })
        );

        expect(result.current[0]).toBe('123');
      });
    });
  });
});
