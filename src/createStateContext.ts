import { createFactory, createContext, useContext, useState } from 'react';

const createStateContext = <T>(initialValue: T) => {
  const context = createContext<[T, React.Dispatch<React.SetStateAction<T>>] | undefined>(undefined);
  const providerFactory = createFactory(context.Provider);

  const StateProvider: React.FC = ({ children }) => {
    const state = useState<T>(initialValue);
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
