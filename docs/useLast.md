# `useLast`

Like `usePrevious` but uses the last value where the predicate returned true.

## Usage

```jsx
import {useLast} from 'react-use';

const notZero = num => num !== 0;

const Demo = () => {
  const [count, setCount] = React.useState(1);
  const lastNonZeroCount = useLast(count, notZero);

  return (
    <p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <p>
        Now: {count}, last non-zero: {lastNonZeroCount}
      </p>
    </p>
  );
};
```

## Reference

```ts
const lastState = useLast = <T>(state: T, predicate(state: T) => boolean): T;
```
