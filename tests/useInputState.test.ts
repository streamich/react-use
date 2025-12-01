import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';
import { useInputState } from '../src';

it('should successfully assign the state with event.target.value', () => {
  const { result } = renderHook(() => useInputState(''));
  const fetchState = () => result.current[0];
  const setState = result.current[1];

  const mockEvent = { target: { value: 'input value' } };

  act(() => {
    setState(mockEvent);
  });

  expect(fetchState()).toEqual(mockEvent.target.value);
});
