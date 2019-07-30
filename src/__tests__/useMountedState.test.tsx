import { renderHook } from 'react-hooks-testing-library';
import useMountedState from '../useMountedState';

describe('useMountedState', () => {
  it('should be defined', () => {
    expect(useMountedState).toBeDefined();
  });

  it('should return a function', () => {
    const hook = renderHook(() => useMountedState(), { initialProps: false });

    expect(typeof hook.result.current).toEqual('function');
  });

  it('should return true if component is mounted', () => {
    const hook = renderHook(() => useMountedState(), { initialProps: false });

    expect(hook.result.current()).toBeTruthy();
  });

  it('should return false if component is unmounted', () => {
    const hook = renderHook(() => useMountedState(), { initialProps: false });

    hook.unmount();

    expect(hook.result.current()).toBeFalsy();
  });
});
