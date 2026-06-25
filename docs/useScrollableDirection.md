# `useScrollableDirection`

React sensor hook that returns boolean values representing whether or not the container is scrollable in the up, right, down and left directions.

## Usage

```jsx
import { useScrollableDirection } from 'react-use';

const Demo = () => {
  const scrollRef = React.useRef(null);
  const [
      [isScrollableLeft, isScrollableRight], 
      [isScrollableUp, isScrollableDown]
  ] = useScrollableDirection(scrollRef);

  return (
    <div ref={scrollRef} style={{ overflow: 'auto', width: 100, height: 100 }}>
      <div style={{ height: 500, width: 500 }}>
        <div>Left: {isScrollableLeft}</div>
        <div>Right: {isScrollableRight}</div>
        <div>Up: {isScrollableUp}</div>
        <div>Down: {isScrollableDown}</div>
      </div>
    </div>
  );
};
```

## Reference

```ts
type ScrollDirections = 'up' | 'right' | 'down' | 'left';

type ScrollDirectionBasedOptions<T> = {
  [key in ScrollDirections]?: T;
};

interface Options {
  /* Disables updates for specific direction. Use to optimize number of rerenders. */
  disabledListeners?: ScrollDirectionBasedOptions<boolean>;
  /* Adds an offset for the direction in pixels. */
  offsets?: ScrollDirectionBasedOptions<number>;
  /* The debounced rate in which the onScroll state update will be triggered */
  debounceMs?: number;
}

const [
    [left, right],
    [up, down]
] = useScrollableDirection(ref: RefObject<HTMLElement>, options?: Options);
```
