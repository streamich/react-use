import { useReducer } from 'react';

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

const createReducer = (...middlewares) => (...args) => {
  const [state, dispatch] = useReducer(...args);

  let middlewareDispatch = () => {
    throw new Error(
      'Dispatching while constructing your middleware is not allowed. ' +
        'Other middleware would not be applied to this dispatch.'
    );
  };

  const middlewareAPI = {
    getState: () => state,
    dispatch: (...args) => middlewareDispatch(...args),
  };
  const chain = middlewares.map(middleware => middleware(middlewareAPI));
  middlewareDispatch = compose(...chain)(dispatch);

  return [state, middlewareDispatch];
};

export default createReducer;
