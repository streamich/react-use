# `useDeepCompareMemo`

A modified useMemo hook that is using deep comparison on its dependencies instead of reference equality.

## Usage

```jsx
import {useCounter, useDeepCompareMemo} from 'react-use';

const Demo = () => {
  const [count, {inc: inc}] = useCounter(0);
  const options = { step: 2 };

  const countRet = useDeepCompareMemo(() => {
    inc(options.step);
    return count;
  }, [options]);

  return (
    <div>
      <p>useDeepCompareMemo with deep comparison: {countRet}</p>
    </div>
  );
};
```

## Reference

```ts
useDeepCompareMemo(factory: () => any, deps: any[]);
```
