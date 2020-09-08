import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { DependencyList } from 'react';
import { UseDebounceReturn } from '../src/useDebounce';
import { useDebounce } from '../src';

describe('useDebounce', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(useDebounce).toBeDefined();
  });

  it('should return two functions', () => {
    const hook = renderHook(() => useDebounce(() => {}, 5));

    expect(hook.result.current.length).toBe(2);
    expect(typeof hook.result.current[0]).toBe('function');
    expect(typeof hook.result.current[1]).toBe('function');
  });

  function getHook(
    ms: number = 5,
    dep: DependencyList = []
  ): [jest.Mock, RenderHookResult<{ delay: number; deps: DependencyList }, UseDebounceReturn>] {
    const spy = jest.fn();
    return [
      spy,
      renderHook(({ delay = 5, deps = [] }) => useDebounce(spy, delay, deps), {
        initialProps: {
          delay: ms,
          deps: dep,
        },
      }),
    ];
  }

  it('should call passed function after given amount of time', () => {
    const [spy] = getHook();

    expect(spy).not.toHaveBeenCalled();
    jest.advanceTimersByTime(5);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should cancel function call on unmount', () => {
    const [spy, hook] = getHook();

    expect(spy).not.toHaveBeenCalled();
    hook.unmount();
    jest.advanceTimersByTime(5);
    expect(spy).not.toHaveBeenCalled();
  });

  it('first function should return actual state of debounce', () => {
    let [, hook] = getHook();
    let [isReady] = hook.result.current;

    expect(isReady()).toBe(false);
    hook.unmount();
    expect(isReady()).toBe(null);

    [, hook] = getHook();
    [isReady] = hook.result.current;
    jest.advanceTimersByTime(5);
    expect(isReady()).toBe(true);
  });

  it('second function should cancel debounce', () => {
    const [spy, hook] = getHook();
    const [isReady, cancel] = hook.result.current;

    expect(spy).not.toHaveBeenCalled();
    expect(isReady()).toBe(false);

    act(() => {
      cancel();
    });
    jest.advanceTimersByTime(5);

    expect(spy).not.toHaveBeenCalled();
    expect(isReady()).toBe(null);
  });

  it('should reset timeout on delay change', () => {
    const [spy, hook] = getHook(50);

    expect(spy).not.toHaveBeenCalled();
    hook.rerender({ delay: 5, deps: [] });

    jest.advanceTimersByTime(5);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should reset timeout on deps change', () => {
    const [spy, hook] = getHook(50, [5, 6]);

    jest.advanceTimersByTime(45);
    expect(spy).not.toHaveBeenCalled();
    hook.rerender({ delay: 50, deps: [6, 6] });

    jest.advanceTimersByTime(45);
    expect(spy).not.toHaveBeenCalled();
    jest.advanceTimersByTime(5);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
