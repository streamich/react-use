import { useCallback, useMemo, useReducer } from 'react';

function applyMiddleware(chain, store) {
  return dispatch => {
    return chain.reduceRight((res, middleware) => {
      return middleware(store)(res);
    }, dispatch);
  };
}

const createReducer = (...middlewares) => (reducer, initialState, initializer) => {
  const [state, dispatch] = useReducer(reducer, initialState, initializer);
  const getState = useCallback(() => state, [state])
  let middlewareDispatch = () => {
    throw new Error(
      'Dispatching while constructing your middleware is not allowed. ' +
        'Other middleware would not be applied to this dispatch.'
    );
  };
  middlewareDispatch = useMemo(() => {
    const store = {
      getState,
      dispatch: (...args) => middlewareDispatch(...args),
    };
    return applyMiddleware(middlewares, store)(dispatch);
  }, middlewares)

  return [state, middlewareDispatch];
};

export default createReducer;
