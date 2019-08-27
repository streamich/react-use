# `useDebounce`

React hook that delays invoking a function until after wait milliseconds have elapsed since the last time the debounced function was invoked.

The third argument is the array of values that the debounce depends on, in the same manner as useEffect. The debounce timeout will start when one of the values changes.

## Usage

```jsx
import React, { useState } from 'react';
import { useDebounce } from 'react-use';

const Demo = () => {
  const [state, setState] = React.useState('Typing stopped');
  const [val, setVal] = React.useState('');
  const [debouncedValue, setDebouncedValue] = React.useState('');

  const { clear, flush } = useDebounce(
    () => {
      setState('Typing stopped');
      setDebouncedValue(val);
    },
    2000,
    [val]
  );

  return (
    <div>
      <input
        type="text"
        value={val}
        placeholder="Debounced input"
        onChange={({ currentTarget }) => {
          setState('Waiting for typing to stop...');
          setVal(currentTarget.value);
        }}
      />
      <div>{state}</div>
      <div>Debounced value: {debouncedValue}</div>
      <button onClick={clear} type="button">Clear</button>
      <button onClick={flush} type="button">Flush</button>
    </div>
  );
};
```

## Reference

```ts
useDebounce(fn, ms: number, args: any[]);
```
