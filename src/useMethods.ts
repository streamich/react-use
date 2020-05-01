import { useMemo, useReducer, Reducer } from 'react';

type Action = {
  type: string;
  payload?: any;
};

type CreateMethods<M extends object, T> = (state: T) => M

const useMethods = <M extends object, T>(createMethods: CreateMethods<M, T>, initialState: T): [T, M] => {
  const reducer = useMemo<Reducer<T, Action>>(
    () => (reducerState: T, action: Action) => {
      return createMethods(reducerState)[action.type](...action.payload);
    },
    [createMethods]
  );

  const [state, dispatch] = useReducer<Reducer<T, Action>>(reducer, initialState);

  const wrappedMethods: M = useMemo(() => {
    const actionTypes = Object.keys(createMethods(initialState));

    return actionTypes.reduce((acc, type) => {
      acc[type] = (...payload) => dispatch({ type, payload });
      return acc;
    }, {} as M);
  }, [createMethods, initialState]);

  return [state, wrappedMethods];
};

export default useMethods;
