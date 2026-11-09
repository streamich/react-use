# `useScrolling`

React sensor hook that keeps track of whether the user is scrolling or not.

The value returns to `false` 150ms after the last scroll event. Pending timeouts and
the scroll listener are cleaned up when the component unmounts or the ref object changes.

## Usage

```jsx
import { useScrolling } from "react-use";

const Demo = () => {
  const scrollRef = React.useRef(null);
  const scrolling = useScrolling(scrollRef);

  return (
    <div ref={scrollRef}>
      {<div>{scrolling ? "Scrolling" : "Not scrolling"}</div>}
    </div>
  );
};
```

## Reference

```ts
useScrolling(ref: RefObject<HTMLElement>);
```
