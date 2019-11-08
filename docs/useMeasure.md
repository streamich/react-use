# `useMeasure`

React sensor hook that tracks dimensions of an HTML element using the [Resize Observer API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

## Usage

```jsx
import { useMeasure } from "react-use";

const Demo = () => {
  const [ref, { width, height, top, right, bottom, left }] = useMeasure();

  return (
    <div ref={ref}>
      <div>width: {width}</div>
      <div>height: {height}</div>
      <div>top: {top}</div>
      <div>right: {right}</div>
      <div>bottom: {bottom}</div>
      <div>left: {left}</div>
    </div>
  );
};
```

## Related hooks

- [useSize](./useSize.md)
