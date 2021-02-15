import { useState, SetStateAction } from 'react';
import useEffectOnce from '../useEffectOnce';
import useIsomorphicLayoutEffect from '../useIsomorphicLayoutEffect';

export function createGlobalState<S = any>(
  initialState: S | (() => S)
): () => [S, (state: SetStateAction<S>) => void];
export function createGlobalState<S = undefined>(): () => [S, (state: SetStateAction<S>) => void];

export function createGlobalState<S>(initialState?: S) {
  const store: {
    state: S;
    setState: (state: SetStateAction<S>) => void;
    setters: any[];
  } = {
    state: initialState instanceof Function ? initialState() : initialState,
    setState(stateOrFn: SetStateAction<S>) {
      store.state =
        stateOrFn instanceof Function ? stateOrFn(this.state || (initialState as S)) : stateOrFn;
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
