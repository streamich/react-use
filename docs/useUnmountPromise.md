# `useUnmountPromise`

A life-cycle hook that provides a higher order promise that does not resolve if component un-mounts.


## Usage 

```ts
import useUnmountPromise from 'react-use/lib/useUnmountPromise';

const Demo = () => {
  const mounted = useUnmountPromise();
  useEffect(async () => {
    await mounted(someFunction()); // Will not resolve if component un-mounts.
  });
};
```


## Reference

```ts
const mounted = useUnmountPromise();

mounted(promise);
mounted(promise, onError);
```

- `onError` &mdash; if promise rejects after the component is unmounted, `onError`
  callback is called with the error.
