import { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';

type inputValue = string | number | string[];
type inputChange = (event: ChangeEvent<HTMLInputElement>) => any;
type setInputValue = Dispatch<SetStateAction<inputValue>>;
type result = [inputValue, inputChange, setInputValue];

const useInput = (initValue: inputValue, onChange?: inputChange): result => {
  const [value, setValue] = useState(initValue);

  if (!onChange) {
    onChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.value);
    };
  }

  return [value, onChange, setValue];
};

export default useInput;
