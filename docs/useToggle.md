# `useToggle`

React state-hook that tracks value of a boolean.


## Usage

```jsx
import {useToggle} from 'react-use';

const MyComponent = () => {
  const [on, toggle, set] = useToggle(true);

  return (
    <div>
      <div>{on ? 'ON' : 'OFF'}</div>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
};
```
