import { act, renderHook } from '@testing-library/react-hooks';
import { useInput } from '../src';

describe('useInput', () => {
  it('should init with initValue', () => {
    const hook = renderHook(() => useInput(0));
    const [value] = hook.result.current;

    expect(value).toBe(0);
  });

  it('should change value on call setValue', () => {
    const hook = renderHook(() => useInput(0));
    const [, , setValue] = hook.result.current;
    act(() => {
      setValue(10);
    });

    expect(hook.result.current[0]).toBe(10);
  });
});
