# `useStateValidator`

Each time given state changes - validator function is invoked.

## Usage
```ts 
import * as React from 'react';
import { useCallback } from 'react';
import { useStateValidator } from 'react-use';

const DemoStateValidator = s => [s === '' ? null : (s * 1) % 2 === 0];
const Demo = () => {
  const [state, setState] = React.useState<string | number>(0);
  const [[isValid]] = useStateValidator(state, DemoStateValidator);

  return (
    <div>
      <div>Below field is valid only if number is even</div>
      <input
        type="number"
        min="0"
        max="10"
        value={state}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
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
const [validity, revalidate] = useStateValidator(
  state: any,
  validator: (state, setValidity?)=>[boolean|null, ...any[]],
  initialValidity: any
);
```
- **`validity`**_`: [boolean|null, ...any[]]`_ result of validity check. First element is strictly nullable boolean, but others can contain arbitrary data;
- **`revalidate`**_`: ()=>void`_ runs validator once again
- **`validator`**_`: (state, setValidity?)=>[boolean|null, ...any[]]`_ should return an array suitable for validity state described above;
    - `state` - current state;
    - `setValidity` - if defined hook will not trigger validity change automatically. Useful for async validators;
- `initialValidity` - validity value which set when validity is nt calculated yet;
