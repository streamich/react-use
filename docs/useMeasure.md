# `useMeasure`

React sensor hook that reacts to changes in size of any of the observed elements.

## Usage

```jsx
import { useMeasure } from "react-use";

const Demo = () => {
  const [ref, { width, height }] = useMeasure();

  return (
    <div ref={ref}>
      <div>width: {width}</div>
      <div>height: {height}</div>
    </div>
  );
};
```

## Related hooks

- [useSize](./useSize.md)