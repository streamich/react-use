import { useState } from 'react';
import useEffectOnce from './useEffectOnce';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export function createGlobalState<S = any>(): () => [S | undefined, (state: S) => void]
export function createGlobalState<S = any>(initialState: S): () => [S, (state: S) => void]
export function createGlobalState<S = any>(initialState?: S): () => [S | undefined, (state: S) => void] {
  const store: { state: S | undefined; setState: (state: S) => void; setters: any[] } = {
    state: initialState,
    setState(state: S) {
      store.state = state;
      store.setters.forEach((setter) => setter(store.state));
    },
    setters: [],
  };

  return () => {
    const [globalState, stateSetter] = useState<S | undefined>(store.state);

    useEffectOnce(() => () => {
      store.setters = store.setters.filter((setter) => setter !== stateSetter);
    });

    useIsomorphicLayoutEffect(() => {
      if (!store.setters.includes(stateSetter)) {
        store.setters.push(stateSetter);
      }
    });

    return [globalState, store.setState];
  };
}

export default createGlobalState;
