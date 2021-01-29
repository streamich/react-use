import { act, renderHook } from '@testing-library/react-hooks';
import { useLocalSyncedState } from '../src/useLocalSyncedState';

describe('useLocalSyncedState', () => {
  it('should be defined', () => {
    expect(useLocalSyncedState).toBeDefined();
  });

  it('should update its own value', () => {
    const STARTING_VALUE = 0;
    const NEXT_VALUE = 100;
    const { result } = renderHook(() => useLocalSyncedState('test', STARTING_VALUE));
    expect(result.current[0]).toBe(STARTING_VALUE);
    act(() => result.current[1](NEXT_VALUE));
    expect(result.current[0]).toBe(NEXT_VALUE);
  });

  it('should update all hooks with same identifier', () => {
    const STARTING_VALUE = 0;
    const NEXT_VALUE = 100;
    const firstHook = renderHook(() => useLocalSyncedState('test', STARTING_VALUE));
    const secondHook = renderHook(() => useLocalSyncedState('test', STARTING_VALUE));
    expect(firstHook.result.current[0]).toBe(STARTING_VALUE);
    expect(secondHook.result.current[0]).toBe(STARTING_VALUE);
    act(() => firstHook.result.current[1](NEXT_VALUE));
    expect(firstHook.result.current[0]).toBe(NEXT_VALUE);
    expect(secondHook.result.current[0]).toBe(NEXT_VALUE);
  });

  it('should only update hooks with same identifier', () => {
    const STARTING_VALUE = 0;
    const NEXT_VALUE = 100;
    const firstHook = renderHook(() => useLocalSyncedState('test', STARTING_VALUE));
    const secondHook = renderHook(() => useLocalSyncedState('test2', STARTING_VALUE));
    expect(firstHook.result.current[0]).toBe(STARTING_VALUE);
    expect(secondHook.result.current[0]).toBe(STARTING_VALUE);
    act(() => firstHook.result.current[1](NEXT_VALUE));
    expect(firstHook.result.current[0]).toBe(NEXT_VALUE);
    expect(secondHook.result.current[0]).toBe(STARTING_VALUE);
  });

  it('should only update receiver hooks with same identifier', () => {
    const STARTING_VALUE = 0;
    const NEXT_VALUE = 100;
    const firstHook = renderHook(() => useLocalSyncedState('test', STARTING_VALUE));
    const secondHook = renderHook(() => useLocalSyncedState('test', STARTING_VALUE, 'sender'));
    expect(firstHook.result.current[0]).toBe(STARTING_VALUE);
    expect(secondHook.result.current[0]).toBe(STARTING_VALUE);
    act(() => firstHook.result.current[1](NEXT_VALUE));
    expect(firstHook.result.current[0]).toBe(NEXT_VALUE);
    expect(secondHook.result.current[0]).toBe(STARTING_VALUE);
  });

  it('should only update hooks if first updated hook is sender', () => {
    const STARTING_VALUE = 0;
    const NEXT_VALUE = 100;
    const firstHook = renderHook(() => useLocalSyncedState('test', STARTING_VALUE, 'receiver'));
    const secondHook = renderHook(() => useLocalSyncedState('test', STARTING_VALUE));
    expect(firstHook.result.current[0]).toBe(STARTING_VALUE);
    expect(secondHook.result.current[0]).toBe(STARTING_VALUE);
    act(() => firstHook.result.current[1](NEXT_VALUE));
    expect(firstHook.result.current[0]).toBe(NEXT_VALUE);
    expect(secondHook.result.current[0]).toBe(STARTING_VALUE);
  });
});
