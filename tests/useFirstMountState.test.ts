import { renderHook } from '@testing-library/react-hooks';
import { useFirstMountState } from '../src';

describe('useFirstMountState', () => {
  it('should be defined', () => {
    expect(useFirstMountState).toBeDefined();
  });

  it('should return boolean', () => {
    expect(renderHook(() => useFirstMountState()).result.current).toEqual(expect.any(Boolean));
  });

  it('should return true on first render and false on all others', () => {
    const hook = renderHook(() => useFirstMountState());

    expect(hook.result.current).toBe(true);
    hook.rerender();
    expect(hook.result.current).toBe(false);
    hook.rerender();
    expect(hook.result.current).toBe(false);
  });
});
