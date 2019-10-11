import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { useState } from 'react';
import useStateValidator, { UseValidatorReturn, Validator } from '../useStateValidator';

interface Mock extends jest.Mock {}

describe('useStateValidator', () => {
  it('should be defined', () => {
    expect(useStateValidator).toBeDefined();
  });

  function getHook(
    fn: Validator<any> = jest.fn(state => [!!(state % 2)])
  ): [jest.Mock | Function, RenderHookResult<any, [Function, UseValidatorReturn<any>]>] {
    return [
      fn,
      renderHook(() => {
        const [state, setState] = useState(1);

        return [setState, useStateValidator(state, fn)];
      }),
    ];
  }

  it('should return an array of two elements', () => {
    const [, hook] = getHook();
    const res = hook.result.current[1];

    expect(Array.isArray(res)).toBe(true);
    expect(res[0]).toEqual([true]);
    expect(typeof res[1]).toBe('function');
  });

  it('first element should represent current validity state', () => {
    const [, hook] = getHook();
    let [setState, [validity]] = hook.result.current;
    expect(validity).toEqual([true]);

    act(() => setState(3));
    [setState, [validity]] = hook.result.current;
    expect(validity).toEqual([true]);

    act(() => setState(4));
    [setState, [validity]] = hook.result.current;
    expect(validity).toEqual([false]);
  });

  it('second element should re-call validation', () => {
    const [spy, hook] = getHook();
    const [, [, revalidate]] = hook.result.current;

    expect(spy).toHaveBeenCalledTimes(1);
    act(() => revalidate());
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('validator have to be called on init plus on each state update', () => {
    const [spy, hook] = getHook(jest.fn());
    const [setState] = hook.result.current;

    expect(spy).toHaveBeenCalledTimes(1);
    act(() => setState(4));
    expect(spy).toHaveBeenCalledTimes(2);
    act(() => setState(prevState => prevState + 1));
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('should pass to validator one parameter - current state', () => {
    const [spy, hook] = getHook(jest.fn());
    const [setState] = hook.result.current;

    act(() => setState(4));
    act(() => setState(5));
    expect((spy as Mock).mock.calls[0].length).toBe(1);
    expect((spy as Mock).mock.calls[0].length).toBe(1);
    expect((spy as Mock).mock.calls[0][0]).toBe(1);
    expect((spy as Mock).mock.calls[1].length).toBe(1);
    expect((spy as Mock).mock.calls[1][0]).toBe(4);
    expect((spy as Mock).mock.calls[2].length).toBe(1);
    expect((spy as Mock).mock.calls[2][0]).toBe(5);
  });

  it('if validator expects 2nd parameters it should pass a validity setter there', () => {
    const [spy, hook] = getHook(jest.fn((state, setValidity) => setValidity!([state % 2 === 0])));
    let [setState, [[isValid]]] = hook.result.current;

    expect((spy as Mock).mock.calls[0].length).toBe(2);
    expect(typeof (spy as Mock).mock.calls[0][1]).toBe('function');

    expect(isValid).toBe(false);
    act(() => setState(prevState => prevState + 1));

    [setState, [[isValid]]] = hook.result.current;
    expect(isValid).toBe(true);
    act(() => setState(5));

    [setState, [[isValid]]] = hook.result.current;
    expect(isValid).toBe(false);
  });
});
