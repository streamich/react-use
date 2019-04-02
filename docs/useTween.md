# `useTween`

React animation hook that tweens a number between 0 and 1.


## Usage

```jsx
import {useTween} from 'react-use';

const Demo = () => {
  const t = useTween();

  return (
    <div>
      Tween: {t}
    </div>
  );
};
```

## Reference

```ts
useTween(easing?: string, ms?: number, delay?: number): number
```

Returns a number that begins with 0 and ends with 1 when animation ends.

- `easing` &mdash; one of the valid [easing names](https://github.com/streamich/ts-easing/blob/master/src/index.ts), defaults to `inCirc`.
- `ms` &mdash; milliseconds for how long to keep re-rendering component, defaults to `200`.
- `delay` &mdash; delay in milliseconds after which to start re-rendering component, defaults to `0`.
