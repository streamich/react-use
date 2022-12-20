import { Reducer, useRef, useMemo, useReducer } from 'react';

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

export default function useMethods<M, T>(
  createMethods: CreateMethods<M, T>,
  initialState: T
): [T, WrappedMethods<M>];
export default function useMethods<M, T, I>(
  createMethods: CreateMethods<M, T>,
  initArg: I,
  init: (arg: I) => T
): [T, WrappedMethods<M>];
export default function useMethods<M, T, I>(
  createMethods: CreateMethods<M, T>,
  initArg: I & T,
  init: (arg: I & T) => T = (arg) => arg
): [T, WrappedMethods<M>] {
  const initArgInner = useRef(initArg);
  const initInner = useRef(init);

  initArgInner.current = initArg;
  initInner.current = init;

  const reducer = useMemo<Reducer<T, Action>>(
    () => (reducerState: T, action: Action) => {
      return createMethods(reducerState)[action.type](...action.payload);
    },
    [createMethods]
  );

  const [state, dispatch] = useReducer<Reducer<T, Action>, I>(reducer, initArg, init);

  const wrappedMethods: WrappedMethods<M> = useMemo(() => {
    const actionTypes = Object.keys(createMethods(initInner.current(initArgInner.current)));

    return actionTypes.reduce((acc, type) => {
      acc[type] = (...payload) => dispatch({ type, payload });
      return acc;
    }, {} as WrappedMethods<M>);
  }, [createMethods]);

  return [state, wrappedMethods];
}
