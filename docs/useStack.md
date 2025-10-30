### useStack

React hook implementing stack (LIFO) behavior.

```tsx
import { useStack } from 'react-use';

const Demo = () => {
  const [stack, { push, pop, peek, clear, reset, size }] = useStack([1, 2]);

  return (
    <div>
      <ul>
        <li>Stack: {JSON.stringify(stack)}</li>
        <li>Top: {peek()}</li>
        <li>Size: {size()}</li>
      </ul>

      <button onClick={() => push((peek() || 0) + 1)}>Push</button>
      <button onClick={() => pop()}>Pop</button>
      <button onClick={() => clear()}>Clear</button>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
};

