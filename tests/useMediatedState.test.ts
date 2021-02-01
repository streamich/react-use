import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { Dispatch, SetStateAction } from 'react';
import { useMediatedState } from '../src';
import { StateMediator, UseMediatedStateReturn } from '../src/useMediatedState';

describe('useMediatedState', () => {
  it('should be defined', () => {
    expect(useMediatedState).toBeDefined();
  });

  function getHook(
    initialState: number = 2,
    fn: StateMediator<number> = jest.fn((newState) => newState / 2)
  ): [jest.Mock | StateMediator, RenderHookResult<any, UseMediatedStateReturn<number>>] {
    return [fn, renderHook(() => useMediatedState<number>(fn, initialState))];
  }

  it('should return array of two elements', () => {
    const [, hook] = getHook();

    expect(Array.isArray(hook.result.current)).toBe(true);
    expect(hook.result.current[0]).toBe(2);
    expect(typeof hook.result.current[1]).toBe('function');
  });

  it('should act like regular useState but with mediator call on each setState', () => {
    const [spy, hook] = getHook();

    expect(hook.result.current[0]).toBe(2);

    act(() => hook.result.current[1](3));
    expect(hook.result.current[0]).toBe(1.5);
    expect(spy).toHaveBeenCalledTimes(1);

    act(() => hook.result.current[1](4));
    expect(hook.result.current[0]).toBe(2);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should not call mediator on init', () => {
    const [spy] = getHook();

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('mediator should receive setState argument as first argument', () => {
    let val;
    const spy = jest.fn((newState) => {
      val = newState;
      return newState * 2;
    });
    const [, hook] = getHook(1, spy);

    act(() => hook.result.current[1](3));
    expect(val).toBe(3);
    expect(hook.result.current[0]).toBe(6);
  });

  it('if mediator expects 2 args, second should be a function setting the state', () => {
    const spy = (jest.fn((newState: number, setState: Dispatch<SetStateAction<number>>): void => {
      setState(newState * 2);
    }) as unknown) as StateMediator<number>;
    const [, hook] = getHook(1, spy);

    act(() => hook.result.current[1](3));
    expect(hook.result.current[0]).toBe(6);
  });
});
