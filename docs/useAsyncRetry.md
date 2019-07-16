# `useAsyncRetry`

Uses `useAsync` with an additional `retry` method to easily retry/refresh the async function;

## Usage

```jsx
import {useAsyncRetry} from 'react-use';

const Demo = ({url}) => {
  const state = useAsyncRetry(async () => {
    const response = await fetch(url);
    const result = await response.text();
    return result;
  }, [url]);

  return (
    <div>
      {state.loading
        ? <div>Loading...</div>
        : state.error
          ? <div>Error: {state.error.message}</div>
          : <div>Value: {state.value}</div>
      }
      {!loading && <button onClick={() => state.retry()}>Start loading</button>}
    </div>
  );
};
```

## Reference

```ts
useAsyncRetry(fn, args?: any[]);
```
