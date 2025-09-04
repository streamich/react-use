# `useLatest`

React state hook that returns the latest state as described in the [React hooks FAQ](https://reactjs.org/docs/hooks-faq.html#why-am-i-seeing-stale-props-or-state-inside-my-function).

This is mostly useful to get access to the latest value of some props or state inside an asynchronous callback, instead of that value at the time the callback was created from.

Note: This hook updates the ref value during rendering, and is therefore potentially unsafe. Use `useLatestRef()` if you want to safely access the latest value. For more information, see "Pitfall" section of [React `useRef()` docs](https://react.dev/reference/react/useRef).

## Usage

```jsx
import { useLatest } from 'react-use';

const Demo = () => {
  const [count, setCount] = React.useState(0);
  const latestCount = useLatest(count);

  function handleAlertClick() {
    setTimeout(() => {
      alert(`Latest count value: ${latestCount.current}`);
    }, 3000);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={handleAlertClick}>Show alert</button>
    </div>
  );
};
```

## Reference

```ts
const latestState = useLatest = <T>(state: T): MutableRefObject<T>;
```
