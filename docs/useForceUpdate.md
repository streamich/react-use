# `useForceUpdate`

Allows forcing a re-render in the component, typically useful when working with a more imperative approach where too much rendering is undesirable.

## Usage

```jsx
import { useRef } from 'react';
import { useForceUpdate } from 'react-use';

let timeoutRef = 0;
let rendersCount = 0;

const Demo = () => {
  const valueRef = useRef('');
  const forceUpdate = useForceUpdate();

  const handleClick = () => {
    forceUpdate();
  };

  const handleChange = (event) => {
    clearTimeout(timeoutRef);
    valueRef.current = event.target.value;
    timeoutRef = setTimeout(() => forceUpdate(), 800);
  };

  return (
    <div>
      <h4>Number of renders: {++rendersCount}</h4>

      <button onClick={handleClick}>
        FOrce re-render
      </button>
      <p>or</p>
      <div>
        <input
          placeholder="Type a value"
          onChange={handleChange}
        />
        <p>Value after timeout of 800ms: {valueRef.current}</p>
      </div>
    </div>
  );
};
```

## API Reference

```ts
const forceUpdateFn = useForceUpdate()
```

- **`forceUpdateFn`**_`: () => void`_ &mdash; invoke component to re-render;
