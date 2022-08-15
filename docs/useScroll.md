# `useScroll`

React sensor hook that re-renders when the scroll position in a DOM element changes.

## Usage

```jsx
import React from 'react';
import {useScroll} from 'react-use';

const Demo = () => {
  const scrollRef = React.useRef(null);
  const {x, y} = useScroll(scrollRef);

  return (
    <div ref={scrollRef}>
      <div>x: {x}</div>
      <div>y: {y}</div>
    </div>
  );
};
```

## Reference
<!-- eslint-skip -->
```ts
useScroll(ref: RefObject<HTMLElement>);
```
