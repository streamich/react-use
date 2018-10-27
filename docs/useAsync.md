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
  const {loading, value, error} = useAsync(fn);

  return (
    <div>
      {loading
        ? <div>Loading...</div>
        : <div>Value: {value}</div>
      }
    </div>
  );
};
```
