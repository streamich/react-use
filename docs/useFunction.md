# `useFunction`

Works like `useCallback` but doesn't require dependency list.

A returned function reference creates once and never changes.
It just updates its implementation from a taken function each render.

## Usage

```jsx
import { useFunction } from 'react-use';

const Demo = () => {
  const [value, setValue] = React.useState(0);
  const increment = useFunction(() => setValue(value + 1));

  return (
    <div>
      <div>
        current: {value}
      </div>
      <br />
      Current value: <button onClick={increment}>Increment</button>
    </div>
  );
};
```
