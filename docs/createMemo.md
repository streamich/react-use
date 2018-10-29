# `createMemo`

A factory that returns a React hook, which is memoized for each set of arguments passed to it.


## Usage

```jsx
import {createMemo} from 'react-use';

const fibonacci = n => {
  if (n === 0) return 1;
  if (n === 1) return 2;
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
