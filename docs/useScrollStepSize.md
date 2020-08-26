# `useScrollStepSize`

React sensor hook that will scroll a DOM element based on the given height.

In case hook has called before the DOM is ready, it will return the default scroll value and it's dispatcher and will cause re-render on first available RAF.
> _NOTE:_ The height should not be less than zero.

> **_NOTE:_** DOM element height must be divided by item height.

## Usage

```jsx
import { useScrollStepSize } from 'react-use';

const Demo = () => {
  const scrollRef = React.useRef(null);
  const scrollStepSize = 40;

  const [scrollTop, setScrollTop] = useScrollStepSize(scrollRef, scrollStepSize);

  return (
    <div ref={scrollRef}>
      <div> Item 1 </div>
      <div> Item 2 </div>
      <div> Item 3 </div>
      ...
    </div>
  );
};
```

## Reference

```ts
useScrollStepSize(ref: RefObject<HTMLElement>, scrollStepSize: number = 0);
```
