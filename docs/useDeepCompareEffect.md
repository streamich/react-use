# `useDeepCompareEffect`

A modified useEffect hook that is using deep comparison on its dependencies instead of reference equality.

## Usage

```jsx
import {useCounter, useDeepCompareEffect} from 'react-use';

const Demo = () => {
  const [count, {inc: inc}] = useCounter(0);
  const options = { step: 2 };

  useDeepCompareEffect(() => {
    inc(options.step)
  }, [options]);

  return (
    <div>
      <p>useDeepCompareEffect: {count}</p>
    </div>
  );
};
```

## When to Use

This hook is handy when:
- Your dependencies might be `undefined` or an object (common with optional props/config)
- You need to compare objects by their values, not just references
- You're mixing primitives and objects in your dependency array

Works fine with any dependency types - primitives, objects, or a mix of both.

## Reference

```ts
useDeepCompareEffect(effect: () => void | (() => void | undefined), deps: any[]);
```
