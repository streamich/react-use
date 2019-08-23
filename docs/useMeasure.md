# `useSize`

React sensor hook that tracks size of an HTML element.

## Usage

```jsx
import { useMeasure } from "react-use";

const Demo = () => {
  const [ref, { width, height }] = useSize();

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