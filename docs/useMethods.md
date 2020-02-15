# `useMethods`

React hook that simplifies the `useReducer` implementation.

## Usage

```jsx
import { useMethods } from 'react-use';

const initialState = {
  count: 0,
};

function createMethods(state) {
  return {
    reset() {
      return initialState;
    },
    increment() {
      return { ...state, count: state.count + 1 };
    },
    decrement() {
      return { ...state, count: state.count - 1 };
    },
  };
}

const Demo = () => {
  const [state, methods] = useMethods(createMethods, initialState);

  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={methods.decrement}>-</button>
      <button onClick={methods.increment}>+</button>
    </>
  );
};
```

## Reference

```js
const [state, methods] = useMethods(createMethods, initialState);
```

- `createMethods` &mdash; function that takes current state and return an object containing methods that return updated state.
- `initialState` &mdash; initial value of the state.
