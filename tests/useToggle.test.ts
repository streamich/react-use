import { act, renderHook } from '@testing-library/react-hooks';
import useToggle from '../src/useToggle';

const setUp = (initialValue: boolean) => renderHook(() => useToggle(initialValue));

it('should init state to true', () => {
  const { result } = setUp(true);

  expect(result.current[0]).toBe(true);
  expect(typeof result.current[1]).toBe('function');
});

it('should init state to false', () => {
  const { result } = setUp(false);

  expect(result.current[0]).toBe(false);
  expect(result.current[1]).toBeInstanceOf(Function);
});

it('should set state to true', () => {
  const { result } = setUp(false);
  const [, toggle] = result.current;

  expect(result.current[0]).toBe(false);

  act(() => {
    toggle(true);
  });

  expect(result.current[0]).toBe(true);
});

it('should set state to false', () => {
  const { result } = setUp(true);
  const [, toggle] = result.current;

  expect(result.current[0]).toBe(true);

  act(() => {
    toggle(false);
  });

  expect(result.current[0]).toBe(false);
});

it('should toggle state from true', () => {
  const { result } = setUp(true);
  const [, toggle] = result.current;

  act(() => {
    toggle();
  });

  expect(result.current[0]).toBe(false);
});

it('should toggle state from false', () => {
  const { result } = setUp(false);
  const [, toggle] = result.current;

  act(() => {
    toggle();
  });

  expect(result.current[0]).toBe(true);
});

it('should ignore non-boolean parameters and toggle state', () => {
  const { result } = setUp(true);
  const [, toggle] = result.current;

  act(() => {
    toggle('string');
  });

  expect(result.current[0]).toBe(false);

  act(() => {
    toggle({});
  });

  expect(result.current[0]).toBe(true);
});
