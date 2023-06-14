import { useState, Reducer } from 'react';

export type TOptions<S, R> = {
  verifyCallback: (newState: S) => Promise<R>;
  shouldResetState?: (response: R, newState: S) => boolean;
  fallback?: (reason: any) => void;
};

export function useOptimisticState<R, S, A>(
  initialState: S,
  reducer: Reducer<S, A>,
  options: TOptions<S, R>
): [S, (action: A) => void] {
  let { verifyCallback, shouldResetState, fallback } = options;
  shouldResetState ??= () => true;
  fallback ??= () => void 0;
  const [state, setState] = useState(initialState);
  const optimisticUpdate = (action: A) => {
    const prevState = state;
    const newState = reducer(state, action);
    setState(newState);
    verifyCallback(newState)
      .then((response) => {
        if (shouldResetState!(response, newState)) {
          throw new Error('TOptions.shouldResetState return a false value');
        }
      })
      .catch((reason) => {
        setState(prevState);
        fallback!(reason);
      });
  };
  return [state, optimisticUpdate];
}
