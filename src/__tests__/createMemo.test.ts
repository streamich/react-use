import { renderHook } from '@testing-library/react-hooks';
import createMemo from '../createMemo';

const fibonacci = jest.fn((n: number) => {
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
});

describe('createMemo hook factory', () => {
  it('should init memoized hook', () => {
    const useMemoFibonacci = createMemo(fibonacci);

    expect(useMemoFibonacci).toBeInstanceOf(Function);
  });

  describe('created memo hook', () => {
    let useMemoFibonacci;
    const setUp = (initialValue: any) => renderHook(() => useMemoFibonacci(initialValue));

    beforeEach(() => {
      useMemoFibonacci = createMemo(fibonacci);
    });

    it.each([[1], [3], [5]])('should return same result as original function for argument %d', (val: number) => {
      const { result } = setUp(val);
      expect(result.current).toBe(fibonacci(val));
    });

    // MB: Is `createMemo` really memoizing original fn? Or problem mocking fn for tests here?
    xit('should NOT call original function for same arguments', () => {
      // call memo fn and get how many times original fn was called
      setUp(5);
      const memoFnCalledTimes = fibonacci.mock.calls.length;
      console.log(fibonacci.mock.calls.length);

      fibonacci.mockClear();
      console.log(fibonacci.mock.calls.length);

      // call original fn and get how many times it was called
      fibonacci(5);
      const originalFnCalledTimes = fibonacci.mock.calls.length;
      console.log(fibonacci.mock.calls.length);

      expect(memoFnCalledTimes).toBeLessThan(originalFnCalledTimes);
    });
  });
});
