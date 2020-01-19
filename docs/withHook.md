# `withHook`

A higher-order component that takes in a hook and wraps a component with props provided by the hook.

## Usage

```jsx
import { withHook } from 'react-use';

const Counter = props => {
  return (
    <div>
      <div>Counter: {props.count}</div>
      <button onClick={props.increment}>Increment</button>
      <button onClick={props.decrement}>Decrement</button>
    </div>
  );
};

const useCounter = props => {
  const [count, setCount] = useState(0);

  return {
    count,
    increment: () => setCount(prev => prev + 1),
    decrement: () => setCount(prev => prev - 1),
  };
};

const Demo = withHook(useCounter)(Counter, (hookValues, props) => ({ ...hookValues }));
```

## Reference

```js
withHook(useHook)(Component, mapHookToProps);
```

- `useHook` &mdash; a `hook` whose returned values are passed as props to Component.
- `Component` &mdash; a `Component` getting wrapped by the HOC.
- `mapHookToProps` &mdash; a mapper `function` of shape `(hookValues, props) => object`
