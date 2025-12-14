# `useInterpolations`

React animation hook that interpolates a map of numeric values over time.

## Usage

```jsx
import { useInterpolations } from 'react-use';

const Demo = () => {
  const values = useInterpolations({
    left: [0, 100],
    top: [0, 50],
    opacity: [0, 1]
  }, 'inCirc', 1000);

  return (
    <div
      style={{
        position: 'relative',
        left: values.left,
        top: values.top,
        opacity: values.opacity,
        width: 100,
        height: 100,
        background: 'tomato'
      }}
    />
  );
};
```

## Reference

```ts
useInterpolations<T extends Record<string, readonly [number, number]>>(
  map: T,
  easingName?: string,
  ms?: number,
  delay?: number
): { [K in keyof T]: number }
```

Returns an object with the same keys as `map`, where each value is interpolated between its `[start, end]` range.

- `map` &mdash; required, object where each value is a `[start, end]` tuple of numbers to interpolate.
- `easingName` &mdash; one of the valid [easing names](https://github.com/streamich/ts-easing/blob/master/src/index.ts), defaults to `inCirc`.
- `ms` &mdash; milliseconds for how long to keep re-rendering component, defaults to `200`.
- `delay` &mdash; delay in milliseconds after which to start re-rendering component, defaults to `0`.

