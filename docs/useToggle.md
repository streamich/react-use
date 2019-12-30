# `useToggle`

React state hook that tracks value of a boolean.

`useBoolean` is an alias for `useToggle`.

## Usage

```jsx
import {useToggle} from 'react-use';

const Demo = () => {
  const [on, toggle] = useToggle(true);

  return (
    <div>
      <div>{on ? 'ON' : 'OFF'}</div>
      <button onClick={toggle}>Toggle</button>
      <button onClick={() => toggle(true)}>set ON</button>
      <button onClick={() => toggle(false)}>set OFF</button>
    </div>
  );
};
```
