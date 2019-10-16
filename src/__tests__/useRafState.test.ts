import { act, renderHook } from '@testing-library/react-hooks';
import { replaceRaf } from 'raf-stub';
import useRafState from '../useRafState';

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

  const hook = renderHook(() => useRafState(0));

  it('should only update state after requestAnimationFrame when providing an object', () => {
    act(() => {
      hook.result.current[1](1);
    });
    expect(hook.result.current[0]).toBe(0);

    act(() => {
      requestAnimationFrame.step();
    });
    expect(hook.result.current[0]).toBe(1);

    act(() => {
      hook.result.current[1](2);
      requestAnimationFrame.step();
    });
    expect(hook.result.current[0]).toBe(2);

    act(() => {
      hook.result.current[1](prevState => prevState * 2);
      requestAnimationFrame.step();
    });
    expect(hook.result.current[0]).toBe(4);
  });

  it('should only update state after requestAnimationFrame when providing a function', () => {
    act(() => {
      hook.result.current[1](prevState => prevState + 1);
    });
    expect(hook.result.current[0]).toBe(4);

    act(() => {
      requestAnimationFrame.step();
    });
    expect(hook.result.current[0]).toBe(5);

    act(() => {
      hook.result.current[1](prevState => prevState * 3);
      requestAnimationFrame.step();
    });
    expect(hook.result.current[0]).toBe(15);
  });
});
