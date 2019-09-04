import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

export type ValidityState = [boolean | null, ...any[]];
export type DispatchValidityState = Dispatch<SetStateAction<ValidityState>>;

export type Validator<State = any, StateValidity extends ValidityState = ValidityState> =
  | {
      (state?: State, prev?: State): StateValidity;
      (state?: State, prev?: State, setValidity?: DispatchValidityState): void;
    }
  | Function;

export type ValidateFn = () => void;

export type UseValidatableStateReturn<State = any, StateValidity extends ValidityState = ValidityState> = [
  State,
  Dispatch<SetStateAction<State>>,
  StateValidity,
  ValidateFn
];

export default function useValidatableState<State, StateValidity extends ValidityState = ValidityState>(
  validator: Validator<State | null, StateValidity>,
  initialState?: State
): UseValidatableStateReturn<State, StateValidity> {
  const prevState = useRef<State | null>(null);
  const [state, setState] = useState<State>(initialState!);
  const [validity, setValidity] = useState([null] as StateValidity);

  const validate = useCallback<ValidateFn>(() => {
    if (validator.length === 3) {
      validator(state, prevState.current, setValidity as DispatchValidityState);
    } else {
      setValidity(validator(state, prevState.current));
    }
  }, [state, validator]);

  useEffect(() => {
    validate();
  }, [validate, state]);
  useEffect(() => {
    prevState.current = state;
  }, [state]);

  return [state, setState, validity, validate];
}
