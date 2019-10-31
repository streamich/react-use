export type Dispatch<A = any> = <T extends A>(action: T, ...extraArgs: any[]) => T;

export type ExtendState<State, Extension> = [Extension] extends [never] ? State : State & Extension;

export interface Store<State, Action> {
  getState: () => State;
  dispatch: Dispatch<Action>;
}

export type Reducer<State = any, Action = any> = (prevState: State, action: Action) => State;
export type Initializer<State = any> = (initialState: any | undefined) => State;

export type StoreEnhancerStoreCreator<StoreExt = {}, StateExt = never> = <State = any, Action = any>(
  reducer: Reducer<State, Action>,
  initialState?: State,
  initializer?: Initializer<State>
) => Store<ExtendState<State, StateExt>, Action> & StoreExt;

export type StoreEnhancer<StoreExt = {}, StateExt = never> = (
  next: StoreEnhancerStoreCreator<StoreExt, StateExt>
) => StoreEnhancerStoreCreator<StoreExt, StateExt>;

export type StoreCreator = <State, Action, StoreExt = {}, StateExt = never>(
  reducer: Reducer<State, Action>,
  initialState?: State,
  initializer?: Initializer<State>,
  enhancer?: StoreEnhancer<StoreExt, StateExt>
) => Store<ExtendState<State, StateExt>, Action> & StoreExt;

export function createStore<State, Action, StoreExt = {}, StateExt = never>(
  reducer: Reducer<State, Action>,
  initialState?: State,
  initializer?: Initializer<State>,
  enhancer?: StoreEnhancer<StoreExt, StateExt>
): Store<ExtendState<State, StateExt>, Action> & StoreExt {
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('enhancer expected to be a function, got ' + typeof enhancer);
    }

    return enhancer(createStore)(reducer, initialState, initializer);
  }

  let currentState: State;
  let isDispatching: boolean = false;

  return {
    getState: () => {
      if (isDispatching) {
        throw new Error(
          'Calling getState during reduce process is forbidden. Reducer has received actual state as an argument, use it instead.'
        );
      }

      return currentState;
    },
    dispatch: (action: Action) => {
      if (isDispatching) {
        throw new Error('reducers are not allowed to dispatch actions');
      }

      try {
        isDispatching = true;
        currentState = reducer(currentState, action);
      } finally {
        isDispatching = false;
      }

      return action;
    },
  } as Store<ExtendState<State, StateExt>, Action> & StoreExt;
}
