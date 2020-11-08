# `useScrollStepSize`

React sensor hook that will scroll a DOM element based on the given/dynamic height.

In case hook has called before the DOM is ready, it will return the default scroll value (0) and it's dispatcher. It will cause re-render on first available RAF.

If no height is provided, it will scroll using the children's height.

_NOTE:_ The height should not be less than zero.

## Usage - Fixed Height

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

## Usage - Dynamic Height

```jsx
import { useScrollStepSize } from 'react-use';

const Demo = () => {
  const scrollRef = React.useRef(null);

  const [scrollTop, setScrollTop] = useScrollStepSize(scrollRef);

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
