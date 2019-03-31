# `useAsyncRetry`

Uses `useAsync` with an additional `retry` method to easily retry/refresh the async function;


## Usage

```jsx
import {useAsyncRetry} from 'react-use';

// Returns a Promise that resolves after one second.
const fn = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      reject(new Error('Random error!'));
    } else {
      resolve('RESOLVED');
    }
  }, 1000);
});

const Demo = () => {
  const state = useAsyncRetry(fn);

  return (
    <div>
      {state.loading?
        <div>Loading...</div>
        : state.error?
        <div>Error...</div>
        : <div>Value: {state.value}</div>
      }
      {!state.loading?
        <a href='javascript:void 0' onClick={() => state.retry()}>Retry</a>
        : null
      }
    </div>
  );
};
```


## Reference

```ts
useAsyncRetry(fn, args?: any[]);
```
