import { useMemo, useRef } from 'react';
import { createStore, Dispatch, Reducer, StoreEnhancer } from './enhanceableReducer/createStore';
import useUpdate from './useUpdate';

export function useEnhanceableReducer<State, Action, I, StoreExt = {}, StateExt = never>(
  reducer: Reducer<State, Action>,
  initialState?: I & State,
  initializer?: (arg?: I & State) => State,
  enhancer?: StoreEnhancer<StoreExt, StateExt>
): [State, Dispatch<Action>];
export function useEnhanceableReducer<State, Action, I, StoreExt = {}, StateExt = never>(
  reducer: Reducer<State, Action>,
  initialState?: I,
  initializer?: (arg?: I) => State,
  enhancer?: StoreEnhancer<StoreExt, StateExt>
): [State, Dispatch<Action>];
export function useEnhanceableReducer<State, Action, StoreExt = {}, StateExt = never>(
  reducer: Reducer<State, Action>,
  initialState?: State,
  initializer?: (arg?: State) => State,
  enhancer?: StoreEnhancer<StoreExt, StateExt>
): [State, Dispatch<Action>] {
  if (typeof reducer !== 'function') {
    throw new Error('reducer expected to be a function, got ' + typeof reducer);
  }

  const reducerRef = useRef(reducer);
  const update = useUpdate();

  const store = useMemo(() => createStore(reducerRef, initialState, initializer, update, enhancer), []);

  return [store.getState(), store.dispatch];
}
