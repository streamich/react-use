import { Reducer, useMemo, useReducer } from 'react';

type Action = {
  type: string;
  payload: any[];
};

type CreateMethods<M, T> = (state: T) => M;

type WrappedMethods<M extends Record<string, (...args: any[]) => any>> = {
  [P in keyof M]: (...payload: Parameters<M[P]>) => void;
};

const useMethods = <M extends Record<string, (...args: any[]) => T>, T>(
  createMethods: CreateMethods<M, T>,
  initialState: T
): [T, WrappedMethods<M>] => {
  const reducer = useMemo<Reducer<T, Action>>(
    () => (reducerState: T, action: Action) => {
      return createMethods(reducerState)[action.type](...action.payload);
    },
    [createMethods]
  );

  const [state, dispatch] = useReducer<Reducer<T, Action>>(reducer, initialState);

  const wrappedMethods: WrappedMethods<M> = useMemo(() => {
    const actionTypes = Object.keys(createMethods(initialState));

    return actionTypes.reduce(
      (acc, type) => {
        acc[type as keyof M] = (...payload) => dispatch({ type, payload });
        return acc;
      },
      {} as WrappedMethods<M>
    );
  }, [createMethods, initialState]);

  return [state, wrappedMethods];
};

export default useMethods;
