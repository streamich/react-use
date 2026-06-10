# `useCustomCompareMemo`

A modified useMemo hook that accepts a comparator which is used for comparison on dependencies instead of reference equality.

## Usage

```jsx
import {useCounter, useCustomCompareMemo} from 'react-use';
import isEqual from 'lodash/isEqual';

const Demo = () => {
  const [count, {inc: inc}] = useCounter(0);
  const options = { step: 2 };

  const countRet = useCustomCompareMemo(() => {
    inc(options.step);
    return count;
  }, [options], (prevDeps, nextDeps) => isEqual(prevDeps, nextDeps));

  return (
    <div>
      <p>useCustomCompareMemo with deep comparison: {countRet}</p>
    </div>
  );
};
```

## Reference

```ts
useCustomCompareMemo(factory: () => any, deps: any[], depsEqual: (prevDeps: any[], nextDeps: any[]) => boolean);
```
