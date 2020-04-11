# `useValue`

Works like `useRef` but keeps latest taken value.

```jsx
const ref = useValue(value)
```

is the same as

```jsx
const ref = useRef(value);
ref.current = value;
```

## Usage

```jsx
import { useValue } from 'react-use';

const Demo = () => {
  const [value, setValue] = React.useState(0);
  const valueRef = useValue(value);
  const increment = useCallback(() => setValue(valueRef.current + 1), []);

  return (
    <div>
      <div>
        current: {valueRef.current}
      </div>
      <br />
      Current value: <button onClick={increment}>Increment</button>
    </div>
  );
};
```
