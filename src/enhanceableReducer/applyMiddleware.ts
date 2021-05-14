// taken from redux and modified for hooks reality
import { MutableRefObject } from 'react';
import { compose } from './compose';
import { Dispatch, Reducer, StoreCreator, StoreEnhancer } from './createStore';

interface StoreAPI<D extends Dispatch = Dispatch, S = any> {
  dispatch: D;
  getState: () => S;
}

export type Middleware<S = any, D extends Dispatch = Dispatch> = (
  store: StoreAPI<D, S>
) => (next: Dispatch<any>) => (action: any) => any;

export function applyMiddleware(): StoreEnhancer;
export function applyMiddleware<Ext1, S>(middleware1: Middleware<S, any>): StoreEnhancer<{ dispatch: Ext1 }>;
export function applyMiddleware<Ext1, Ext2, S>(
  middleware1: Middleware<S, any>,
  middleware2: Middleware<S, any>
): StoreEnhancer<{ dispatch: Ext1 & Ext2 }>;
export function applyMiddleware<Ext1, Ext2, Ext3, S>(
  middleware1: Middleware<S, any>,
  middleware2: Middleware<S, any>,
  middleware3: Middleware<S, any>
): StoreEnhancer<{ dispatch: Ext1 & Ext2 & Ext3 }>;
export function applyMiddleware<Ext1, Ext2, Ext3, Ext4, S>(
  middleware1: Middleware<S, any>,
  middleware2: Middleware<S, any>,
  middleware3: Middleware<S, any>,
  middleware4: Middleware<S, any>
): StoreEnhancer<{ dispatch: Ext1 & Ext2 & Ext3 & Ext4 }>;
export function applyMiddleware<Ext1, Ext2, Ext3, Ext4, Ext5, S>(
  middleware1: Middleware<S, any>,
  middleware2: Middleware<S, any>,
  middleware3: Middleware<S, any>,
  middleware4: Middleware<S, any>,
  middleware5: Middleware<S, any>
): StoreEnhancer<{ dispatch: Ext1 & Ext2 & Ext3 & Ext4 & Ext5 }>;
export function applyMiddleware<Ext, S = any>(
  ...middlewares: Array<Middleware<S, any>>
): StoreEnhancer<{ dispatch: Ext }>;

export function applyMiddleware(...middlewares: Middleware[]): StoreEnhancer<any> {
  return (createStore: StoreCreator) => <State, Action = any>(
    reducer: MutableRefObject<Reducer<State, Action>>,
    ...args: any[]
  ) => {
    const store = createStore(reducer, ...args);
    let dispatch: Dispatch = () => {
      throw new Error(
        'Dispatch during middleware construction is forbidden. Other middleware would not be applied to this dispatch.'
      );
    };

    const storeAPI: StoreAPI = {
      getState: store.getState,
      dispatch: (action, ...arg) => dispatch(action, ...arg),
    };

    dispatch = compose<typeof dispatch>(...middlewares.map(middleware => middleware(storeAPI)))(store.dispatch);

    return {
      ...store,
      dispatch,
    };
  };
}
