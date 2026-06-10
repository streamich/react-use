# `useLatestRef`

React state hook that stores the latest version of a value.

This can be used to access the latest ("fresh") value of some props or state inside an event handler or `useEffect()` without specifying the value in a dependency array.

Since this hook updates the ref with a `useEffect()`, the ref value may be outdated ("stale") when accessed in a `useLayoutEffect()` or during rendering. If you need to access the latest value in a `useLayoutEffect()`, use `useLayoutLatestRef()` instead. Do not access the ref value during rendering as it is [considered a bad practice](https://react.dev/learn/referencing-values-with-refs#best-practices-for-refs).

This is similar to `useLatest()` but safe from the concurrency issues that `useLatest()` may suffer from. For more information, see "Pitfall" section of [React `useRef()` docs](https://react.dev/reference/react/useRef).

## Usage

```jsx
import { useLatestRef } from "react-use";

const Demo = () => {
  const [count, setCount] = React.useState(0);
  const latestCount = useLatestRef(count);

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
const latestRef = useLatestRef(someValue);
```
