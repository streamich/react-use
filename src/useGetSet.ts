import { Dispatch, useMemo, useRef } from 'react';
import useUpdate from './useUpdate.js';
import { IHookStateInitAction, IHookStateSetAction, resolveHookState } from './misc/hookState.js';

export default function useGetSet<S>(
  initialState: IHookStateInitAction<S>
): [get: () => S, set: Dispatch<IHookStateSetAction<S>>] {
  const state = useRef(resolveHookState(initialState));
  const update = useUpdate();

  return useMemo(
    () => [
      () => state.current as S,
      (newState: IHookStateSetAction<S>) => {
        state.current = resolveHookState(newState, state.current);
        update();
      },
    ],
    []
  );
}
