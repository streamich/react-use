import { act, renderHook } from '@testing-library/react-hooks';
import useGetSet from '../src/useGetSet';

const setUp = (initialValue: any) => renderHook(() => useGetSet(initialValue));

beforeEach(() => {
  jest.useFakeTimers();
});

it('should init getter and setter', () => {
  const { result } = setUp('foo');
  const [get, set] = result.current;

  expect(get).toBeInstanceOf(Function);
  expect(set).toBeInstanceOf(Function);
});

it('should get current value', () => {
  const { result } = setUp('foo');
  const [get] = result.current;

  const currentValue = get();

  expect(currentValue).toBe('foo');
});

it('should set new value', () => {
  const { result } = setUp('foo');
  const [get, set] = result.current;

  act(() => set('bar'));

  const currentValue = get();
  expect(currentValue).toBe('bar');
});

/**
 * This test implements the special demo in storybook that increments a number
 * after 1 second on each click.
 */
it('should get and set expected values when used in nested functions', () => {
  const onClick = jest.fn(() => {
    setTimeout(() => {
      set(get() + 1);
    }, 1000);
  });

  const { result } = setUp(0);
  const [get, set] = result.current;

  // simulate 3 clicks
  onClick();
  onClick();
  onClick();

  // fast-forward until all timers have been executed
  act(() => {
    jest.runAllTimers();
  });

  const currentValue = get();
  expect(currentValue).toBe(3);
  expect(onClick).toHaveBeenCalledTimes(3);
});
