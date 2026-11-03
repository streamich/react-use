import { renderHook } from '@testing-library/react-hooks';
import createMemo from '../src/factory/createMemo';

const getDouble = jest.fn((n: number): number => n * 2);

it('should init memo hook', () => {
  const useMemoGetDouble = createMemo(getDouble);

  expect(useMemoGetDouble).toBeInstanceOf(Function);
});

describe('when using created memo hook', () => {
  let useMemoGetDouble;

  beforeEach(() => {
    useMemoGetDouble = createMemo(getDouble);
  });

  it.each([[1], [3], [5]])(
    'should return same result as original function for argument %d',
    (val: number) => {
      const { result } = renderHook(() => useMemoGetDouble(val));
      expect(result.current).toBe(getDouble(val));
    }
  );

  it('should NOT call original function for same arguments', () => {
    let initialValue = 5;
    expect(getDouble).not.toHaveBeenCalled();

    // it's called first time calculating for argument 5
    const { rerender } = renderHook(() => useMemoGetDouble(initialValue));
    expect(getDouble).toHaveBeenCalled();

    getDouble.mockClear();

    // it's NOT called second time calculating for argument 5
    rerender();
    expect(getDouble).not.toHaveBeenCalled();

    getDouble.mockClear();

    // it's called again calculating for different argument
    initialValue = 7;
    rerender();
    expect(getDouble).toHaveBeenCalled();
  });
});

describe('when the number of arguments changes', () => {
  let consoleError: jest.SpyInstance;

  beforeEach(() => {
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleError.mockRestore();
  });

  it.each<{ initialArgs: Array<number | undefined>; nextArgs: Array<number | undefined> }>([
    { initialArgs: [], nextArgs: [1] },
    { initialArgs: [1], nextArgs: [] },
    { initialArgs: [1], nextArgs: [1, 2] },
    { initialArgs: [1, 2], nextArgs: [1] },
    { initialArgs: [], nextArgs: [undefined] },
    { initialArgs: [undefined], nextArgs: [] },
  ])('should recalculate when argument count changes (%j)', ({ initialArgs, nextArgs }) => {
    const collect = jest.fn((...args: Array<number | undefined>) => args);
    const useCollect = createMemo(collect);
    const { result, rerender } = renderHook(({ args }) => useCollect(...args), {
      initialProps: { args: initialArgs },
    });

    expect(result.current).toEqual(initialArgs);

    rerender({ args: nextArgs });

    expect(result.current).toEqual(nextArgs);
    expect(collect).toHaveBeenCalledTimes(2);
    expect(consoleError).not.toHaveBeenCalled();

    const previousResult = result.current;
    rerender({ args: [...nextArgs] });

    expect(result.current).toBe(previousResult);
    expect(collect).toHaveBeenCalledTimes(2);
  });
});

it('should memoize a call without arguments', () => {
  const fn = jest.fn(() => ({}));
  const useMemoFn = createMemo(fn);
  const { result, rerender } = renderHook(() => useMemoFn());
  const initialResult = result.current;

  rerender();

  expect(result.current).toBe(initialResult);
  expect(fn).toHaveBeenCalledTimes(1);
});

it('should compare arguments with Object.is semantics', () => {
  const fn = jest.fn((value: number) => ({ value }));
  const useMemoFn = createMemo(fn);
  const { result, rerender } = renderHook(({ value }) => useMemoFn(value), {
    initialProps: { value: NaN },
  });
  const initialResult = result.current;

  rerender({ value: NaN });

  expect(result.current).toBe(initialResult);
  expect(fn).toHaveBeenCalledTimes(1);

  rerender({ value: 0 });
  expect(result.current.value).toBe(0);

  rerender({ value: -0 });
  expect(result.current.value).toBe(-0);
  expect(fn).toHaveBeenCalledTimes(3);
});

it('should compare object arguments by identity', () => {
  const fn = jest.fn((value: object) => ({ value }));
  const useMemoFn = createMemo(fn);
  const value = {};
  const { result, rerender } = renderHook(({ argument }) => useMemoFn(argument), {
    initialProps: { argument: value },
  });
  const initialResult = result.current;

  rerender({ argument: value });
  expect(result.current).toBe(initialResult);
  expect(fn).toHaveBeenCalledTimes(1);

  const nextValue = {};
  rerender({ argument: nextValue });
  expect(result.current.value).toBe(nextValue);
  expect(fn).toHaveBeenCalledTimes(2);
});

it('should memoize each hook instance separately', () => {
  const fn = jest.fn((value: number) => ({ value }));
  const useMemoFn = createMemo(fn);
  const { result, rerender } = renderHook(() => [useMemoFn(1), useMemoFn(2)]);
  const initialResults = result.current;

  rerender();

  expect(result.current[0]).toBe(initialResults[0]);
  expect(result.current[1]).toBe(initialResults[1]);
  expect(fn).toHaveBeenCalledTimes(2);
});
