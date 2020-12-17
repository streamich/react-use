import { useState, Dispatch, SetStateAction } from 'react';
import useEffectOnce from './useEffectOnce';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export function createGlobalState<S>(initialState: S | (() => S)): () => [S, Dispatch<SetStateAction<S>>];
export function createGlobalState<S = undefined>(): () => [S | undefined, Dispatch<SetStateAction<S | undefined>>];
export function createGlobalState<S>(initialState?: S | (() => S)) {
  const store: { state: S; setState: Dispatch<SetStateAction<S>>; setters: any[] } = {
    state: typeof initialState === 'function' ? (initialState as any)() : initialState,
    setState(action: SetStateAction<S>) {
      store.state = typeof action === 'function' ? (action as any)(store.state) : action;
      store.setters.forEach((setter) => setter(store.state));
    },
    setters: [],
  };

  return (): [S | undefined, (state: S) => void] => {
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
