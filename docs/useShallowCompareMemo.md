# `useShallowCompareMemo`

A modified useMemo hook that is using shallow comparison on each of its dependencies instead of reference equality.

## Usage

```jsx
import {useCounter, useShallowCompareMemo} from 'react-use';

const Demo = () => {
  const [count, {inc: inc}] = useCounter(0);
  const options = { step: 2 };

  const countRet = useShallowCompareMemo(() => {
    inc(options.step);
    return count;
  }, [options]);

  return (
    <div>
      <p>useShallowCompareMemo: {countRet}</p>
    </div>
  );
};
```

## Reference

```ts
useShallowCompareMemo(factory: () => any, deps: any[]);
```
