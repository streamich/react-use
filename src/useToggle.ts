import { Reducer, useReducer } from 'react';

const toggleReducer = (state: boolean, nextValue?: any) =>
  typeof nextValue === 'boolean' ? nextValue : !state;

/**
 * useToggle
 * 
 * Un hook sencillo para manejar estados booleanos (on/off).
 * Ideal para modales, menús desplegables y checkboxes.
 * 
 * @param initialValue - Valor booleano inicial.
 * @returns Un array con el estado actual y una función para alternarlo.
 */

const useToggle = (initialValue: boolean): [boolean, (nextValue?: any) => void] => {
  return useReducer<Reducer<boolean, any>>(toggleReducer, initialValue);
};

export default useToggle;
