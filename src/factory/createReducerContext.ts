import { createContext, createElement, useContext, useReducer } from 'react';

const createReducerContext = <R extends React.Reducer<any, any>>(
  reducer: R,
  defaultInitialState: React.ReducerState<R>
) => {
  const context = createContext<
    [React.ReducerState<R>, React.Dispatch<React.ReducerAction<R>>] | undefined
  >(undefined);
  const providerFactory = (props, children) => createElement(context.Provider, props, children);

  const ReducerProvider: React.FC<{ initialState?: React.ReducerState<R> }> = ({
    children,
    initialState,
  }) => {
    const state = useReducer<R>(
      reducer,
      initialState !== undefined ? initialState : defaultInitialState
    );
    return providerFactory({ value: state }, children);
  };

  const useReducerContext = () => {
    const state = useContext(context);
    if (state == null) {
      throw new Error(`useReducerContext must be used inside a ReducerProvider.`);
    }
    return state;
  };

  return [useReducerContext, ReducerProvider, context] as const;
};

export default createReducerContext;
