# `createStateContext`

Factory for react context hooks that will behave just like [React's `useState`](https://reactjs.org/docs/hooks-reference.html#usestate) except the state will be shared among all components in the provider.

This allows you to have a shared state that any component can update easily.

## Usage

An example with a shared text between two input fields.

```jsx
import { createStateContext } from 'react-use';

const [useSharedText, SharedTextProvider] = createStateContext('');

const ComponentA = () => {
  const [text, setText] = useSharedText();
  return (
    <p>
      Component A:
      <br />
      <input type="text" value={text} onInput={ev => setText(ev.target.value)} />
    </p>
  );
};

const ComponentB = () => {
  const [text, setText] = useSharedText();
  return (
    <p>
      Component B:
      <br />
      <input type="text" value={text} onInput={ev => setText(ev.target.value)} />
    </p>
  );
};

const Demo = () => {
  return (
    <SharedTextProvider>
      <p>Those two fields share the same value.</p>
      <ComponentA />
      <ComponentB />
    </SharedTextProvider>
  );
};
```

## Reference

```jsx
const [useSharedState, SharedStateProvider] = createStateContext(initialValue);

// In wrapper
const Wrapper = ({ children }) => (
  // You can override the initial value for each Provider
  <SharedStateProvider initialValue={overrideInitialValue}>
    { children }
  </SharedStateProvider>
)

// In a component
const Component = () => {
  const [sharedState, setSharedState] = useSharedState();

  // ...
}
```
