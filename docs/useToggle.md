# `useToggle`

React state hook that tracks value of a boolean.


## Usage

```jsx
import {useToggle} from 'react-use';

const Demo = () => {
  const [on, toggle, set] = useToggle(true);

  return (
    <div>
      <div>{on ? 'ON' : 'OFF'}</div>
      <button onClick={toggle}>Toggle</button>
      <button onClick={() => set(true)}>set ON</button>
      <button onClick={() => set(false)}>set OFF</button>
    </div>
  );
};
```
