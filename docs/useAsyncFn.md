# `useAsyncFn`

React hook that returns state and a callback for an `async` function or a
function that returns a promise. The state is of the same shape as `useAsync`.

## Usage

```jsx
import {useAsyncFn} from 'react-use';

const Demo = ({url}) => {
  const [state, doFetch] = useAsyncFn(async (page: string) => {
    const response = await fetch(`${url}?p=${page}`);
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
      <button onClick={() => doFetch("1")}>Start loading</button>
    </div>
  );
};
```

## Reference

```ts
useAsyncFn<Result, Args>(fn, deps?: any[], initialState?: AsyncState<Result>);
```
