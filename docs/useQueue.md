# `useQueue`

React state hook implements simple FIFO queue.


## Usage

```jsx
import { useQueue } from 'react-use';

const Demo = () => {
  const { add, remove, first, last, size } = useQueue();

  return (
    <div>
      <ul>
        <li>first: {first}</li>
        <li>last: {last}</li>
        <li>size: {size}</li>
      </ul>
      <button onClick={() => add((last || 0) + 1)}>Add</button>
      <button onClick={() => remove()}>Remove</button>
    </div>
  );
};
```
