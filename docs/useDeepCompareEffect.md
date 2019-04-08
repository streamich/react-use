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

## Reference

```ts
useDeepCompareEffect(effect: () => void | (() => void | undefined), deps: any[]);
```
