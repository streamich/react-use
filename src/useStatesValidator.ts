import React, { useState, useCallback, useMemo } from "react";

type SchemaType = {
  name: string;
  required?: boolean;
  pattern?: any;
  minlength?: number;
  maxlength?: number;
  email?: boolean;
  phone?: boolean;
  message?: string;
};

function useStatesValidator(ValidityState: SchemaType[]) {
  const createState = state => {
    const reduceState = state.reduce((accumulator, currentValue) => {
      accumulator[currentValue.name] = { value: "", error: "" };
      return accumulator;
    }, {});
    return reduceState;
  };

  const createdState = useMemo(() => createState(ValidityState), [ValidityState]);
  const [state, setState] = useState<any>(createdState);

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      let error = "";
      let emailPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
      let phonePattern = /^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;

      const findItem = ValidityState.find(item => {
        return item.name === name;
      });
      const { required, pattern, minlength, maxlength, email, phone, message } = findItem;

      if (required && !value) {
        error = "Please enter required item.";
      } else if (pattern && value && !pattern.test(value)) {
        error = "Please enter a valid format.";
      } else if (minlength && value.length < minlength) {
        error = `Please enter at least ${minlength} characters.`;
      } else if (maxlength && value.length > maxlength) {
        error = `Please enter no more than ${maxlength} characters.`;
      } else if (email && !emailPattern.test(value)) {
        error = "Please enter the correct email format.";
      } else if (phone && !phonePattern.test(value)) {
        error = "Please enter the phone number in the correct format.";
      }

      if (!!error && !!message) {
        error = message;
        setState(prevState => ({
          ...prevState,
          [name]: { value, error }
        }));
      } else {
        setState(prevState => ({
          ...prevState,
          [name]: { value, error }
        }));
      }
    },
    [ValidityState]
  );
  return [state, handleOnChange];
}

export default useStatesValidator;
