# `useMap`

React state hook that tracks a value of an object.

## Usage

```jsx
import {useMap} from 'react-use';

const Demo = () => {
  const [map, {set, setAll, remove, reset}] = useMap({
    hello: 'there',
  });

  return (
    <div>
      <button onClick={() => set(String(Date.now()), new Date().toJSON())}>
        Add
      </button>
      <button onClick={() => reset()}>
        Reset
      </button>
      <button onClick={() => setAll({ hello: 'new', data: 'data' })}>
        Set new data
      </button>
      <button onClick={() => remove('hello')} disabled={!map.hello}>
        Remove 'hello'
      </button>
      <pre>{JSON.stringify(map, null, 2)}</pre>
    </div>
  );
};
```
