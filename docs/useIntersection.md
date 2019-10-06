# `useIntersection`

React sensor hook that tracks the changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.

## Usage

```jsx
import * as React from 'react';
import { useIntersection } from 'react-use';

const Demo = () => {
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1
  });

  return (
    <div ref={intersectionRef}>
      {intersection && intersection.intersectionRatio < 1
        ? 'Obscured'
        : 'Fully in view'}
    </div>
  );
};
```

## Reference

```ts
useIntersection(
  ref: RefObject<HTMLElement>,
  options: IntersectionObserverInit,
): IntersectionObserverEntry | null;
```
