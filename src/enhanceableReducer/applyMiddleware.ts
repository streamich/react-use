import { Dispatch, Store } from './createStore';

interface StoreAPI<D extends Dispatch = Dispatch, S = any> {
  dispatch: D;
  getState: () => S;
}

export type Middleware<S = any, D extends Dispatch = Dispatch> = (
  store: StoreAPI<D, S>
) => (next: Dispatch<any>) => (action: any) => any;

export function composeMiddleware<R>(...middlewares: Middleware[]): R;
export function composeMiddleware(...middlewares: Middleware[]) {
  return <State, Action>(store: Store<State, Action>, dispatch: Dispatch<Action>) =>
    middlewares.reduce(
      (disp: Dispatch<Action>, middleware: Middleware<State, Dispatch<Action>>) => middleware(store)(disp),
      dispatch
    );
}
