# `createMemo`

Hook factory, receives a function to be memoized, returns a memoized React hook,
which receives the same arguments and returns the same result as the original function.


## Usage

```jsx
import {createMemo} from 'react-use';

const fibonacci = n => {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

const useMemoFibonacci = createMemo(fibonacci);

const Demo = () => {
  const result = useMemoFibonacci(10);

  return (
    <div>
      fib(10) = {result}
    </div>
  );
};
```


## Reference

```js
const useMemoFn = createMemo(fn);
```
