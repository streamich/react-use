# `createReducerContext`

Factory for react context hooks that will behave just like [React's `useReducer`](https://reactjs.org/docs/hooks-reference.html#usereducer) except the state will be shared among all components in the provider.

This allows you to have a shared state that any component can update easily.

## Usage

An example with two counters that shared the same value.

```jsx
import { createReducerContext } from 'react-use';

type Action = 'increment' | 'decrement';

const reducer = (state: number, action: Action) => {
  switch (action) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      throw new Error();
  }
};

const [useSharedCounter, SharedCounterProvider] = createReducerContext(reducer, 0);

const ComponentA = () => {
  const [count, dispatch] = useSharedCounter();
  return (
    <p>
      Component A &nbsp;
      <button type="button" onClick={() => dispatch('decrement')}>
        -
      </button>
      &nbsp;{count}&nbsp;
      <button type="button" onClick={() => dispatch('increment')}>
        +
      </button>
    </p>
  );
};

const ComponentB = () => {
  const [count, dispatch] = useSharedCounter();
  return (
    <p>
      Component B &nbsp;
      <button type="button" onClick={() => dispatch('decrement')}>
        -
      </button>
      &nbsp;{count}&nbsp;
      <button type="button" onClick={() => dispatch('increment')}>
        +
      </button>
    </p>
  );
};

const Demo = () => {
  return (
    <SharedCounterProvider>
      <p>Those two counters share the same value.</p>
      <ComponentA />
      <ComponentB />
    </SharedCounterProvider>
  );
};
```

## Reference

```jsx
const [useSharedState, SharedStateProvider] = createReducerContext(reducer, initialState);

// In wrapper
const Wrapper = ({ children }) => (
  // You can override the initial state for each Provider
  <SharedStateProvider initialState={overrideInitialState}>
    { children }
  </SharedStateProvider>
)

// In a component
const Component = () => {
  const [sharedState, dispatch] = useSharedState();

  // ...
}
```
