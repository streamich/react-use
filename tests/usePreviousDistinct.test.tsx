import { renderHook } from '@testing-library/react-hooks';
import usePreviousDistinct, { Predicate } from '../src/usePreviousDistinct';

describe('usePreviousDistinct', () => {
  it('should be defined', () => {
    expect(usePreviousDistinct).toBeDefined();
  });

  function getHook<T>(initialValue?: T, predicate?: Predicate<T>) {
    return renderHook(({ val, cmp }) => usePreviousDistinct<T>(val as T, cmp), {
      initialProps: {
        val: initialValue || 0,
        cmp: predicate,
      } as { val?: T; cmp?: Predicate<T> },
    });
  }

  it('should return undefined on init', () => {
    expect(getHook().result.current).toBeUndefined();
  });

  it('should not invoke predicate on first render', () => {
    const spy = jest.fn();
    getHook(0, spy);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should update previous value only after render with different value', () => {
    const hook = getHook();

    expect(hook.result.current).toBeUndefined();

    hook.rerender({ val: 0 });
    expect(hook.result.current).toBeUndefined();

    hook.rerender({ val: 1 });
    expect(hook.result.current).toBe(0);

    hook.rerender({ val: 2 });
    expect(hook.result.current).toBe(1);

    hook.rerender({ val: 2 });
    expect(hook.result.current).toBe(1);

    hook.rerender({ val: 3 });
    expect(hook.result.current).toBe(2);
  });

  it('should work fine with `undefined` values', () => {
    const hook = renderHook(({ value }) => usePreviousDistinct(value), {
      initialProps: { value: undefined as undefined | number },
    });

    expect(hook.result.current).toBeUndefined();

    hook.rerender({ value: 1 });
    expect(hook.result.current).toBeUndefined();

    hook.rerender({ value: undefined });
    expect(hook.result.current).toBe(1);

    hook.rerender({ value: 2 });
    expect(hook.result.current).toBeUndefined();
  });

  it('should receive a predicate as a second parameter that will compare prev and current', () => {
    const obj1 = { label: 'John', value: 'john' };
    const obj2 = { label: 'Jonny', value: 'john' };
    const obj3 = { label: 'Kate', value: 'kate' };
    const predicate = (a, b) => !!a && a.value === b.value;

    const hook = getHook(obj1 as { label: string; value: string }, predicate);

    expect(hook.result.current).toBeUndefined();

    hook.rerender({ val: obj2, cmp: predicate });

    expect(hook.result.current).toBeUndefined();

    hook.rerender({ val: obj3, cmp: predicate });

    expect(hook.result.current).toBe(obj1);
  });
});
