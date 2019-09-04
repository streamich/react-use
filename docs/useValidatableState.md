# `useValidatableState`

Very similar to React's `useState` hook, but extended with validation functionality.  
Each time state changes validator invoked and it's result stored to separate state.

## Usage
```ts 
import * as React from 'react';
import { useCallback } from 'react';
import { useValidatableState } from 'react-use';

const Demo = () => {
  const validator = useCallback(s => [s === '' ? null : (s * 1) % 2 === 0], []);
  const [state, setState, [isValid]] = useValidatableState<string>(validator, '');

  return (
    <div>
      <div>Below field is valid only if number is even</div>
      <input
        type="number"
        min="0"
        max="10"
        value={state}
        onChange={ev => {
          setState(ev.target.value);
        }}
      />
      {isValid !== null && <span>{isValid ? 'Valid!' : 'Invalid'}</span>}
    </div>
  );
};
```

## Reference
```ts 
const [state, setState, validity, revalidate] = useValidatableState(
    validator: (state, prev, setValidity?)=>[boolean|null, ...any[]],
    initialState: any
);
```
- `state` and `setState` are the same with React's `useState` hook;
- **`validity`**_`: [boolean|null, ...any[]]`_ result of validity check. First element is strictly nullable boolean, but others can contain arbitrary data;
- **`revalidate`**_`: ()=>void`_ runs validator once again
- **`validator`** should return an array suitable for validity state described above;
    - `state` - current state;
    - `prev` - previous state;
    - `setValidity` - if defined hook will not trigger validity change automatically. Useful for async validators;
- `initialState` same with `useState` hook;
