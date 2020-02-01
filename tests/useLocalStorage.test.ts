import { renderHook, act } from "@testing-library/react-hooks";
import { useLocalStorage } from "../src";

const STRINGIFIED_VALUE = '{"a":"b"}';
const JSONIFIED_VALUE = { a: "b" };

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

it("should return undefined if no initialValue provided and localStorage empty", () => {
  const { result } = renderHook(() => useLocalStorage("some_key"));

  expect(result.current[0]).toBeUndefined();
});

it("should set the value from existing localStorage key", () => {
  const key = "some_key";
  localStorage.setItem(key, STRINGIFIED_VALUE);

  const { result } = renderHook(() => useLocalStorage(key));

  expect(result.current[0]).toEqual(JSONIFIED_VALUE);
});

it("should return initialValue if localStorage empty and set that to localStorage", () => {
  const key = "some_key";
  const value = "some_value";

  const { result } = renderHook(() => useLocalStorage(key, value));

  expect(result.current[0]).toBe(value);
  expect(localStorage.__STORE__[key]).toBe(`"${value}"`);
});

it("should return the value from localStorage if exists even if initialValue provied", () => {
  const key = "some_key";
  localStorage.setItem(key, STRINGIFIED_VALUE);

  const { result } = renderHook(() => useLocalStorage(key, "random_value"));

  expect(result.current[0]).toEqual(JSONIFIED_VALUE);
});

it("should properly update the localStorage on change", () => {
  const key = "some_key";
  const updatedValue = { b: "a" };
  const expectedValue = '{"b":"a"}';

  const { result } = renderHook(() => useLocalStorage(key));

  act(() => {
    result.current[1](updatedValue);
  });

  expect(result.current[0]).toBe(updatedValue);
  expect(localStorage.__STORE__[key]).toBe(expectedValue);
});

it("should properly update the localStorageOnChange when component unmounts", () => {
  const key = "some_key";
  const updatedValue = { b: "a" };
  const expectedValue = '{"b":"a"}';

  const { result, unmount } = renderHook(() => useLocalStorage(key));

  unmount();

  act(() => {
    result.current[1](updatedValue);
  });
  console.log("assert");
  expect(localStorage.__STORE__[key]).toBe(expectedValue);
});

describe("Options with raw true", () => {
  it("should set the value from existing localStorage key", () => {
    const key = "some_key";
    localStorage.setItem(key, STRINGIFIED_VALUE);

    const { result } = renderHook(() => useLocalStorage(key, "", { raw: true }));

    expect(result.current[0]).toEqual(STRINGIFIED_VALUE);
  });

  it("should return initialValue if localStorage empty and set that to localStorage", () => {
    const key = "some_key";

    const { result } = renderHook(() => useLocalStorage(key, STRINGIFIED_VALUE, { raw: true }));

    expect(result.current[0]).toBe(STRINGIFIED_VALUE);
    expect(localStorage.__STORE__[key]).toBe(STRINGIFIED_VALUE);
  });
});

describe("Options with raw false and provided serializer/deserializer", () => {
  const serializer = (_: string) => "321";
  const deserializer = (_: string) => "123";

  it("should return valid serialized value from existing localStorage key", () => {
    const key = "some_key";
    localStorage.setItem(key, STRINGIFIED_VALUE);

    const { result } = renderHook(() =>
      useLocalStorage(key, STRINGIFIED_VALUE, { raw: false, serializer, deserializer })
    );

    expect(result.current[0]).toBe("123");
  });
});
