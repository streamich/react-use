# `useMultiStateValidator`

Each time any of given states changes - validator function is invoked.  

## Usage
```ts 
import * as React from 'react';
import { useMultiStateValidator } from 'react-use';

const DemoStateValidator = (s: number[]) => [s.every((num: number) => !(num % 2))] as [boolean];
const Demo = () => {
  const [state1, setState1] = React.useState<number>(1);
  const [state2, setState2] = React.useState<number>(1);
  const [state3, setState3] = React.useState<number>(1);
  const [[isValid]] = useMultiStateValidator([state1, state2, state3], DemoStateValidator);

  return (
    <div>
      <div>Below fields will be valid if all of them is even</div>
      <input type="number" min="1" max="10" value={state1}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
          setState1((ev.target.value as unknown) as number);
        }}
      />
      <input type="number" min="1" max="10" value={state2}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
          setState2((ev.target.value as unknown) as number);
        }}
      />
      <input type="number" min="1" max="10" value={state3}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
          setState3((ev.target.value as unknown) as number);
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
  state: any[] | { [p: string]: any } | { [p: number]: any },
  validator: (state, setValidity?)=>[boolean|null, ...any[]],
  initialValidity: any = [undefined]
);
```
- **`state`**_`: any[] | { [p: string]: any } | { [p: number]: any }`_ can be both an array or object. It's _values_ will be used as a deps for inner `useEffect`.
- **`validity`**_`: [boolean|null, ...any[]]`_ result of validity check. First element is strictly nullable boolean, but others can contain arbitrary data;
- **`revalidate`**_`: ()=>void`_ runs validator once again
- **`validator`**_`: (state, setValidity?)=>[boolean|null, ...any[]]`_ should return an array suitable for validity state described above;
    - `states` - current states values as they've been passed to the hook;
    - `setValidity` - if defined hook will not trigger validity change automatically. Useful for async validators;
- `initialValidity` - validity value which set when validity is nt calculated yet;
