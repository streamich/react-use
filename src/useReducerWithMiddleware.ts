import { applyMiddleware } from './enhanceableReducer/applyMiddleware';
import { Dispatch, Reducer } from './enhanceableReducer/createStore';
import { useEnhanceableReducer } from './useEnhanceableReducer';

interface StoreAPI<D extends Dispatch = Dispatch, S = any> {
  dispatch: D;
  getState: () => S;
}

export type Middleware<S = any, D extends Dispatch = Dispatch> = (
  store: StoreAPI<D, S>
) => (next: Dispatch<any>) => (action: any) => any;

export function useReducerWithMiddleware<State, Action, I>(
  reducer: Reducer<State, Action>,
  middlewares: Array<Middleware<State, Dispatch<Action>>>,
  initialState?: I & State,
  initializer?: (arg?: I & State) => State
): [State, Dispatch<Action>];

export function useReducerWithMiddleware<State, Action, I>(
  reducer: Reducer<State, Action>,
  middlewares: Array<Middleware<State, Dispatch<Action>>>,
  initialState?: I,
  initializer?: (arg?: I) => State
): [State, Dispatch<Action>];

export function useReducerWithMiddleware<State, Action>(
  reducer: Reducer<State, Action>,
  middlewares: Array<Middleware<State, Dispatch<Action>>>,
  initialState?: State,
  initializer?: (arg?: State) => State
): [State, Dispatch<Action>] {
  return useEnhanceableReducer(reducer, initialState, initializer, applyMiddleware(...middlewares));
}
