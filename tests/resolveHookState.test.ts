import { resolveHookState } from '../src/util/resolveHookState';

describe('resolveHookState', () => {
  it('should defined', () => {
    expect(resolveHookState).toBeDefined();
  });

  it(`should return value as is if it's not a function`, () => {
    expect(resolveHookState(1)).toBe(1);
    expect(resolveHookState('HI!')).toBe('HI!');
    expect(resolveHookState(undefined)).toBe(undefined);
  });

  it('should call passed function', () => {
    const spy = jest.fn();
    resolveHookState(spy);
    expect(spy).toHaveBeenCalled();
  });

  it('should pass 2nd parameter to function', () => {
    const spy = jest.fn();
    resolveHookState(spy, 123);
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0]).toBe(123);
  });
});
