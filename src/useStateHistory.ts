import { Dispatch, SetStateAction, useCallback, useMemo, useRef, useState } from 'react';
import { resolveHookState } from './__stories__/util/resolveHookState';

interface HistoryState<S> {
  history: S[];
  position: number;
  capacity: number;
  back: (amount?: number) => void;
  forward: (amount?: number) => void;
}

type UseStateHistoryReturn<S> = [S, Dispatch<SetStateAction<S>>, HistoryState<S>];

export function useStateHistory<S>(initialState: S | (() => S), capacity?: number): UseStateHistoryReturn<S>;
export function useStateHistory<S = undefined>(): UseStateHistoryReturn<S | undefined>;
export function useStateHistory<S>(
  initialState?: S | (() => S),
  capacity: number = 10
): UseStateHistoryReturn<S | undefined> {
  const [state, innerSetState] = useState<S | undefined>(initialState);
  const history = useRef<Array<S | undefined>>([resolveHookState<S | undefined>(initialState)]);
  const historyPosition = useRef<number>(0);

  const setState = useCallback(
    (newState: S | (() => S)) => {
      innerSetState(() => {
        const s = resolveHookState<S | undefined>(newState);

        if (history.current.length && historyPosition.current < history.current.length - 1) {
          history.current.splice(historyPosition.current, history.current.length - historyPosition.current);
        }

        historyPosition.current = history.current.push(s) - 1;

        if (historyPosition.current > 9) {
          history.current.splice(0, historyPosition.current - 9);
          historyPosition.current = 9;
        }

        return s;
      });
    },
    [state]
  ) as Dispatch<SetStateAction<S | undefined>>;

  const historyState = useMemo(
    () => ({
      history: history.current,
      position: historyPosition.current,
      capacity,
      back: (amount: number = 1) => {
        if (!historyPosition.current) {
          return;
        }

        historyPosition.current -= Math.min(amount, historyPosition.current);

        innerSetState(history.current[historyPosition.current]);
      },
      forward: (amount: number = 1) => {
        if (historyPosition.current >= history.current.length - 1) {
          return;
        }

        historyPosition.current += Math.min(amount, history.current.length - 1 - historyPosition.current);

        innerSetState(history.current[historyPosition.current]);
      },
    }),
    [state, capacity]
  );

  return [state, setState, historyState];
}
