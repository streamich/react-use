# `withHook`

A higher-order component that takes in a hook and wraps a component with props provided by the hook.

## Usage

```jsx
const Counter = props => {
  return (
    <div>
      <div>Started At: {props.startAt}</div>
      <div>Counter: {props.count}</div>
      <button onClick={props.increment}>Increment</button>
      <button onClick={props.decrement}>Decrement</button>
    </div>
  );
};

const useCounter = props => {
  const [count, setCount] = useState(props.startAt);

  return {
    count,
    increment: () => setCount(prev => prev + 1),
    decrement: () => setCount(prev => prev - 1),
  };
};

const Demo = withHook(Counter, useCounter);
```

## Reference

```js
withHook(Component, useHook);
```

- `Component` &mdash; a `Component` getting wrapped by the HOC.
- `useHook` &mdash; a `hook` whose returned values are passed as props to Component.
