# `useCallbackState`

React state hook that allow us to bring callback function in state setter, which can do some stuff base on the new state value, make asynchronous behavior with react state easier.


## Usage

```jsx
import { useCallbackState } from 'react-use';

const Demo = () => {
  const [count, setCount] = useCallbackState(0);

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1, (newCount) => console.log(newCount))}>+</button>
      <button onClick={() => setCount(count - 1, (newCount) => console.log(newCount))}>-</button>
      <button 
        onClick={() => {
          // another format
          setCount((prevCount) => {
            return prevCount + 1
          }, (newCount) => console.log(newCount))
        }}
      >
        + (Another Format)
      </button>
    </div>
  );
};
```
