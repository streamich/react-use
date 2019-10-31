import { MutableRefObject, useRef } from 'react';
import useUpdate from './useUpdate';

export type Reducer<S = any, A extends any = any> = (state: S | undefined, action: A) => S;

export type Dispatch<A extends any = any> = <T extends A>(action: T, ...args: any[]) => T;

export interface Store<State, Action> {
  getState: () => State;
  dispatch: Dispatch<Action>;
}

export type ExtendState<State, Extension> = [Extension] extends [never] ? State : State & Extension;

export type StoreCreator = <S, A extends any, StoreExt = {}, StateExt = never>(
  reducerRef: MutableRefObject<Reducer<S, A>>,
  onStateSet?: Function,
  initialState?: S,
  enhancer?: StoreEnhancer<StoreExt, StateExt>
) => Store<ExtendState<S, StateExt>, A> & StoreExt;

export type StoreEnhancer<Ext = {}, StateExt = never> = (
  next: StoreEnhancerStoreCreator<Ext, StateExt>
) => StoreEnhancerStoreCreator<Ext, StateExt>;

export type StoreEnhancerStoreCreator<StoreExt = {}, StateExt = never> = <S, A extends any>(
  reducer: MutableRefObject<Reducer<S, A>>,
  onStateSet?: Function,
  initialState?: S
) => Store<ExtendState<S, StateExt>, A> & StoreExt;

function createStore<S, A extends any, StoreExt = {}, StateExt = never>(
  reducerRef: MutableRefObject<Reducer<S, A>>,
  onStateSet?: Function,
  initialState?: S,
  enhancer?: StoreEnhancer<StoreExt, StateExt>
): Store<ExtendState<S, StateExt>, A> & StoreExt {
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('reducer expected to be a function, got ' + typeof enhancer);
    }

    return enhancer(createStore)(reducerRef, onStateSet, initialState) as Store<ExtendState<S, StateExt>, A> & StoreExt;
  }

  let currentState: S | undefined = initialState;
  let isDispatching: boolean = false;

  return {
    dispatch: (action: A) => {
      if (isDispatching) {
        throw new Error('reducers are not allowed to dispatch actions');
      }

      try {
        isDispatching = true;
        currentState = reducerRef.current(currentState, action);
      } finally {
        isDispatching = false;
      }

      onStateSet && onStateSet();

      return action;
    },
    getState: () => {
      if (isDispatching) {
        throw new Error(
          'Calling getState during reduce process is forbidden. ' +
            'Reducer has received actual state as an argument, use it instead.'
        );
      }

      return currentState;
    },
  } as Store<ExtendState<S, StateExt>, A> & StoreExt;
}

export function useEnhanceableReducer<S, A extends any, StoreExt = {}, StateExt = never>(
  reducer: Reducer<S, A>,
  initialState?: S,
  enhancer?: StoreEnhancer<StoreExt, StateExt>
): [S, Dispatch<A>] {
  if (typeof reducer !== 'function') {
    throw new Error('reducer expected to be a function, got ' + typeof reducer);
  }

  const reducerRef = useRef(reducer);
  const update = useUpdate();
  const store = useRef(createStore<S, A, StoreExt, StateExt>(reducerRef, update, initialState, enhancer));

  return [store.current.getState(), store.current.dispatch];
}
