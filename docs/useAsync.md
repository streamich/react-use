# `useAsync`

React hook that resolves an `async` function or a function that returns
a promise;


## Usage

```jsx
import {useAsync} from 'react-use';

// Returns a Promise that resolves after one second.
const fn = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve('RESOLVED');
  }, 1000);
});

const Demo = () => {
  const state = useAsync(fn);

  return (
    <div>
      {state.loading?
        <div>Loading...</div>
        : state.error?
        <div>Error...</div>
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
