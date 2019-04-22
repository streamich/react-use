import { useMemo, useState } from 'react';

function composeMiddleware(chain) {
  return (context, dispatch) => {
    return chain.reduceRight((res, middleware) => {
      return middleware(context)(res);
    }, dispatch);
  };
}

const createReducer = (...middlewares) => (reducer, initialState, initializer = value => value) => {
  const [hooksState, setState] = useState(initializer(initialState))
  let state = hooksState
  let middlewareDispatch = () => {
    throw new Error(
      'Dispatching while constructing your middleware is not allowed. ' +
        'Other middleware would not be applied to this dispatch.'
    );
  };
  const dispatch = action => {
    state = reducer(state, action)
    setState(state)
    return action;
  }
  const composedMiddleware = useMemo(() => {
    return composeMiddleware(middlewares);
  }, middlewares);
  const middlewareAPI = useMemo(() => {
    return {
      getState: () => state,
      dispatch: (...args) => middlewareDispatch(...args),
    };
  }, [state]);
  middlewareDispatch = composedMiddleware(middlewareAPI, dispatch);
  return [state, middlewareDispatch];
};

export default createReducer;
