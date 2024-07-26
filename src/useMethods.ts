import { Reducer, useMemo, useReducer } from 'react';

type Action = {
  type: string;
  payload?: any;
};

type CreateMethods<M, T> = (state: T) => {
  [P in keyof M]: (payload?: any) => T;
};

type WrappedMethods<M> = {
  [P in keyof M]: (...payload: any) => void;
};

const useMethods = <M, T>(
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

  const wrappedMethods: WrappedMethods<M> = useMemo(
    () => {
      const actionTypes = Object.keys(createMethods(initialState));

      return actionTypes.reduce((acc, type) => {
        acc[type] = (...payload) => dispatch({ type, payload });
        return acc;
      }, {} as WrappedMethods<M>);
    },
    // Do not track `initialState` as it's supposed to be used only once.
    // See https://github.com/streamich/react-use/issues/1286
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [createMethods]
  );

  return [state, wrappedMethods];
};

export default useMethods;
