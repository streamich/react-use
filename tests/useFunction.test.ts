import { renderHook, act } from '@testing-library/react-hooks';
import useFunction from '../src/useFunction';
import { useState } from 'react';

describe('useFunction', () => {
  it('should always return same function', () => {
    const { result, rerender } = renderHook(() => useFunction(() => null));
    const initialResult = result.current;
    rerender();

    expect(initialResult).toEqual(expect.any(Function));
    expect(result.current).toBe(initialResult);
  });

  it('should call latest taken function', () => {
    const { result: { current: nextFibonacci } } = renderHook(() => {
      const [current, setCurrent] = useState(1);
      const [previous, setPrevious] = useState(0);

      return useFunction(() => {
        setCurrent(previous + current);
        setPrevious(current);
        return previous;
      });
    });
    const fibonacciSeries: number[] = [];

    for (let i = 0; i < 6; ++i) {
      act(() => {
        fibonacciSeries.push(nextFibonacci());
      });
    }

    expect(fibonacciSeries).toEqual([0, 1, 1, 2, 3, 5]);
  });
});
