import { MutableRefObject, useCallback, useRef, useState } from 'react';
import useUpdateEffect from '../useUpdateEffect';

type Dispatch<Action> = (action: Action) => void;

interface Store<Action, State> {
  getState: () => State;
  dispatch: Dispatch<Action>;
}

type Middleware<Action, State> = (
  store: Store<Action, State>
) => (next: Dispatch<Action>) => (action: Action) => void;

function composeMiddleware<Action, State>(chain: Middleware<Action, State>[]) {
  return (context: Store<Action, State>, dispatch: Dispatch<Action>) => {
    return chain.reduceRight((res, middleware) => {
      return middleware(context)(res);
    }, dispatch);
  };
}

const createReducer = <Action, State>(...middlewares: Middleware<Action, State>[]) => {
  const composedMiddleware = composeMiddleware<Action, State>(middlewares);

  return (
    reducer: (state: State, action: Action) => State,
    initialState: State,
    initializer = (value: State) => value
  ): [State, Dispatch<Action>] => {
    const ref = useRef(initializer(initialState));
    const [, setState] = useState(ref.current);

    const dispatch = useCallback(
      (action) => {
        ref.current = reducer(ref.current, action);
        setState(ref.current);
        return action;
      },
      [reducer]
    );

    const dispatchRef: MutableRefObject<Dispatch<Action>> = useRef(
      composedMiddleware(
        {
          getState: () => ref.current,
          dispatch: (...args: [Action]) => dispatchRef.current(...args),
        },
        dispatch
      )
    );

    useUpdateEffect(() => {
      dispatchRef.current = composedMiddleware(
        {
          getState: () => ref.current,
          dispatch: (...args: [Action]) => dispatchRef.current(...args),
        },
        dispatch
      );
    }, [dispatch]);

    return [ref.current, dispatchRef.current];
  };
};

export default createReducer;
