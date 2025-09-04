# `useLayoutLatestRef`

React state hook that stores the latest version of a value.

This can be used to access the latest ("fresh") value of some props or state inside an event handler or `useLayoutEffect()` without specifying the value in a dependency array.

This hook is similar to `useLatestRef()` except that it provide the latest value even when the ref is accessed in a `useLayoutEffect()`.

## Usage

```jsx
import { useLayoutLatestRef } from "react-use";

const Demo = () => {
  const [count, setCount] = React.useState(0);
  const latestCount = useLayoutLatestRef(count);

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
const latestRef = useLayoutLatestRef(someValue);
```
