import { Dispatch, SetStateAction, useCallback, useRef } from 'react';
import { IHookStateInitAction, resolveHookState } from './misc/hookState';
import useGetSet from './useGetSet';

export interface StateMediator<S = any> {
  (newState: any): S;

  (newState: any, dispatch: Dispatch<SetStateAction<S>>): void;
}

export type UseMediatedStateReturn<S = any> = [S, Dispatch<SetStateAction<S>>];

export function useMediatedState<S = undefined>(
  mediator: StateMediator<S | undefined>
): UseMediatedStateReturn<S | undefined>;
export function useMediatedState<S = any>(
  mediator: StateMediator<S>,
  initialState: IHookStateInitAction<S>
): UseMediatedStateReturn<S>;

export function useMediatedState<S = any>(
  mediator: StateMediator<S>,
  initialState?: IHookStateInitAction<S>
): UseMediatedStateReturn<S> {
  const mediatorFn = useRef(mediator);

  const [get, set] = useGetSet<S>(initialState!);
  const setState = useCallback(
    (newState: any) => {
      const resolvedState = resolveHookState(newState, get());
      if (mediatorFn.current.length === 2) {
        mediatorFn.current(resolvedState, set);
      } else {
        set(mediatorFn.current(resolvedState));
      }
    },
    [get, set]
  );

  return [get(), setState];
}
