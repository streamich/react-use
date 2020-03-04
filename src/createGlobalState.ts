/* eslint-disable */
import { useLayoutEffect, useState, Dispatch } from 'react';
import { resolveHookState, InitialHookState, HookState } from './util/resolveHookState'
import useEffectOnce from './useEffectOnce';

export type GlobalStateHookReturn<S> = [ S, Dispatch<HookState<S>> ]
export type GlobalStateHook<S> = (initialState?: InitialHookState<S>) => GlobalStateHookReturn<S>
interface StateStore<S> {
  initialized: boolean
  state: S
  setState: Dispatch<HookState<S>>
  setters: Dispatch<HookState<S>>[]
}
export function createGlobalState<S = any>(defaultState: S): GlobalStateHook<S> {
  const store: StateStore<S> = {
    initialized: false,
    state: defaultState,
    setState(newState: HookState<S>) {
      store.state = resolveHookState(newState, store.state);
      store.setters.forEach(setter => setter(store.state));
    },
    setters: [],
  };

  // unlike in useState, don't extend the type with `undefined` when the initializer
  // is ommited because it may already be defined by the defaultState.
  return function(initialState?: InitialHookState<S>): GlobalStateHookReturn<S> {
    // Prevent clobbering defaultState or existing state if no argument was passed
    if (!store.initialized && arguments.length > 0) {
      // coerce to S because typescript doesn't detect that if arguments.length > 0
      // is then initialState is S. Using spread parameter syntax might work here
      // but it would be less readable, I think, and still require a comment explainer.
      store.state = resolveHookState(initialState) as S;
    }
    const [globalState, stateSetter] = useState<S>(store.state);

    useEffectOnce(() => () => {
      store.setters = store.setters.filter(setter => setter !== stateSetter);
    });

    useLayoutEffect(() => {
      if (!store.setters.includes(stateSetter)) {
        store.setters.push(stateSetter);
      }
    });

    store.initialized = true;
    return [globalState, store.setState];
  };
}

export default createGlobalState;
