import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { useValidatableState } from '../index';
import { UseValidatableStateReturn, Validator } from '../useValidatableState';

interface Mock extends jest.Mock {}

describe('useValidatableState', () => {
  it('should be defined', () => {
    expect(useValidatableState).toBeDefined();
  });

  function getHook(
    fn: Validator = jest.fn(() => {}),
    initialState: any = null
  ): [Mock | Function, RenderHookResult<{ validator: Validator; init: any }, UseValidatableStateReturn>] {
    return [
      fn,
      renderHook(({ validator, init }) => useValidatableState(validator as Function, init), {
        initialProps: {
          validator: fn,
          init: initialState,
        },
      }),
    ];
  }

  it('should return an array of four elements', () => {
    const [, hook] = getHook();

    expect(Array.isArray(hook.result.current)).toBe(true);
    expect(hook.result.current.length).toBe(4);
  });

  it('first two elements should act like regular setState', () => {
    const [, hook] = getHook(jest.fn(), 3);
    const [, setState] = hook.result.current;

    expect(hook.result.current[0]).toBe(3);
    act(() => setState(4));
    expect(hook.result.current[0]).toBe(4);
    act(() => setState(prevState => prevState + 1));
    expect(hook.result.current[0]).toBe(5);
  });

  it('validator have to be called on init plus on each state update', () => {
    const [spy, hook] = getHook(jest.fn(), 3);
    const [, setState] = hook.result.current;

    expect(spy).toHaveBeenCalledTimes(1);
    act(() => setState(4));
    expect(spy).toHaveBeenCalledTimes(2);
    act(() => setState(prevState => prevState + 1));
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('third element of returned array should represent validity state', () => {
    const [, hook] = getHook(jest.fn(state => [state % 2 === 0]), 3);
    let [, setState, [isValid]] = hook.result.current;

    expect(isValid).toBe(false);
    act(() => setState(prevState => prevState + 1));

    [, setState, [isValid]] = hook.result.current;
    expect(isValid).toBe(true);
    act(() => setState(5));

    [, setState, [isValid]] = hook.result.current;
    expect(isValid).toBe(false);
  });

  it('should recalculate validity on validator change', () => {
    const [, hook] = getHook(jest.fn(state => [state % 2 === 0]), 3);
    let [, setState, [isValid]] = hook.result.current;

    expect(isValid).toBe(false);

    hook.rerender({ validator: jest.fn(state => [state % 2 === 1]), init: 3 });

    [, setState, [isValid]] = hook.result.current;
    expect(isValid).toBe(true);
    act(() => setState(prevState => prevState + 1));

    [, setState, [isValid]] = hook.result.current;
    expect(isValid).toBe(false);
  });

  it('forth element of returned array should re-call validation', () => {
    const [spy, hook] = getHook(jest.fn(), 3);
    const [, , , validate] = hook.result.current;

    expect(spy).toHaveBeenCalledTimes(1);
    act(() => validate());
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should pass to validator two parameters: first - current state, second - previous state', () => {
    const [spy, hook] = getHook(jest.fn(), 3);
    const [, setState] = hook.result.current;

    act(() => setState(4));
    act(() => setState(prevState => prevState + 1));
    expect((spy as Mock).mock.calls[0][0]).toBe(3);
    expect((spy as Mock).mock.calls[0][1]).toBe(null);
    expect((spy as Mock).mock.calls[1][0]).toBe(4);
    expect((spy as Mock).mock.calls[1][1]).toBe(3);
    expect((spy as Mock).mock.calls[2][0]).toBe(5);
    expect((spy as Mock).mock.calls[2][1]).toBe(4);
  });

  it('if validator expects 3 parameters it should pass a validity setter there', () => {
    const [spy, hook] = getHook(jest.fn((state, _prevState, setValidity) => setValidity!([state % 2 === 0])), 3);
    let [, setState, [isValid]] = hook.result.current;

    expect(typeof (spy as Mock).mock.calls[0][2]).toBe('function');

    expect(isValid).toBe(false);
    act(() => setState(prevState => prevState + 1));

    [, setState, [isValid]] = hook.result.current;
    expect(isValid).toBe(true);
    act(() => setState(5));

    [, setState, [isValid]] = hook.result.current;
    expect(isValid).toBe(false);
  });
});
