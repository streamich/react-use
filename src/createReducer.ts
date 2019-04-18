import { useMemo, useReducer } from 'react';

function applyMiddleware(chain, dispatch) {
  return store => {
    return chain.reduceRight((res, middleware) => {
      return middleware(store)(res);
    }, dispatch);
  };
}

const createReducer = (...middlewares) => (reducer, initialState, initializer) => {
  const [state, dispatch] = useReducer(reducer, initialState, initializer);
  let middlewareDispatch = () => {
    throw new Error(
      'Dispatching while constructing your middleware is not allowed. ' +
        'Other middleware would not be applied to this dispatch.'
    );
  };
  const composedMiddleware = useMemo(() => {
    return applyMiddleware(middlewares, dispatch);
  }, middlewares);
  const middlewareAPI = useMemo(() => {
    return {
      getState: () => state,
      dispatch: (...args) => middlewareDispatch(...args),
    };
  }, [state]);
  middlewareDispatch = composedMiddleware(middlewareAPI);
  return [state, middlewareDispatch];
};

export default createReducer;
