import { createContext, createElement, useContext, useState } from 'react';

const createStateContext = <T>(defaultInitialValue: T) => {
  const context = createContext<[T, React.Dispatch<React.SetStateAction<T>>] | undefined>(
    undefined
  );
  const providerFactory = (props, children) => createElement(context.Provider, props, children);

  const StateProvider: React.FC<{ initialValue?: T }> = ({ children, initialValue }) => {
    const state = useState<T>(initialValue !== undefined ? initialValue : defaultInitialValue);
    return providerFactory({ value: state }, children);
  };

  const useStateContext = () => {
    const state = useContext(context);
    if (state == null) {
      throw new Error(`useStateContext must be used inside a StateProvider.`);
    }
    return state;
  };

  return [useStateContext, StateProvider, context] as const;
};

export default createStateContext;
