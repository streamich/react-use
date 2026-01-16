import { useCallback, useEffect, useMemo, useState } from 'react';
/**
 * Custom React Hook to handle the max-length property of an input or textarea or any other use case where a max-length is needed.
 * Provides additional features such as a threshold for warnings and UTF-8 support.
 *
 * @typedef {Object} IUseMaxlengthInput
 * @property {number} [counterThreshold=0] - How many remaining characters trigger the counter.
 * @property {number} [warningThreshold=0] - How many remaining characters trigger the warning state. If not set, the warning state is never triggered. The value must be lower than the counterThreshold and the maxLength.
 * @property {boolean} [validate=false] - If true, prevent more characters than max-length when not supported by the browser.
 * @property {boolean} [utf8=false] - If true, count characters by byte-size rather than length (eg: £ is counted as two characters).
 * @property {number} [maxLength] - Maximum amount of characters allowed to be entered in the input.
 * @property {string} [initialValue=''] - The initial value of the input.
 */
export interface IUseMaxlengthInput {
  counterThreshold?: number;
  validate?: boolean;
  utf8?: boolean;
  maxLength: number;
  initialValue?: string;
  warningThreshold?: number;
}

/**
 * @typedef {Object} IUseMaxlengthReturn
 * @property {boolean} isWarning - True if the input value length reaches the threshold.
 * @property {boolean} isLimitReached - True if the input value length reaches or exceeds the max-length.
 * @property {boolean} isLimitExceeded - True if the input value length exceeds the max-length.
 * @property {number} counter - Current length of the input value.
 * @property {boolean} isShowCounter - True if the counter should be displayed.
 * @property {number} charactersLeft - How many characters are left before reaching the max-length.
 * @property {number} [maxLength] - The max-length value passed to the hook.
 * @property {function} onChange - Event handler for the input\'s onChange event.
 * @property {string} currentValue - The formatted value of the input.
 */
export interface IUseMaxlengthReturn {
  isWarning: boolean;
  isLimitReached: boolean;
  isLimitExceeded: boolean;
  counter: number;
  isShowCounter: boolean;
  charactersLeft: number;
  maxLength: number;
  onChange: (value: string) => void;
  currentValue: string;
}

/**
 * Implement and return the behaviour of an input that enforces a max-length.
 *
 * @param {IUseMaxlengthInput} param0
 * @returns {IUseMaxlengthReturn}
 */
const useMaxlength = ({
  counterThreshold = 0,
  validate = false,
  utf8 = false,
  maxLength,
  initialValue = '',
  warningThreshold = 0,
}: IUseMaxlengthInput): IUseMaxlengthReturn => {
  if (maxLength <= 0) {
    throw new Error('maxLength must be a positive number');
  }

  if (counterThreshold < 0 || counterThreshold > maxLength) {
    throw new Error('counterThreshold must be a positive number and less than maxLength');
  }

  if (warningThreshold < 0 || warningThreshold > maxLength) {
    throw new Error('warningThreshold must be a positive number and less than maxLength');
  }

  const [currentValue, setCurrentValue] = useState('');
  const [counter, setCounter] = useState(0);

  const { isLimitReached, isLimitExceeded, isWarning, isShowCounter, charactersLeft } =
    useMemo(() => {
      return {
        isLimitReached: counter >= maxLength,
        isLimitExceeded: counter > maxLength,
        isWarning: counter >= maxLength - warningThreshold,
        isShowCounter: counter >= counterThreshold,
        charactersLeft: maxLength - counter,
      };
    }, [counter, maxLength, warningThreshold, counterThreshold]);

  const onChange = useCallback(
    (inputValue: string) => {
      let newValue = inputValue;

      const length = utf8 ? encodeURI(inputValue).split(/%..|./).length - 1 : inputValue.length;

      if (validate && length > maxLength) {
        newValue = inputValue.slice(0, maxLength);
      }

      setCounter(length);
      setCurrentValue(newValue);
    },
    [utf8, validate, maxLength]
  );

  useEffect(() => {
    initialValue && onChange(initialValue);
  }, [initialValue]);

  return {
    isWarning,
    isLimitReached,
    isLimitExceeded,
    counter,
    isShowCounter,
    onChange,
    maxLength,
    charactersLeft,
    currentValue,
  };
};

export default useMaxlength;
