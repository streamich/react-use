# `useSignallingEffect`

Runs an effect with an `AbortSignal`, which is automatically aborted when the effect is cleaned up. Useful as a shorthand for common operations that require clean up or cancellation and support `AbortSignal`, like adding event listeners or fetching data.

## Usage

```jsx
import { useSignallingEffect } from 'react-use';

const Demo = () => {
  useSignallingEffect((signal) => {
    window.addEventListener('resize', () => {}, { signal });
  }, []);

  return null;
};
```

## Reference

```ts
useSignallingEffect(effect: EffectCallbackWithSignal, deps?: DependencyList);
```

Has the same signature as `useEffect`, but the effect callback receives an `AbortSignal` as an argument. The signal is guaranteed to abort before the clean-up function is called.

```js
useSignallingEffect((signal) => {
  console.log(signal.aborted); // false
  return () => console.log(signal.aborted); // true
});
```

## Examples

```js
const UserProfile = ({ userId }) => {
  const [data, setData] = useState(null);

  useSignallingEffect(
    (signal) => {
      (async () => {
        try {
          const res = await fetch(`/api/users/${userId}`, { signal });
          setData(await res.json());
        } catch (err) {
          if (!signal.aborted) {
            throw err;
          }
        }
      })();
    },
    [userId]
  );
};
```
