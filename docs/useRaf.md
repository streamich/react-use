# `useRaf`

React animation hook that forces component to re-render on each `requestAnimationFrame`,
returns percentage of time elapsed.


## Usage

```jsx
import {useRaf} from 'react-use';

const Demo = () => {
  const elapsed = useRaf(5000, 1000);

  return (
    <div>
      Elapsed: {elapsed}
    </div>
  );
};
```


## Reference

```ts
useRaf(ms?: number, delay?: number): number;
```

- `ms` &mdash; milliseconds for how long to keep re-rendering component, defaults to `1e12`.
- `delay` &mdash; delay in milliseconds after which to start re-rendering component, defaults to `0`.
