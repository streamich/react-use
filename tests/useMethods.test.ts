import { renderHook, act } from '@testing-library/react-hooks';
import { useMethods } from '../src';

it('should init with initialState', () => {
  const initialState = {
    count: 10,
  };

  const createMethods = (state) => ({
    doStuff: () => state,
  });

  const { result } = renderHook(() => useMethods(createMethods, initialState));

  expect(result.current[0]).toEqual(initialState);
});

it('should init with lazy initialized value', () => {
  const initArg = 10;

  const init = (initialCount: number) => ({ count: initialCount });

  const createMethods = (state) => ({
    doStuff: () => state,
  });

  const { result } = renderHook(() => useMethods(createMethods, initArg, init));

  expect(result.current[0]).toEqual({ count: initArg });
});

it('should return wrappedMethods object containing all the methods defined in createMethods', () => {
  const initialState = {
    count: 10,
  };

  const createMethods = (state) => ({
    reset() {
      return initialState;
    },
    increment() {
      return { ...state, count: state.count + 1 };
    },
    decrement() {
      return { ...state, count: state.count - 1 };
    },
  });

  const { result } = renderHook(() => useMethods(createMethods, initialState));

  for (const key of Object.keys(createMethods(initialState))) {
    expect(result.current[1][key]).toBeDefined();
  }
});

it('should properly update the state based on the createMethods when initialState provided', () => {
  const count = 10;
  const initialState = {
    count,
  };

  const createMethods = (state) => ({
    reset() {
      return initialState;
    },
    increment() {
      return { ...state, count: state.count + 1 };
    },
    decrement() {
      return { ...state, count: state.count - 1 };
    },
  });

  const { result } = renderHook(() => useMethods(createMethods, initialState));

  act(() => {
    result.current[1].increment();
  });
  expect(result.current[0].count).toBe(count + 1);

  act(() => {
    result.current[1].decrement();
  });
  expect(result.current[0].count).toBe(count);

  act(() => {
    result.current[1].decrement();
  });
  expect(result.current[0].count).toBe(count - 1);

  act(() => {
    result.current[1].reset();
  });
  expect(result.current[0].count).toBe(count);
});

it('should properly update the state based on the createMethods when lazy initialized', () => {
  const count = 10;

  const init = (initialCount: number) => ({ count: initialCount });

  const createMethods = (state) => ({
    reset() {
      return init(count);
    },
    increment() {
      return { ...state, count: state.count + 1 };
    },
    decrement() {
      return { ...state, count: state.count - 1 };
    },
  });

  const { result } = renderHook(() => useMethods(createMethods, count, init));

  act(() => {
    result.current[1].increment();
  });
  expect(result.current[0].count).toBe(count + 1);

  act(() => {
    result.current[1].decrement();
  });
  expect(result.current[0].count).toBe(count);

  act(() => {
    result.current[1].decrement();
  });
  expect(result.current[0].count).toBe(count - 1);

  act(() => {
    result.current[1].reset();
  });
  expect(result.current[0].count).toBe(count);
});
