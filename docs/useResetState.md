# `useResetState`

Hooks that provide methods to reset state，resets the state to its initial value.

## Usage

```jsx
import {useResetState} from 'react-use';

const Demo = () => {
  const [state, setState, resetState] = useResetState({
    foo: '',
    count: 0
  });

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={(prev) => setState(prev => ({foo: 'bar', count: prev.count + 1}))}>set bar and count ++</button>
      <button onClick={() => resetState()}>resetState</button>
    </div>
  );
};

```


## Reference

```js
const [state, setState, resetState] = useResetState({
  foo: '',
  count: 0
});

setState(prev => ({foo: 'bar', count: prev.count + 1}));
resetState();
```