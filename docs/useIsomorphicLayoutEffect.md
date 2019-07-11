# `useIsomorphicLayoutEffect`

`useLayoutEffect` that does not show warning when server-side rendering, see [Alex Reardon's article](https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a) for more info.

## Usage

```jsx
import {useIsomorphicLayoutEffect} from 'react-use';

const Demo = ({value}) => {
  useIsomorphicLayoutEffect(() => {
    window.console.log(value)
  }, [value]);

  return null;
};
```


## Reference

```ts
useIsomorphicLayoutEffect(effect: EffectCallback, deps?: ReadonlyArray<any> | undefined);
```
