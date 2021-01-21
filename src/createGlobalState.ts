import { useState } from 'react';
import useEffectOnce from './useEffectOnce';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

export function createGlobalState<S = any>(initialState?: S) {
  const store: {
    state: S | undefined;
    setState: (state: S | ((prevState: S) => S)) => void;
    setters: any[];
  } = {
    state: initialState,
    setState(state: S | ((prevState: S) => S)) {
      store.state = isFunction(state) ? state(store.state!) : state;
      store.setters.forEach((setter) => setter(store.state));
    },
    setters: [],
  };

  return (): [S | undefined, (state: S | ((prevState: S) => S)) => void] => {
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
