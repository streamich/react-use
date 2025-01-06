# `usePrevious`

React state hook that returns the previous state as described in [Adjusting some state when a prop changes](https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes).

## Usage

```jsx
import {usePrevious} from 'react-use';

const Demo = () => {
  const [count, setCount] = React.useState(0);
  const prevCount = usePrevious(count);

  return (
    <p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <p>
        Now: {count}, before: {prevCount}
      </p>
    </p>
  );
};
```

## Reference

```ts
const prevState = usePrevious = <T>(state: T): T;
```
