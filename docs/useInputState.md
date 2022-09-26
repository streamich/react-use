# `useInputState`

React state hook that saves the effort of manually mapping the event target value.

## Usage

```jsx
import {useInputState} from 'react-use';

const Demo = () => {
  const [name, setName] = useInputState("");
  return (
    <label>
      Name
      <input value={name} onChange={setName} />;
    </label>
  );
};
```


## Reference

```js
useInputState(initialState);
```

- `initialState` &mdash; initial value set for input element &mdash;
