import { useMemo } from 'react';
import useGetSet from './useGetSet';
import { HookState, InitialHookState, resolveHookState } from './util/resolveHookState';

export interface CounterActions {
  inc: (delta?: number) => void;
  dec: (delta?: number) => void;
  get: () => number;
  set: (value: HookState<number>) => void;
  reset: (value?: HookState<number>) => void;
}

export default function useCounter(
  initialValue: InitialHookState<number> = 0,
  max: number | null = null,
  min: number | null = null
): [number, CounterActions] {
  let init = resolveHookState(initialValue);

  typeof init !== 'number' && console.error('initialValue has to be a number, got ' + typeof initialValue);

  if (typeof min === 'number') {
    init = Math.max(init, min);
  } else if (min !== null) {
    console.error('min has to be a number, got ' + typeof min);
  }

  if (typeof max === 'number') {
    init = Math.min(init, max);
  } else if (max !== null) {
    console.error('max has to be a number, got ' + typeof max);
  }

  const [get, setInternal] = useGetSet(init);

  return [
    get(),
    useMemo(() => {
      const set = (newState: HookState<number>) => {
        const prevState = get();
        let rState = resolveHookState(newState, prevState);

        if (prevState !== rState) {
          if (typeof min === 'number') {
            rState = Math.max(rState, min);
          }
          if (typeof max === 'number') {
            rState = Math.min(rState, max);
          }

          prevState !== rState && setInternal(rState);
        }
      };

      return {
        get,
        set,
        inc: (delta: HookState<number> = 1) => {
          const rDelta = resolveHookState(delta, get());

          if (typeof rDelta !== 'number') {
            console.error('delta has to be a number or function returning a number, got ' + typeof rDelta);
          }

          set((num: number) => num + rDelta);
        },
        dec: (delta: HookState<number> = 1) => {
          const rDelta = resolveHookState(delta, get());

          if (typeof rDelta !== 'number') {
            console.error('delta has to be a number or function returning a number, got ' + typeof rDelta);
          }

          set((num: number) => num - rDelta);
        },
        reset: (value: HookState<number> = init) => {
          const rValue = resolveHookState(value, get());

          if (typeof rValue !== 'number') {
            console.error('value has to be a number or function returning a number, got ' + typeof rValue);
          }

          init = rValue;
          set(rValue);
        },
      };
    }, [min, max]),
  ];
}
