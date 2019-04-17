import { useCallback, useMemo, useReducer } from 'react';

function applyMiddleware(chain) {
  return store => {
    return chain.reduceRight((res, middleware) => {
      return middleware(store)(res);
    }, store.dispatch);
  };
}

const createReducer = (...middlewares) => (reducer, initialState, initializer) => {
  const [state, dispatch] = useReducer(reducer, initialState, initializer);
  const getState = useCallback(() => state, [state])
  const middlewareDispatch = useMemo(() => {
    const store = { dispatch, getState }
    return applyMiddleware(middlewares)(store);
  }, middlewares)

  return [state, middlewareDispatch];
};

export default createReducer;
