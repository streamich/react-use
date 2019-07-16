import { useCallback, useRef, useState } from 'react';
import useUpdateEffect from './useUpdateEffect';

function composeMiddleware(chain) {
  return (context, dispatch) => {
    return chain.reduceRight((res, middleware) => {
      return middleware(context)(res);
    }, dispatch);
  };
}

const createReducer = (...middlewares) => {
  const composedMiddleware = composeMiddleware(middlewares);

  return (reducer, initialState, initializer = value => value) => {
    const ref = useRef(initializer(initialState));
    const [, setState] = useState(ref.current);

    const dispatch = useCallback(
      action => {
        ref.current = reducer(ref.current, action);
        setState(ref.current);
        return action;
      },
      [reducer]
    );

    const dispatchRef = useRef(
      composedMiddleware(
        {
          getState: () => ref.current,
          dispatch: (...args) => dispatchRef.current(...args),
        },
        dispatch
      )
    );

    useUpdateEffect(() => {
      dispatchRef.current = composedMiddleware(
        {
          getState: () => ref.current,
          dispatch: (...args) => dispatchRef.current(...args),
        },
        dispatch
      );
    }, [dispatch]);

    return [ref.current, dispatchRef.current];
  };
};

export default createReducer;
