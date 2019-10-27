import { Dispatch, SetStateAction, useCallback, useMemo, useRef, useState } from 'react';
import { resolveHookState } from './__stories__/util/resolveHookState';

interface HistoryState<S> {
  history: S[];
  position: number;
  capacity: number;
  back: (amount?: number) => void;
  forward: (amount?: number) => void;
  go: (position: number) => void;
}

type UseStateHistoryReturn<S> = [S, Dispatch<SetStateAction<S>>, HistoryState<S>];

export function useStateHistory<S>(
  initialState: S | (() => S),
  initialHistory?: S[],
  capacity?: number
): UseStateHistoryReturn<S>;
export function useStateHistory<S = undefined>(): UseStateHistoryReturn<S | undefined>;

export function useStateHistory<S>(
  initialState?: S | (() => S),
  initialHistory?: S[],
  capacity: number = 10
): UseStateHistoryReturn<S> {
  initialState = resolveHookState(initialState as S);
  initialHistory = Array.isArray(initialHistory) ? [...initialHistory] : ([initialState] as S[]);

  const [state, innerSetState] = useState(initialState);
  const history = useRef(initialHistory);
  const historyPosition = useRef(history.current.length - 1);

  const setState = useCallback(
    (newState: S | (() => S)) => {
      innerSetState(() => {
        newState = resolveHookState(newState);

        if (history.current.length && historyPosition.current < history.current.length - 1) {
          history.current.splice(historyPosition.current, history.current.length - historyPosition.current - 1);
        }

        historyPosition.current = history.current.push(newState) - 1;

        if (historyPosition.current > capacity) {
          history.current.splice(0, historyPosition.current - capacity + 1);
          historyPosition.current = capacity;
        }

        return newState;
      });
    },
    [state, capacity]
  ) as Dispatch<SetStateAction<S>>;

  const historyState = useMemo(
    () => ({
      history: history.current,
      position: historyPosition.current,
      capacity,
      back: (amount: number = 1) => {
        if (!historyPosition.current) {
          return;
        }

        innerSetState(() => {
          historyPosition.current -= Math.min(amount, historyPosition.current);

          return history.current[historyPosition.current];
        });
      },
      forward: (amount: number = 1) => {
        if (historyPosition.current >= history.current.length - 1) {
          return;
        }

        innerSetState(() => {
          historyPosition.current += Math.min(amount, history.current.length - 1 - historyPosition.current);

          return history.current[historyPosition.current];
        });
      },
      go: (pos: number) => {
        if (pos === historyPosition.current) {
          return;
        }

        innerSetState(() => {
          historyPosition.current =
            pos < 0 ? Math.max(history.current.length - pos, 0) : Math.min(history.current.length - 1, pos);

          return history.current[historyPosition.current];
        });
      },
    }),
    [state, capacity]
  );

  return [state, setState, historyState];
}
