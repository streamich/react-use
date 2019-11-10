import { act, renderHook } from '@testing-library/react-hooks';
import useGetSetState from '../src/useGetSetState';

const originalConsoleError = console.error;
const mockConsoleError = jest.fn();

const setUp = (initialState: any) => renderHook(() => useGetSetState(initialState));

beforeAll(() => {
  console.error = mockConsoleError;
});

afterAll(() => {
  console.error = originalConsoleError;
});

beforeEach(() => {
  jest.useFakeTimers();
});

it('should init getter and setter', () => {
  const { result } = setUp({ foo: 'initialValue' });
  const [get, set] = result.current;

  expect(get).toBeInstanceOf(Function);
  expect(set).toBeInstanceOf(Function);
});

it('should log an error if init with something different than an object', () => {
  expect(mockConsoleError).not.toHaveBeenCalled();

  setUp('not an object');

  expect(mockConsoleError).toHaveBeenCalledTimes(1);
  expect(mockConsoleError).toHaveBeenCalledWith('useGetSetState initial state must be an object.');
});

it('should get current state', () => {
  const { result } = setUp({ foo: 'a', bar: 'z' });
  const [get] = result.current;

  const currentState = get();

  expect(currentState).toEqual({ foo: 'a', bar: 'z' });
});

it('should set new state by applying patch with existing keys', () => {
  const { result } = setUp({ foo: 'a', bar: 'z' });
  const [get, set] = result.current;

  act(() => set({ bar: 'y' }));

  const currentState = get();
  expect(currentState).toEqual({ foo: 'a', bar: 'y' });
});

it('should set new state by applying patch with new keys', () => {
  const { result } = setUp({ foo: 'a', bar: 'z' });
  const [get, set] = result.current;

  act(() => set({ qux: 'f' }));

  const currentState = get();
  expect(currentState).toEqual({ foo: 'a', bar: 'z', qux: 'f' });
});

it('should set new state by applying patch with both new and old keys', () => {
  const { result } = setUp({ foo: 'a', bar: 'z' });
  const [get, set] = result.current;

  act(() => set({ bar: 'y', qux: 'f' }));

  const currentState = get();
  expect(currentState).toEqual({ foo: 'a', bar: 'y', qux: 'f' });
});

it('should NOT set new state if empty patch received', () => {
  const { result } = setUp({ foo: 'a', bar: 'z' });
  const [get, set] = result.current;

  act(() => set({}));

  const currentState = get();
  expect(currentState).toEqual({ foo: 'a', bar: 'z' });
});

it('should NOT set new state if no patch received', () => {
  const { result } = setUp({ foo: 'a', bar: 'z' });
  const [get, set] = result.current;

  // @ts-ignore
  act(() => set());

  const currentState = get();
  expect(currentState).toEqual({ foo: 'a', bar: 'z' });
});

it('should log an error if set with a patch different than an object', () => {
  const { result } = setUp({ foo: 'a', bar: 'z' });
  const [, set] = result.current;
  expect(mockConsoleError).not.toHaveBeenCalled();

  act(() => set('not an object' as any));

  expect(mockConsoleError).toHaveBeenCalledTimes(1);
  expect(mockConsoleError).toHaveBeenCalledWith('useGetSetState setter patch must be an object.');
});

/**
 * This test is equivalent to demo one for `useGetSet` hook.
 */
it('should get and set expected state when used in nested functions', () => {
  const onClick = jest.fn(() => {
    setTimeout(() => {
      set({ counter: get().counter + 1 });
    }, 1000);
  });

  const { result } = setUp({ counter: 0 });
  const [get, set] = result.current;

  // simulate 3 clicks
  onClick();
  onClick();
  onClick();

  // fast-forward until all timers have been executed
  act(() => {
    jest.runAllTimers();
  });

  const currentState = get();
  expect(currentState).toEqual({ counter: 3 });
  expect(onClick).toHaveBeenCalledTimes(3);
});
