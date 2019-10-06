# `useMap`

React state hook that tracks a value of an object.


## Usage

```jsx
import {useMap} from 'react-use';

const Demo = () => {
  const [map, {set, remove, reset}] = useMap({
    hello: 'there',
  });

  return (
    <div>
      <pre>{JSON.stringify(map, null, 2)}</pre>
      <button onClick={() => set(String(Date.now()), new Date().toJSON())}>
        Add
      </button>
      <button onClick={() => reset()}>Reset</button>
      <button onClick={() => remove("hello")}>Remove key 'hello'</button>
    </div>
  );
};
```
