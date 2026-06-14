# `combineRefs`

A utility to combine two refs together, particularly useful when you have hooks that provide refs to you, but you want to target the same DOM element

## Usage

```jsx
import { useMeasure, useScroll, combineRefs } from "react-use";

const Demo = () => {
  const scrollRef = React.useRef(null);
  const { x, y } = useScroll(scrollRef);

  const [measureRef, { width }] = useMeasure();

  const ref = combineRefs(scrollRef, measureRef)

  return (
    <div ref={ref}>
      <div>x: {x}</div>	
      <div>y: {y}</div>
      <div>width: {width}</div>
    </div>
  );
};
```