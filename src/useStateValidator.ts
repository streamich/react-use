import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

export type ValidityState = [boolean | undefined, ...any[]] | [undefined];

export interface StateValidator<V, S> {
  (state: S): V;

  (state: S, dispatch: Dispatch<SetStateAction<V>>): void;
}

export type UseStateValidatorReturn<V> = [V, () => void];

export default function useStateValidator<V extends ValidityState, S>(
  state: S,
  validator: StateValidator<V, S>,
  initialState: V = [undefined] as V
): UseStateValidatorReturn<V> {
  const validatorInner = useRef(validator);
  const stateInner = useRef(state);

  validatorInner.current = validator;
  stateInner.current = state;

  const [validity, setValidity] = useState(initialState as V);

  const validate = useCallback(() => {
    if (validatorInner.current.length >= 2) {
      validatorInner.current(stateInner.current, setValidity as Dispatch<SetStateAction<V>>);
    } else {
      setValidity(validatorInner.current(stateInner.current));
    }
  }, [setValidity]);

  useEffect(() => {
    validate();
  }, [state]);

  return [validity, validate];
}
