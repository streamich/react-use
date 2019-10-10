import { renderHook } from '@testing-library/react-hooks';
import { useLogger } from '..';

console.log = jest.fn();

it('displays log', () => {
  const props = { test: '' };
  const state = { test1: '' };
  const { rerender } = renderHook(() => useLogger('Test', props, state));

  expect(console.log).toHaveBeenCalledTimes(1);
  expect(console.log).toHaveBeenCalledWith('Test mounted', { test: '' }, { test1: '' });

  props.test = 'test';
  state.test1 = 'test1';
  rerender();
  expect(console.log).toHaveBeenCalledTimes(2);
  expect(console.log).toHaveBeenCalledWith('Test updated', { test: 'test' }, { test1: 'test1' });
});
