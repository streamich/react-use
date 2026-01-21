import { createElement, useReducer, createContext, useContext } from "react";
import usePrevious from "./usePrevious";
import useUpdateEffect from "./useUpdateEffect";

const createSuperContext = (reducer, initialState, effects) => {
  const Context = createContext(null);
  let $$dispatch;
  let currentAction = null;

  const Provider = props => {
    const [state, dispatch]: [any, any] = useReducer(reducer, initialState);
    const prevState = usePrevious(state);
    $$dispatch = dispatch;

    useUpdateEffect(() => {
      if (currentAction) {
        effects.forEach(effect => effect(prevState, currentAction, state));
      }
      currentAction = null;
    });

    return createElement(Context.Provider, { value: state }, props.children);
  };

  return {
    Provider,
    useSuperContext: () => useContext(Context),
    dispatch: action => {
      currentAction = action;
      $$dispatch(action);
    }
  };
};

export { createSuperContext };
