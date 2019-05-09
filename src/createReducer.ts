import { useMemo, useRef, useState } from 'react';

function composeMiddleware(chain) {
  return (context, dispatch) => {
    return chain.reduceRight((res, middleware) => {
      return middleware(context)(res);
    }, dispatch);
  };
}

const createReducer = (...middlewares) => (reducer, initialState, initializer = value => value) => {
  const ref = useRef({})
  const [hooksState, setState] = useState(initializer(initialState))
  ref.current = hooksState
  let middlewareDispatch = () => {
    throw new Error(
      'Dispatching while constructing your middleware is not allowed. ' +
        'Other middleware would not be applied to this dispatch.'
    );
  };
  const dispatch = action => {
    ref.current = reducer(ref.current, action)
    setState(ref.current)
    return action;
  }
  const composedMiddleware = useMemo(() => {
    return composeMiddleware(middlewares);
  }, middlewares);
  const middlewareAPI = {
    getState: () => ref.current,
    dispatch: (...args) => middlewareDispatch(...args),
  };
  middlewareDispatch = composedMiddleware(middlewareAPI, dispatch);
  return [ref.current, middlewareDispatch];
};

export default createReducer;
