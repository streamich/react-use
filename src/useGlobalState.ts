import { useEffect, useState } from 'react';

export function useGlobalState<S = any>(initialState?: S) {
  const store: { state: S | undefined; setState: (state: S) => void; setters: any[] } = {
    state: initialState,
    setState(state: S) {
      store.state = state;
      store.setters.forEach(setter => setter(store.state));
    },
    setters: [],
  };

  return (): [S | undefined, (state: S) => void] => {
    const [globalState, stateSetter] = useState<S | undefined>(store.state);

    if (!store.setters.includes(stateSetter)) {
      store.setters.push(stateSetter);
    }

    useEffect(
      () => () => {
        store.setters = store.setters.filter(setter => setter !== stateSetter);
      },
      []
    );

    return [globalState, store.setState];
  };
}

export default useGlobalState;
