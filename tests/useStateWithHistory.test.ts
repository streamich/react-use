import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { useRef } from 'react';
import { UseStateHistoryReturn, useStateWithHistory } from '../src/useStateWithHistory';
import { IHookStateSetAction } from '../src/misc/hookState';

describe('useStateWithHistory', () => {
  it('should be defined', () => {
    expect(useStateWithHistory).toBeDefined();
  });

  function getHook<S, I extends S>(
    initialState?: IHookStateSetAction<S>,
    initialCapacity?: number,
    initialHistory?: I[]
  ): RenderHookResult<
    { state?: S; history?: I[]; capacity?: number },
    [UseStateHistoryReturn<S | undefined>, number]
  > {
    return renderHook(
      ({ state, history, capacity }) => {
        const renders = useRef(0);
        renders.current++;
        return [useStateWithHistory(state, capacity, history), renders.current];
      },
      {
        initialProps: {
          state: initialState,
          history: initialHistory,
          capacity: initialCapacity,
        } as { state?: S; history?: I[]; capacity?: number },
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
      hook.result.current[0][1]((current) => (current ?? 0) + 111);
    });
    expect(hook.result.current[0][0]).toBe(432);
  });

  it('should receive initial history', () => {
    const hook = getHook(3, undefined, [1, 2, 3]);
    expect(hook.result.current[0][2].history).toEqual([1, 2, 3]);
  });

  it('should push initial state to initial history if last element not equals it', () => {
    const hook = getHook(1, undefined, [1, 2, 3]);
    expect(hook.result.current[0][2].history).toEqual([1, 2, 3, 1]);
  });

  it('should crop initial history in case it exceeds capacity', () => {
    const hook = getHook(10, 5, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(hook.result.current[0][2].history).toEqual([6, 7, 8, 9, 10]);
  });

  it('should apply capacity change only with next state set', () => {
    const hook = getHook(5, 5, [1, 2, 3, 4, 5]);
    expect(hook.result.current[0][2].capacity).toBe(5);
    expect(hook.result.current[0][2].history).toEqual([1, 2, 3, 4, 5]);

    hook.rerender({ state: 5, capacity: 4, history: [1, 2, 3, 4, 5] });

    expect(hook.result.current[0][2].capacity).toBe(5);
    expect(hook.result.current[0][2].history).toEqual([1, 2, 3, 4, 5]);

    act(() => {
      hook.result.current[0][1](() => 111);
    });

    expect(hook.result.current[0][0]).toBe(111);
    expect(hook.result.current[0][2].capacity).toBe(4);
    expect(hook.result.current[0][2].history).toEqual([3, 4, 5, 111]);

    hook.rerender({ state: 5, capacity: 3, history: [1, 2, 3, 4, 5] });
    expect(hook.result.current[0][2].capacity).toBe(4);
    expect(hook.result.current[0][2].history).toEqual([3, 4, 5, 111]);

    act(() => {
      hook.result.current[0][1](() => 321);
    });

    expect(hook.result.current[0][0]).toBe(321);
    expect(hook.result.current[0][2].capacity).toBe(3);
    expect(hook.result.current[0][2].history).toEqual([5, 111, 321]);
  });

  describe('history.back()', () => {
    it('should cause rerender', () => {
      const hook = getHook(5, 5, [1, 2, 3, 4, 5]);

      expect(hook.result.current[1]).toBe(1);
      act(() => {
        hook.result.current[0][2].back(1);
      });
      expect(hook.result.current[1]).toBe(2);
    });

    it('should travel history back one step at a time if called without arguments', () => {
      const hook = getHook(5, 5, [1, 2, 3, 4, 5]);

      expect(hook.result.current[0][0]).toBe(5);

      act(() => {
        hook.result.current[0][2].back();
      });
      expect(hook.result.current[0][0]).toBe(4);
      act(() => {
        hook.result.current[0][2].back();
      });
      expect(hook.result.current[0][0]).toBe(3);
      act(() => {
        hook.result.current[0][2].back();
      });
      expect(hook.result.current[0][0]).toBe(2);
    });

    it('should travel history back by arbitrary amount of elements passed as 1st argument', () => {
      const hook = getHook(5, 5, [1, 2, 3, 4, 5]);

      expect(hook.result.current[0][0]).toBe(5);

      act(() => {
        hook.result.current[0][2].back(2);
      });
      expect(hook.result.current[0][0]).toBe(3);

      act(() => {
        hook.result.current[0][2].back(3);
      });
      expect(hook.result.current[0][0]).toBe(1);
    });

    it('should stop on first element if traveled to the left border', () => {
      const hook = getHook(5, 5, [1, 2, 3, 4, 5]);

      expect(hook.result.current[0][0]).toBe(5);

      act(() => {
        hook.result.current[0][2].back(6);
      });
      expect(hook.result.current[0][0]).toBe(1);

      act(() => {
        hook.result.current[0][2].back(150);
      });
      expect(hook.result.current[0][0]).toBe(1);

      act(() => {
        hook.result.current[0][2].back();
      });
      expect(hook.result.current[0][0]).toBe(1);
    });
  });

  describe('history.forward()', () => {
    it('should cause rerender', () => {
      const hook = getHook(5, 5, [1, 2, 3, 4, 5]);

      act(() => {
        hook.result.current[0][2].back(3);
      });
      expect(hook.result.current[1]).toBe(2);
      act(() => {
        hook.result.current[0][2].forward(1);
      });
      expect(hook.result.current[1]).toBe(3);
    });

    it('should travel history forward one step at a time if called without arguments', () => {
      const hook = getHook(5, 5, [1, 2, 3, 4, 5]);

      act(() => {
        hook.result.current[0][2].back(6);
      });
      expect(hook.result.current[0][0]).toBe(1);

      act(() => {
        hook.result.current[0][2].forward();
      });
      expect(hook.result.current[0][0]).toBe(2);

      act(() => {
        hook.result.current[0][2].forward();
      });
      expect(hook.result.current[0][0]).toBe(3);
    });

    it('should travel history forward by arbitrary amount of elements passed as 1st argument', () => {
      const hook = getHook(5, 5, [1, 2, 3, 4, 5]);

      act(() => {
        hook.result.current[0][2].back(6);
      });
      expect(hook.result.current[0][0]).toBe(1);

      act(() => {
        hook.result.current[0][2].forward(2);
      });
      expect(hook.result.current[0][0]).toBe(3);

      act(() => {
        hook.result.current[0][2].forward(2);
      });
      expect(hook.result.current[0][0]).toBe(5);
    });

    it('should stop on last element if traveled to the right border', () => {
      const hook = getHook(5, 5, [1, 2, 3, 4, 5]);

      act(() => {
        hook.result.current[0][2].back(6);
      });
      expect(hook.result.current[0][0]).toBe(1);

      act(() => {
        hook.result.current[0][2].forward(7);
      });
      expect(hook.result.current[0][0]).toBe(5);

      act(() => {
        hook.result.current[0][2].forward(250);
      });
      expect(hook.result.current[0][0]).toBe(5);
    });
  });

  describe('history.go()', () => {
    it('should cause rerender', () => {
      const hook = getHook(5, 5, [1, 2, 3, 4, 5]);

      expect(hook.result.current[1]).toBe(1);
      act(() => {
        hook.result.current[0][2].go(1);
      });
      expect(hook.result.current[1]).toBe(2);
    });

    it('should go to arbitrary position passed as 1st element', () => {
      const hook = getHook(5, 5, [1, 2, 3, 4, 5]);

      act(() => {
        hook.result.current[0][2].go(1);
      });
      expect(hook.result.current[0][0]).toBe(2);

      act(() => {
        hook.result.current[0][2].go(3);
      });
      expect(hook.result.current[0][0]).toBe(4);

      act(() => {
        hook.result.current[0][2].go(0);
      });
      expect(hook.result.current[0][0]).toBe(1);
    });

    it('should count from the right if position is negative', () => {
      const hook = getHook(5, 5, [1, 2, 3, 4, 5]);

      act(() => {
        hook.result.current[0][2].go(-1);
      });
      expect(hook.result.current[0][0]).toBe(5);

      act(() => {
        hook.result.current[0][2].go(-3);
      });
      expect(hook.result.current[0][0]).toBe(3);

      act(() => {
        hook.result.current[0][2].go(-5);
      });
      expect(hook.result.current[0][0]).toBe(1);
    });

    it('should properly handle too big values', () => {
      const hook = getHook(5, 5, [1, 2, 3, 4, 5]);

      act(() => {
        hook.result.current[0][2].go(-150);
      });
      expect(hook.result.current[0][0]).toBe(1);

      act(() => {
        hook.result.current[0][2].go(250);
      });
      expect(hook.result.current[0][0]).toBe(5);
    });

    it('should do nothing is position is equals current', () => {
      const hook = getHook(5, 5, [1, 2, 3, 4, 5]);

      act(() => {
        hook.result.current[0][2].go(4);
      });
      expect(hook.result.current[1]).toBe(1);
      expect(hook.result.current[0][0]).toBe(5);
      expect(hook.result.current[1]).toBe(1);
    });
  });

  it('should pop elements to the right when setting state being not in the end of history', () => {
    const hook = getHook(5, 5, [1, 2, 3, 4, 5]);
    act(() => {
      hook.result.current[0][2].back(2);
    });
    expect(hook.result.current[0][2].history).toEqual([1, 2, 3, 4, 5]);
    act(() => {
      hook.result.current[0][1](8);
    });
    expect(hook.result.current[0][2].history).toEqual([1, 2, 3, 8]);
  });

  it('should throw if capacity is 0 or negative', () => {
    let hook = getHook(3, -1);
    expect(hook.result.error).toEqual(new Error(`Capacity has to be greater than 1, got '-1'`));

    hook = getHook(3, 0);
    expect(hook.result.error).toEqual(new Error(`Capacity has to be greater than 1, got '0'`));
  });
});
