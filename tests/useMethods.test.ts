import { renderHook, act } from '@testing-library/react-hooks';
import { useMethods } from '../src';

it('should have initialState value as the returned state value', () => {
  const initialState = {
    count: 10,
  };

  const createMethods = (state) => ({
    doStuff: () => state,
  });

  const { result } = renderHook(() => useMethods(createMethods, initialState));

  expect(result.current[0]).toEqual(initialState);
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

it('should properly update the state based on the createMethods', () => {
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

it('should not update the returned methods reference when initialState changes', () => {
  const initialState = {
    count: 10,
  };

  const createMethods = () => ({
    reset() {
      return initialState;
    },
  });

  const { result, rerender } = renderHook(
    ({ initialState }) => useMethods(createMethods, initialState),
    {
      initialProps: { initialState },
    }
  );

  const [, firstMethodsReference] = result.current;
  rerender({ initialState: { count: 20 } });
  const [, methodsReferenceAfterRerender] = result.current;

  expect(firstMethodsReference).toBe(methodsReferenceAfterRerender);
});
