# `useMaxlength`

Custom React Hook to handle the max-length property of an input or textarea or any other use case where a max-length is needed. This hook provides additional features such as a threshold for warnings and UTF-8 support.

## Usage

```jsx
import { useMaxlength } from 'react-use';

const Demo = () => {
  const { currentValue, onChange } = useMaxlength({
    maxLength: 10,
    counterThreshold: 5,
    utf8: true,
    validate: true,
    warningThreshold: 2,
    initialValue: 'Hello'
  });

  return (
    <input 
      value={currentValue}
      onChange={(event) => onChange(event.target.value)}
      maxLength={10}
    />
  );
};
```

# Parameter Details

The hook `useMaxlength` takes an object which can contain following properties;

## counterThreshold

Optional. A number. How many remaining characters trigger the counter. Default is 0.

## warningThreshold

Optional. A number. How many remaining characters trigger the warning state. The value must be lower than the counterThreshold and the maxLength. If not set, the warning state is never triggered. Default is 0.

## validate

Optional. A boolean. If true, prevent more characters than max-length when not supported by the browser. Default is false.

## utf8

Optional. A boolean. If true, count characters by byte-size rather than length (eg: £ is counted as two characters). Default is false.

## maxLength

Required. A number. Maximum amount of characters allowed to be entered in the input.

## initialValue

Optional. A string. The initial value of the input. Default is ''.

# Returns

The hook `useMaxlength` returns an object with the following properties;

## isWarning

A boolean. True if the input value length reaches the warning threshold.

## isLimitReached

A boolean. True if the input value length reaches or exceeds the max-length.

## isLimitExceeded

A boolean. True if the input value length exceeds the max-length.

## counter

A number. Current length of the input value.

## isShowCounter

A boolean. True if the count should be displayed.

## charactersLeft

A number. How many characters are left before reaching the max-length.

## maxLength

The max-length value passed to the hook.

## currentValue

The formatted value of the input.

## onChange

A function. Event handler for the input's onChange event. It should be passed to the input field as onChange handler.
