import { act, renderHook } from '@testing-library/react-hooks';
import { replaceRaf } from 'raf-stub';
import useRafState from '../src/useRafState';

interface RequestAnimationFrame {
  reset(): void;
  step(): void;
}

declare var requestAnimationFrame: RequestAnimationFrame;

replaceRaf();

beforeEach(() => {
  requestAnimationFrame.reset();
});

afterEach(() => {
  requestAnimationFrame.reset();
});

describe('useRafState', () => {
  it('should be defined', () => {
    expect(useRafState).toBeDefined();
  });

  it('should only update state after requestAnimationFrame when providing an object', () => {
    const { result } = renderHook(() => useRafState(0));

    act(() => {
      result.current[1](1);
    });
    expect(result.current[0]).toBe(0);

    act(() => {
      requestAnimationFrame.step();
    });
    expect(result.current[0]).toBe(1);

    act(() => {
      result.current[1](2);
      requestAnimationFrame.step();
    });
    expect(result.current[0]).toBe(2);

    act(() => {
      result.current[1]((prevState) => prevState * 2);
      requestAnimationFrame.step();
    });
    expect(result.current[0]).toBe(4);
  });

  it('should only update state after requestAnimationFrame when providing a function', () => {
    const { result } = renderHook(() => useRafState(0));

    act(() => {
      result.current[1]((prevState) => prevState + 1);
    });
    expect(result.current[0]).toBe(0);

    act(() => {
      requestAnimationFrame.step();
    });
    expect(result.current[0]).toBe(1);

    act(() => {
      result.current[1]((prevState) => prevState * 3);
      requestAnimationFrame.step();
    });
    expect(result.current[0]).toBe(3);
  });

  it('should cancel update state on unmount', () => {
    const { unmount } = renderHook(() => useRafState(0));
    const spyRafCancel = jest.spyOn(global, 'cancelAnimationFrame' as any);

    expect(spyRafCancel).not.toHaveBeenCalled();

    unmount();

    expect(spyRafCancel).toHaveBeenCalledTimes(1);
  });
});
