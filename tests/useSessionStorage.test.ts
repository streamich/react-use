import { renderHook, act } from '@testing-library/react-hooks';
import { useSessionStorage } from '../src';

const STRINGIFIED_VALUE = '{"a":"b"}';
const JSONIFIED_VALUE = { a: 'b' };

afterEach(() => {
  sessionStorage.clear();
  jest.clearAllMocks();
});

it('should return undefined if no initialValue provided and sessionStorage empty', () => {
  const { result } = renderHook(() => useSessionStorage('some_key'));

  expect(result.current[0]).toBeUndefined();
});

it('should set the value from existing sessionStorage key', () => {
  const key = 'some_key';
  sessionStorage.setItem(key, STRINGIFIED_VALUE);

  const { result } = renderHook(() => useSessionStorage(key));

  expect(result.current[0]).toEqual(JSONIFIED_VALUE);
});

it('should return initialValue if sessionStorage empty and set that to sessionStorage', () => {
  const key = 'some_key';
  const value = 'some_value';

  const { result } = renderHook(() => useSessionStorage(key, value));

  expect(result.current[0]).toBe(value);
  expect(sessionStorage.__STORE__[key]).toBe(`"${value}"`);
});

it('should return the value from sessionStorage if exists even if initialValue provided', () => {
  const key = 'some_key';
  sessionStorage.setItem(key, STRINGIFIED_VALUE);

  const { result } = renderHook(() => useSessionStorage(key, 'random_value'));

  expect(result.current[0]).toEqual(JSONIFIED_VALUE);
});

it('should properly update the sessionStorage on change', () => {
  const key = 'some_key';
  const updatedValue = { b: 'a' };
  const expectedValue = '{"b":"a"}';

  const { result } = renderHook(() => useSessionStorage(key));

  act(() => {
    result.current[1](updatedValue);
  });

  expect(result.current[0]).toBe(updatedValue);
  expect(sessionStorage.__STORE__[key]).toBe(expectedValue);
});

describe('Options with raw true', () => {
  it('should set the value from existing sessionStorage key', () => {
    const key = 'some_key';
    sessionStorage.setItem(key, STRINGIFIED_VALUE);

    const { result } = renderHook(() => useSessionStorage(key, '', { raw: true }));

    expect(result.current[0]).toEqual(STRINGIFIED_VALUE);
  });

  it('should return initialValue if sessionStorage empty and set that to sessionStorage', () => {
    const key = 'some_key';

    const { result } = renderHook(() => useSessionStorage(key, STRINGIFIED_VALUE, { raw: true }));

    expect(result.current[0]).toBe(STRINGIFIED_VALUE);
    expect(sessionStorage.__STORE__[key]).toBe(STRINGIFIED_VALUE);
  });
});

describe('Options with raw false and provided serializer/deserializer', () => {
  const serializer = (_: string) => '321';
  const deserializer = (_: string) => '123';

  it('should return valid serialized value from existing sessionStorage key', () => {
    const key = 'some_key';
    sessionStorage.setItem(key, STRINGIFIED_VALUE);

    const { result } = renderHook(() =>
      useSessionStorage(key, STRINGIFIED_VALUE, { raw: false, serializer, deserializer })
    );

    expect(result.current[0]).toBe('123');
  });
});


