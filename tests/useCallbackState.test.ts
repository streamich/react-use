import { act, renderHook } from '@testing-library/react-hooks';
import useCallbackState from '../src/useCallbackState';

const setUp = (initialState?: number) => renderHook(() => useCallbackState(initialState));

it('should init state and setter', () => {
  const { result } = setUp(0);
  const [state, setState] = result.current;

  expect(state).toEqual(0);
  expect(setState).toBeInstanceOf(Function);
});

it('should act as regular React.useState', () => {
  const { result } = setUp(0);
  const [, setState] = result.current;

  act(() => {
    setState(1);
  })

  expect(result.current[0]).toEqual(1);
});

it('should update state and pass new value to callback when providing new state value', () => {
  const { result } = setUp(0);
  const [, setState] = result.current;

  act(() => {
    setState(1, (count) => {
      expect(count).toEqual(1);
    });
  });
});
