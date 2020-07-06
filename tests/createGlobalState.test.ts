import { act, renderHook } from '@testing-library/react-hooks';
import createGlobalState from '../src/createGlobalState';

describe('useGlobalState', () => {
  it('should be defined', () => {
    expect(createGlobalState).toBeDefined();
  });

  it('both components should be updated directly', () => {
    const useGlobalValue = createGlobalState(0);
    const { result: result1 } = renderHook(() => useGlobalValue());
    const { result: result2 } = renderHook(() => useGlobalValue());
    let [ state1, setState1 ] = result1.current;
    let [ state2 ] = result2.current;
    expect(state1).toBe(0);
    expect(state2).toBe(0);
    act(() => {
      setState1(1);
    });
    [ state1, setState1 ] = result1.current;
    [ state2 ] = result2.current;
    expect(state1).toBe(1);
    expect(state2).toBe(1);
  });

  it('both components should be updated via update function', () => {
    const useGlobalValue = createGlobalState(0);
    const { result: result1 } = renderHook(() => useGlobalValue());
    const { result: result2 } = renderHook(() => useGlobalValue());
    let [ state1, setState1 ] = result1.current;
    let [ state2 ] = result2.current;
    expect(state1).toBe(0);
    expect(state2).toBe(0);
    act(() => setState1(x => x + 1));
    [ state1, setState1 ] = result1.current;
    [ state2 ] = result2.current;
    expect(state1).toBe(1);
    expect(state2).toBe(1);
  });

  it('passing initialState value should override defaultState on first use', () => {
    const useGlobalValue = createGlobalState(0);
    const { result } = renderHook(() => useGlobalValue(1));
    let [ state ] = result.current;
    expect(state).toBe(1);
  })

  it('passing initialState function should override defaultState on first use', () => {
    const useGlobalValue = createGlobalState(0);
    const { result } = renderHook(() => useGlobalValue(() => 1));
    let [ state ] = result.current;
    expect(state).toBe(1);
  })

  it('passing initialState should be ignored after first use', () => {
    const useGlobalValue = createGlobalState(1);
    const { result: result1 } = renderHook(() => useGlobalValue(2));
    const { result: result2 } = renderHook(() => useGlobalValue(3));
    let [ state1 ] = result1.current;
    let [ state2 ] = result2.current;
    expect(state1).toBe(2);
    expect(state2).toBe(2);
  })

  it('an unpassed initialState should not clobber defaultState', () => {
    const useGlobalValue = createGlobalState(1);
    const { result } = renderHook(() => useGlobalValue());
    let [ state ] = result.current;
    expect(state).toBe(1)
  })
});
