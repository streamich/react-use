import { useCallback, useDebugValue } from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
import { SharedState } from './sharedState';
import type { Dispatch, SetStateAction } from 'react';

export function createSharedState<Snapshot = undefined>(): <Selection = undefined>(
  selector?: (state: Snapshot) => Selection,
) => [
  (Selection extends undefined ? Snapshot : Selection) | undefined,
  Dispatch<SetStateAction<Snapshot | undefined>>,
];
export function createSharedState<Snapshot>(
  initialState: Snapshot | (() => Snapshot),
): <Selection = undefined>(
  selector?: (state: Snapshot) => Selection,
) => [Selection extends undefined ? Snapshot : Selection, Dispatch<SetStateAction<Snapshot>>];
export function createSharedState(initialState?: any) {
  let sharedState: SharedState<any>;
  const useSharedState = (selector?: (state: any) => any) => {
    if (!sharedState) {
      sharedState = new SharedState(initialState);
    }
    const getSnapshot = useCallback(
      () => sharedState.getState(selector ? selector : (state) => state),
      [],
    );
    const state = useSyncExternalStore(sharedState.subscribe, getSnapshot, getSnapshot);
    useDebugValue(state);
    return [state, sharedState.setState];
  };
  return useSharedState;
}
