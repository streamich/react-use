# `useAsync`

React hook that resolves an `async` function or a function that returns
a promise. 

If the function returns a value synchronously, `useAsync` will also return the value synchronously.

## Usage

```jsx
import {useAsync} from 'react-use';

const Demo = ({url}) => {
  const state = useAsync(async () => {
    const response = await fetch(url);
    const result = await response.text();
    return result
  }, [url]);

  return (
    <div>
      {state.loading
        ? <div>Loading...</div>
        : state.error
          ? <div>Error: {state.error.message}</div>
          : <div>Value: {state.value}</div>
      }
    </div>
  );
};
```

## Reference

```ts
useAsync(fn, args?: any[]);
```
