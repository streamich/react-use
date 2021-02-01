import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { useState } from 'react';
import { MultiStateValidator, useMultiStateValidator } from '../src/useMultiStateValidator';
import { UseStateValidatorReturn, ValidityState } from '../src/useStateValidator';

interface Mock extends jest.Mock {}

describe('useMultiStateValidator', () => {
  it('should be defined', () => {
    expect(useMultiStateValidator).toBeDefined();
  });

  const defaultStatesValidator = (states: number[]) => [states.every((num) => !(num % 2))];

  function getHook(
    fn: MultiStateValidator<any, number[]> = jest.fn(defaultStatesValidator),
    initialStates = [1, 2],
    initialValidity = [false]
  ): [
    MultiStateValidator<any, number[]>,
    RenderHookResult<any, [Function, UseStateValidatorReturn<ValidityState>]>
  ] {
    return [
      fn,
      renderHook(
        ({ initStates, validator, initValidity }) => {
          const [states, setStates] = useState(initStates);

          return [setStates, useMultiStateValidator(states, validator, initValidity)];
        },
        {
          initialProps: {
            initStates: initialStates,
            initValidity: initialValidity,
            validator: fn,
          },
        }
      ),
    ];
  }

  it('should return an array of two elements', () => {
    const [, hook] = getHook();
    const res = hook.result.current[1];

    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBe(2);
  });

  it('should call validator on init', () => {
    const [spy] = getHook();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call validator on any of states changed', () => {
    const [spy, hook] = getHook();

    expect(spy).toHaveBeenCalledTimes(1);
    act(() => hook.result.current[0]([4, 2]));
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("should NOT call validator on it's change", () => {
    const [spy, hook] = getHook();
    const newValidator: MultiStateValidator<any, number[]> = jest.fn((states) => [
      states!.every((num) => !!(num % 2)),
    ]);

    expect(spy).toHaveBeenCalledTimes(1);
    hook.rerender({ validator: newValidator });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should throw if states is not an object', () => {
    expect(() => {
      // @ts-ignore
      const [, hook] = getHook(defaultStatesValidator, 123);

      if (hook.result.error) {
        throw hook.result.error;
      }
    }).toThrowError('states expected to be an object or array, got number');
  });

  it('first returned element should represent current validity state', () => {
    const [, hook] = getHook();
    let [setState, [validity]] = hook.result.current;
    expect(validity).toEqual([false]);

    act(() => setState([4, 2]));
    [setState, [validity]] = hook.result.current;
    expect(validity).toEqual([true]);

    act(() => setState([4, 5]));
    [setState, [validity]] = hook.result.current;
    expect(validity).toEqual([false]);
  });

  it('second returned element should re-call validation', () => {
    const [spy, hook] = getHook();
    const [, [, revalidate]] = hook.result.current;

    expect(spy).toHaveBeenCalledTimes(1);
    act(() => revalidate());
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('validator should receive states as a firs argument', () => {
    const [spy, hook] = getHook();
    const [setState] = hook.result.current;

    expect((spy as Mock).mock.calls[0].length).toBe(1);
    expect((spy as Mock).mock.calls[0][0]).toEqual([1, 2]);
    act(() => setState([4, 6]));
    expect((spy as Mock).mock.calls[1][0]).toEqual([4, 6]);
  });

  it('if validator expects 2nd parameters it should pass a validity setter there', () => {
    const spy = (jest.fn((states: number[], done) => {
      done([states.every((num) => !!(num % 2))]);
    }) as unknown) as MultiStateValidator<[boolean], number[]>;
    const [, hook] = getHook(spy, [1, 3]);
    const [, [validity]] = hook.result.current;

    expect((spy as Mock).mock.calls[0].length).toBe(2);
    expect((spy as Mock).mock.calls[0][0]).toEqual([1, 3]);
    expect(validity).toEqual([true]);
  });
});
