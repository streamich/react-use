import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { useRef } from 'react';
import { UseStateHistoryReturn, useStateWithHistory } from '../src/useStateWithHistory';
import { InitialHookState } from '../src/util/resolveHookState';

describe('useStateWithHistory', () => {
  it('should be defined', () => {
    expect(useStateWithHistory).toBeDefined();
  });

  function getHook<S>(
    initialState?: InitialHookState<S>,
    initialHistory?: S[],
    initialCapacity?: number
  ): RenderHookResult<{ state?: S; history?: S[]; capacity?: number }, [UseStateHistoryReturn<S | undefined>, number]> {
    return renderHook(
      ({ state, history, capacity }) => {
        const renders = useRef(0);
        renders.current++;
        return [useStateWithHistory(state, history, capacity), renders.current];
      },
      {
        initialProps: {
          state: initialState,
          history: initialHistory,
          capacity: initialCapacity,
        } as { state?: S; history?: S[]; capacity?: number },
      }
    );
  }

  it('should return state, state setter and history structure', () => {
    const res = getHook(0).result.current[0];

    expect(res).toStrictEqual([expect.any(Number), expect.any(Function), expect.any(Object)]);
    expect(res[2]).toStrictEqual({
      history: expect.any(Array),
      position: expect.any(Number),
      capacity: expect.any(Number),
      back: expect.any(Function),
      forward: expect.any(Function),
      go: expect.any(Function),
    });
  });

  it('should act like regular setState', () => {
    const hook = getHook(() => 1);

    expect(hook.result.current[0][0]).toBe(1);
    act(() => {
      hook.result.current[0][1](321);
    });
    expect(hook.result.current[0][0]).toBe(321);
    act(() => {
      hook.result.current[0][1](() => 111);
    });
    expect(hook.result.current[0][0]).toBe(111);
  });

  it('should receive initial history and not push initial state there', () => {
    const hook = getHook(1, [1, 2, 3]);
    expect(hook.result.current[0][2].history).toEqual([1, 2, 3]);
  });

  it('should push initial state to the history if initialHistory is omitted', () => {
    const hook = getHook(321, undefined);
    expect(hook.result.current[0][2].history).toEqual([321]);
  });

  describe('capacity', () => {
    it('should crop the initial history from the beginning if it exceeds capacity', () => {
      const hook = getHook(1, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5);
      expect(hook.result.current[0][2].history).toEqual([6, 7, 8, 9, 10]);
    });

    it('should crop the history if capacity value has changed', () => {
      const hook = getHook(1, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 20);
      expect(hook.result.current[0][2].history).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      hook.rerender({ capacity: 5 });
      expect(hook.result.current[0][2].history).toEqual([6, 7, 8, 9, 10]);
    });
  });
});
