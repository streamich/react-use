import { MutableRefObject } from 'react';
import { Dispatch, Reducer, StoreCreator, StoreEnhancer, useEnhanceableReducer } from './useEnhanceableReducer';

interface StoreAPI<D extends Dispatch = Dispatch, S = any> {
  dispatch: D;

  getState(): S;
}

function compose<R>(...funcs: Array<(a: R) => R>): (...args: any[]) => R;
function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    // infer the argument type so it is usable in inference down the line
    return <T>(arg: T) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args: any) => a(b(...args)));
}

export type Middleware<D extends Dispatch = Dispatch, S = any> = (
  store: StoreAPI<D, S>
) => (dispatch: Dispatch<any>) => (action: any) => any;

export function applyMiddleware(...middlewares: Middleware[]): StoreEnhancer<any> {
  return (createStore: StoreCreator) => <S, A extends any>(
    reducer: MutableRefObject<Reducer<S, A>>,
    ...args: any[]
  ) => {
    const store = createStore(reducer, ...args);
    let dispatch: Dispatch = () => {
      throw new Error(
        'Dispatch during middleware construction is forbidden. ' +
          'Other middleware would not be applied to this dispatch.'
      );
    };

    const storeAPI: StoreAPI = {
      getState: store.getState,
      dispatch: (action, ...arg) => dispatch(action, ...arg),
    };

    const chain = middlewares.map(middleware => middleware(storeAPI));
    dispatch = compose<typeof dispatch>(...chain)(store.dispatch);

    return {
      ...store,
      dispatch,
    };
  };
}

export function useReducerWithMiddleware<S, A extends any>(
  reducer: Reducer<S, A>,
  middlewares: Array<Middleware<Dispatch<A>, S>>,
  initialState?: S
) {
  return useEnhanceableReducer(reducer, initialState, applyMiddleware(...middlewares));
}
