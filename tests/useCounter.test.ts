import { act, renderHook } from '@testing-library/react-hooks';
import useCounter from '../src/useCounter';

const setUp = (initialValue?: number, max: number | null = null, min: number | null = null) =>
  renderHook(() => useCounter(initialValue, max, min));

it('should init counter and utils', () => {
  const { result } = setUp(5);

  expect(result.current[0]).toBe(5);
  expect(result.current[1]).toStrictEqual({
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

it('should not exceed max value', () => {
  const { result } = setUp(10, 5);
  expect(result.current[0]).toBe(5);

  const { get, inc, reset } = result.current[1];

  act(() => reset(10));
  expect(get()).toBe(5);

  act(() => reset(4));
  expect(get()).toBe(4);

  act(() => inc());
  expect(get()).toBe(5);

  act(() => inc());
  expect(get()).toBe(5);
});

it('should not exceed min value', () => {
  const { result } = setUp(3, null, 5);
  expect(result.current[0]).toBe(5);

  const { get, dec, reset } = result.current[1];

  act(() => reset(4));
  expect(get()).toBe(5);

  act(() => reset(6));
  expect(get()).toBe(6);

  act(() => dec());
  expect(get()).toBe(5);

  act(() => dec());
  expect(get()).toBe(5);
});

describe('should `console.error` on unexpected inputs', () => {
  it('on any of call parameters', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // @ts-ignore
    setUp(false);
    expect(spy.mock.calls[0][0]).toBe('initialValue has to be a number, got boolean');

    // @ts-ignore
    setUp(10, false);
    expect(spy.mock.calls[1][0]).toBe('max has to be a number, got boolean');

    // @ts-ignore
    setUp(10, 5, {});
    expect(spy.mock.calls[2][0]).toBe('min has to be a number, got object');

    spy.mockRestore();
  });

  it('on any of returned methods has unexpected input', () => {
    const { result } = setUp(10);
    const { inc, dec, reset } = result.current[1];

    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // @ts-ignore
    act(() => inc(false));
    expect(spy.mock.calls[0][0]).toBe(
      'delta has to be a number or function returning a number, got boolean'
    );

    // @ts-ignore
    act(() => dec(false));
    expect(spy.mock.calls[1][0]).toBe(
      'delta has to be a number or function returning a number, got boolean'
    );

    // @ts-ignore
    act(() => reset({}));
    expect(spy.mock.calls[2][0]).toBe(
      'value has to be a number or function returning a number, got object'
    );

    spy.mockRestore();
  });
});
