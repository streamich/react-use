import { act, renderHook } from '@testing-library/react-hooks';
import { createSharedState } from '../src/factory/createSharedState';

it('should init shared state hook function', () => {
  const useSharedState = createSharedState(0);
  expect(useSharedState).toBeInstanceOf(Function);
});

describe('when using shared state hook', () => {
  it('both components should be updated', () => {
    const useCounter = createSharedState(0);
    const { result: result1 } = renderHook(() => useCounter());
    const { result: result2 } = renderHook(() => useCounter());

    expect(result1.current[0]).toBe(0);
    expect(result2.current[0]).toBe(0);

    act(() => {
      result1.current[1](1);
    });

    expect(result1.current[0]).toBe(1);
    expect(result2.current[0]).toBe(1);
  });

  it('allows setting state with function and previous value', () => {
    const useCounter = createSharedState(0);
    const { result: result1 } = renderHook(() => useCounter());
    const { result: result2 } = renderHook(() => useCounter());

    expect(result1.current[0]).toBe(0);
    expect(result2.current[0]).toBe(0);

    act(() => {
      result1.current[1]((value) => value + 1);
    });
    
    expect(result1.current[0]).toBe(1);
    expect(result2.current[0]).toBe(1);
  });

  it('initializes undefined', () => {
    const useCounter = createSharedState<number>();
    const { result: result1 } = renderHook(() => useCounter());
    const { result: result2 } = renderHook(() => useCounter());

    expect(result1.current[0]).toBe(undefined);
    expect(result2.current[0]).toBe(undefined);

    act(() => {
      result1.current[1](1);
    });

    expect(result1.current[0]).toBe(1);
    expect(result2.current[0]).toBe(1);
  });

  it('initializes with function', () => {
    const useCounter = createSharedState(() => 0);
    const { result: result1 } = renderHook(() => useCounter());
    const { result: result2 } = renderHook(() => useCounter());

    expect(result1.current[0]).toBe(0);
    expect(result2.current[0]).toBe(0);

    act(() => {
      result1.current[1](1);
    });

    expect(result1.current[0]).toBe(1);
    expect(result2.current[0]).toBe(1);
  });

  it('get value support selector', () => {
    const useCounter = createSharedState(() => ({ value: 0 }));
    const { result } = renderHook(() => useCounter((counter) => counter.value));

    expect(result.current[0]).toBe(0);

    act(() => {
      result.current[1]({ value: 1 });
    });

    expect(result.current[0]).toBe(1);
  })
})