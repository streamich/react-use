# `useCounter`

React state hook that tracks a numeric value.

`useNumber` is an alias for `useCounter`.


## Usage

```jsx
import {useCounter} from 'react-use';

const Demo = () => {
  const [value, inc, set] = useCounter();

  return (
    <div>
      <div>{value}</div>
      <button onClick={() => inc()}>Increment</button>
      <button onClick={() => set(100)}>Set 100</button>
    </div>
  );
};
```
