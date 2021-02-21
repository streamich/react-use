# `useAsyncPolling`

A specialized `useAsync` to continue retrying until a certain condition is met. Typically used when a backend is eventually consistent and exposes an endpoint to verify the status of a process.

It passes a `next` function to the callback that is supposed to be called when polling must continue. For the polling to finish you simply return the value (and then `value` will be set) or throw (and then `error` will be set). You can also pass a value to `next` in order to have it as part of the state (`currentResult`) in case you want to show the user what is going on (see below).

It extends the regular `useAsync` state (`loading`, `error` and `value`) by adding:

- `attempt`: The current attempt number (starting with 1).
- `currentResult`: The last result passed to the next function.
- `results`: The full list of previous results passed to the next function.

It also accepts 2 options, `interval` and `maxAttempts`.

- The `interval` can be a number or a function that will receive the current attempt number and return a number in milliseconds. This number will be used to sleep between the attempts. Default 2000.

- The `maxAttempts` sets the limit of attempts, and if reached will throw the `MaxAttemptsError` (that is, this will become the `error`). Default 30.

## Usage

```jsx
import { useAsyncPolling } from 'react-use';

const Demo = () => {
  const state = usePolling({}, async (next) => {
    const response = await fetch('/status');
    const { status } = await response.json();
    
    // in this case, receiving 'waiting' is meant to continue polling,
    // any other result will resolve
    return status === 'waiting' ? next(status) : status
  }, [url]);

  return (
    <div>
      {state.loading
        ? <div>Waiting for status... 
            Attempt {state.attempt}
            Current result {state.currentResult}
            Previous results {JSON.stringify(state.results)} .</div>
        : state.error
          ? <div>Error: {state.error.message}</div>
          : <div>Status: {state.value}</div>
      }
    </div>
  );
};
```

Setting an interval and max attempts:

```js
  const state = usePolling({ interval: 5000, maxAttempts: 5 }, async (next) => {
    const response = await fetch('/status');
    const { status } = await response.json();
    
    return status === 'waiting' ? next(status) : status
  }, [url]);
```

Setting an increasing interval, in this case it will increase from 1 second to 10 seconds, taking a total time of around 55s (plus latency, execution time, etc):

```js
  const state = usePolling({ interval: (attempt => attempt * 1000), maxAttempts: 10 }, async (next) => {
    const response = await fetch('/status');
    const { status } = await response.json();
    
    return status === 'waiting' ? next(status) : status
  }, [url]);
```

Stopping if it's not possible to continue given a certain condition:

```js
  const state = usePolling({}, async (next) => {
    const response = await fetch('/status');
    const { status, reason } = await response.json();
    
    switch(status) {
      case 'done':
        return status
      case 'failed':
        throw new Error(reason)
      default:
        next(status)
    }
  }, [url]);
```