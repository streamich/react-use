import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

export type ValidityState = [boolean | undefined, ...any[]];
export type DispatchValidity<V extends ValidityState> = Dispatch<SetStateAction<V>>;

export type Validator<V extends ValidityState, S = any> =
  | {
      (state?: S): V;
      (state?: S, dispatch?: DispatchValidity<V>): void;
    }
  | Function;

export type UseValidatorReturn<V extends ValidityState> = [V, () => void];

export default function useStateValidator<V extends ValidityState, S = any>(
  state: S,
  validator: Validator<V, S>,
  initialValidity: V = [undefined] as V
): UseValidatorReturn<V> {
  const validatorFn = useRef(validator);

  const [validity, setValidity] = useState(initialValidity);
  const validate = useCallback(() => {
    if (validatorFn.current.length === 2) {
      validatorFn.current(state, setValidity);
    } else {
      setValidity(validatorFn.current(state));
    }
  }, [state]);

  useEffect(() => {
    validate();
  }, [state]);

  return [validity, validate];
}
