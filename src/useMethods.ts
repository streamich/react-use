/* eslint-disable */
import { useMemo, useReducer } from 'react';

const useMethods = (createMethods, initialState) => {
  const reducer = useMemo(
    () => (reducerState, action) => {
      return createMethods(reducerState)[action.type](...action.payload);
    },
    [createMethods]
  );

  const [state, dispatch] = useReducer(reducer, initialState);

  const wrappedMethods = useMemo(() => {
    const actionTypes = Object.keys(createMethods(initialState));
    return actionTypes.reduce((acc, type) => {
      acc[type] = (...payload) => dispatch({ type, payload });
      return acc;
    }, {});
  }, []);

  return [state, wrappedMethods];
};

export default useMethods;
