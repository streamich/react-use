# `useStateList`

React state hook that circularly iterates over an array.

## Usage

```jsx
import { useStateList } from 'react-use';

const stateSet = ['first', 'second', 'third', 'fourth', 'fifth'];

const Demo = () => {
  const {state, prev, next} = useStateList(stateSet);

  return (
    <div>
      <pre>{state}</pre>
      <button onClick={() => prev()}>prev</button>
      <button onClick={() => next()}>next</button>
    </div>
  );
};
```

> If the `stateSet` is changed by a shorter one the hook will select the last element of it.
