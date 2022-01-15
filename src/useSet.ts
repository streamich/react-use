import { useState, useMemo } from 'react';

const cast = <TValue>(value: TValue) => (Array.isArray(value) ? value : [value]);

const useSet = <TValue>(initialValue: TValue) => {
  const [state, setState] = useState(new Set<TValue>(cast(initialValue)));

  const constantHandlers = useMemo(
    () => ({
      add(value: TValue) {
        setState(state.add(value));
      },
      clear() {
        state.clear();
        setState(state);
      },
      delete(value: TValue) {
        if (state.delete(value)) {
          setState(state);
        }
      },
    }),
    [state]
  );

  const customHandlers = useMemo(
    () => ({
      reset() {
        setState(new Set(cast(initialValue)));
      },
      toggle(value: TValue) {
        if (state.has(value)) {
          constantHandlers.delete(value);
          return;
        }
        constantHandlers.add(value);
      },
    }),
    [state, initialValue, constantHandlers]
  );

  const handlers = useMemo(
    () => ({
      ...customHandlers,
      ...constantHandlers,
    }),
    [constantHandlers, customHandlers]
  );

  return [state, handlers] as const;
};

export default useSet;
