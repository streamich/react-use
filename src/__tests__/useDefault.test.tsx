import { act, cleanup, renderHook } from 'react-hooks-testing-library';
import useDefault from '../useDefault';

afterEach(cleanup);

describe('useDefault', () => {
  test('should be defined', () => {
    expect(useDefault).toBeDefined();
  });

  const hook = renderHook(() => useDefault({ name: 'Marshall' }, { name: '' }));

  test('should return initial state on initial render', () => {
    expect(hook.result.current[0].name).toBe('');
  });

  test('should update state with correct value', () => {
    hook.rerender();
    act(() => {
      hook.result.current[1]({ name: 'Mathers' });
    });

    expect(hook.result.current[0].name).toBe('Mathers');
  });

  test('should return the default value when updated state is nil', () => {
    hook.rerender();
    act(() => {
      hook.result.current[1](null);
    });

    expect(hook.result.current[0].name).toBe('Marshall');

    act(() => {
      hook.result.current[1](undefined);
    });

    expect(hook.result.current[0].name).toBe('Marshall');
  });
});
