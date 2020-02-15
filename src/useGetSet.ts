/* eslint-disable */
import { Dispatch, useMemo, useRef } from 'react';
import useUpdate from './useUpdate';
import { HookState, InitialHookState, resolveHookState } from './util/resolveHookState';

export default function useGetSet<S>(initialState: InitialHookState<S>): [() => S, Dispatch<HookState<S>>] {
  const state = useRef(resolveHookState(initialState));
  const update = useUpdate();

  return useMemo(
    () => [
      // get
      () => state.current as S,
      // set
      (newState: HookState<S>) => {
        state.current = resolveHookState(newState, state.current);
        update();
      },
    ],
    []
  );
}
