# `useSet`

React state hook that tracks a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set).

## Usage

What is the difference between the "clear()" method and the "reset()" method?

The "reset()" method returns the "Set" to the initial value passed during "useSet
The "clear()" method completely empties the "Set".

```jsx
import {useSet} from 'react-use';

const Demo = () => {
  const [set, { add, has, remove, toggle, reset, clear }] = useSet(new Set(['hello']));

  return (
    <div>
      <button onClick={() => add(String(Date.now()))}>Add</button>
      <button onClick={() => reset()}>Reset</button>
      <button onClick={() => clear()}>Clear</button>
      <button onClick={() => remove('hello')} disabled={!has('hello')}>
        Remove 'hello'
      </button>
      <button onClick={() => toggle('hello')}>Toggle hello</button>
      <pre>{JSON.stringify(Array.from(set), null, 2)}</pre>
    </div>
  );
};
```
