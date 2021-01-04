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

## eslint-plugin-react-hooks

If your project uses the `react-hooks/exhaustive-deps` ESLint rule, it's recommended to add `useIsomorphicLayoutEffect` to the `additionalHooks` of the rule. Example:

```js
  rules: {
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useIsomorphicLayoutEffect)'
      }
    ]
  }
