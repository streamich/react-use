import { renderHook, act } from '@testing-library/react-hooks';
import useStack from '../src/useStack';

describe('useStack', () => {
  it('should initialize with initial values', () => {
    const { result } = renderHook(() => useStack([1, 2]));
    expect(result.current[0]).toEqual([1, 2]);
  });

  it('should push and pop elements correctly', () => {
    const { result } = renderHook(() => useStack<number>());
    const [, actions] = result.current;

    act(() => {
      actions.push(10);
      actions.push(20);
    });

    expect(result.current[0]).toEqual([10, 20]);
    expect(actions.peek()).toBe(20);

    act(() => {
      actions.pop();
    });

    expect(result.current[0]).toEqual([10]);
  });

  it('should clear and reset stack', () => {
    const { result } = renderHook(() => useStack([1, 2, 3]));
    const [, actions] = result.current;

    act(() => {
      actions.clear();
    });
    expect(result.current[0]).toEqual([]);

    act(() => {
      actions.reset();
    });
    expect(result.current[0]).toEqual([1, 2, 3]);
  });

  it('should return correct size', () => {
    const { result } = renderHook(() => useStack([1, 2]));
    const [, actions] = result.current;
    expect(actions.size()).toBe(2);
  });
});
