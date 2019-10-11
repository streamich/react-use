# `useList`

React state hook that tracks a value of an array.

## Usage

```jsx
import {useList} from 'react-use';

const Demo = () => {
  const [list, { clear, filter, push, remove, set, sort, updateAt, reset }] = useList();

  return (
    <div>
      <button onClick={() => set([1, 2, 3])}>Set to [1, 2, 3]</button>
      <button onClick={() => push(Date.now())}>Push timestamp</button>
      <button onClick={() => updateAt(1, Date.now())}>Update value at index 1</button>
      <button onClick={() => remove(1)}>Remove element at index 1</button>
      <button onClick={() => filter(item => item % 2 === 0)}>Filter even values</button>
      <button onClick={() => sort((a, b) => a - b)}>Sort ascending</button>
      <button onClick={() => sort((a, b) => b - a)}>Sort descending</button>
      <button onClick={clear}>Clear</button>
      <button onClick={reset}>Reset</button>
      <pre>{JSON.stringify(list, null, 2)}</pre>
    </div>
  );
};
```

## Related hooks

- [useUpsert](./useUpsert.md)
