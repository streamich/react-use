# `useAsync`

React hook that resolves an `async` function or a function that returns
a promise;

## Usage

```jsx
import {useAsync} from 'react-use';

const Demo = ({delay = 1000}) => {
  const state = useAsync(() => {
    // Returns a Promise that resolves after x milliseconds
    return new Promise((resolve) => setTimeout(() => resolve('RESOLVED'), delay);
  }, [delay]);

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
