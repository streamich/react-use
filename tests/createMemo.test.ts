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
