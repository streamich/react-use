import { act, renderHook } from '@testing-library/react-hooks';
import useCounter from '../useCounter';

describe('useCounter hook', () => {
  const setUp = (initialValue?: number) => renderHook(() => useCounter(initialValue));

  it('should init counter', () => {
    const { result } = setUp(5);

    expect(result.current[0]).toBe(5);
    expect(result.current[1]).toEqual({
      inc: expect.any(Function),
      dec: expect.any(Function),
      get: expect.any(Function),
      set: expect.any(Function),
      reset: expect.any(Function),
    });
  });

  it('should init counter to 0 if not initial value received', () => {
    const { result } = setUp();

    expect(result.current[0]).toBe(0);
  });

  it('should init counter to negative number', () => {
    const { result } = setUp(-2);

    expect(result.current[0]).toBe(-2);
  });

  it('should get current counter', () => {
    const { result } = setUp(5);
    const { get } = result.current[1];

    expect(get()).toBe(5);
  });

  it('should increment by 1 if not value received', () => {
    const { result } = setUp(5);
    const { get, inc } = result.current[1];

    act(() => inc());

    expect(result.current[0]).toBe(6);
    expect(get()).toBe(6);
  });

  it('should increment by value received', () => {
    const { result } = setUp(5);
    const { get, inc } = result.current[1];

    act(() => inc(9));

    expect(result.current[0]).toBe(14);
    expect(get()).toBe(14);
  });

  it('should decrement by 1 if not value received', () => {
    const { result } = setUp(5);
    const { get, dec } = result.current[1];

    act(() => dec());

    expect(result.current[0]).toBe(4);
    expect(get()).toBe(4);
  });

  it('should decrement by value received', () => {
    const { result } = setUp(5);
    const { get, dec } = result.current[1];

    act(() => dec(9));

    expect(result.current[0]).toBe(-4);
    expect(get()).toBe(-4);
  });

  it('should set to value received', () => {
    const { result } = setUp(5);
    const { get, set } = result.current[1];

    act(() => set(17));

    expect(result.current[0]).toBe(17);
    expect(get()).toBe(17);
  });

  it('should reset to original value', () => {
    const { result } = setUp(5);
    const { get, set, reset } = result.current[1];

    // set different value than initial one...
    act(() => set(17));
    expect(result.current[0]).toBe(17);

    // ... and reset it to initial one
    act(() => reset());
    expect(result.current[0]).toBe(5);
    expect(get()).toBe(5);
  });

  it('should reset and set new original value', () => {
    const { result } = setUp(5);
    const { get, set, reset } = result.current[1];

    // set different value than initial one...
    act(() => set(17));
    expect(result.current[0]).toBe(17);

    // ... now reset and set it to different than initial one...
    act(() => reset(8));
    expect(result.current[0]).toBe(8);

    // ... and set different value than initial one again...
    act(() => set(32));
    expect(result.current[0]).toBe(32);

    // ... and reset it to new initial value
    act(() => reset());
    expect(result.current[0]).toBe(8);
    expect(get()).toBe(8);
  });

  it.todo('should throw an error if initial value is other than a number');
  it.todo('should throw an error if increment value is other than a number');
  it.todo('should throw an error if increment value is a negative number');
  it.todo('should throw an error if decrement value is other than a number');
  it.todo('should throw an error if decrement value is a negative number');
});
