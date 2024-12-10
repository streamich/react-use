import { act, renderHook } from '@testing-library/react-hooks';
import useResetState from '../src/useResetState';

describe('useResetState', () => {
  const setUp = <S>(initialState: S) =>
    renderHook(() => {
      const [state, setState, resetState] = useResetState<S>(initialState);

      return {
        state,
        setState,
        resetState,
      } as const;
    });

  it('should support initialValue', () => {
    const hook = setUp({ foo: 'bar' });
    expect(hook.result.current.state).toEqual({ foo: 'bar' });
  });

  it('should reset state', () => {
    const hook = setUp({
      foo: 'bar',
      count: 0,
    });

    act(() => {
      hook.result.current.setState({
        foo: 'foo',
        count: 1,
      });
    });

    act(() => {
      hook.result.current.resetState();
    });

    expect(hook.result.current.state).toEqual({ foo: 'bar', count: 0 });
  });

  it('should support function update', () => {
    const hook = setUp({
      count: 0,
    });

    act(() => {
      hook.result.current.setState((prev) => ({ count: prev.count + 1 }));
    });

    expect(hook.result.current.state).toEqual({ count: 1 });

    act(() => {
      hook.result.current.resetState();
    });

    expect(hook.result.current.state).toEqual({ count: 0 });
  });

  it('should reset state asynchronously', async () => {
    const hook = setUp({
      foo: 'bar',
      count: 1,
    });

    await act(async () => {
      hook.result.current.setState({
        foo: 'foo',
        count: 2,
      });
    });

    await act(async () => {
      await hook.result.current.resetState();
    });

    expect(hook.result.current.state).toEqual({ foo: 'bar', count: 1 });
  });

  it('should return undefined when resetState is called', () => {
    const hook = setUp({
      foo: 'bar',
    });

    const returnValue = hook.result.current.resetState();

    expect(returnValue).toBeUndefined();
  });

  it('should correctly update state', () => {
    const hook = setUp({
      count: 0,
    });

    act(() => {
      hook.result.current.setState({
        count: 5,
      });
    });

    expect(hook.result.current.state).toEqual({ count: 5 });
  });
});
