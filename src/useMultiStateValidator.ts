import { useCallback, useEffect, useRef, useState } from 'react';
import { DispatchValidity, UseValidatorReturn, ValidityState } from './useStateValidator';

export type MultiStateValidatorStates = any[] | { [p: string]: any } | { [p: number]: any };

export interface MultiStateValidator<
  V extends ValidityState = ValidityState,
  S extends MultiStateValidatorStates = MultiStateValidatorStates
> {
  (states: S): V;

  (states: S, done: DispatchValidity<V>): void;
}

export function useMultiStateValidator<
  V extends ValidityState = ValidityState,
  S extends MultiStateValidatorStates = MultiStateValidatorStates
>(states: S, validator: MultiStateValidator<V, S>, initialValidity: V = [undefined] as V): UseValidatorReturn<V> {
  if (typeof states !== 'object') {
    throw Error('states expected to be an object or array, got ' + typeof states);
  }

  const validatorFn = useRef(validator);

  const [validity, setValidity] = useState(initialValidity);

  const deps = Array.isArray(states) ? states : Object.values(states);
  const validate = useCallback(() => {
    if (validatorFn.current.length === 2) {
      validatorFn.current(states, setValidity);
    } else {
      setValidity(validatorFn.current(states));
    }
  }, deps);

  useEffect(() => {
    validate();
  }, deps);

  return [validity, validate];
}
