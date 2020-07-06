# `useHash`

React sensor hook that tracks browser's location hash.

## Usage

```jsx
import {useHash} from 'react-use';

const Demo = () => {
  const [hash, setHash] = useHash();

  useMount(() => {
    setHash('#/path/to/page?userId=123');
  });

  return (
    <div>
      <div>window.location.href:</div>
      <div>
        <pre>{window.location.href}</pre>
      </div>
      <div>Edit hash: </div>
      <div>
        <input style={{ width: '100%' }} value={hash} onChange={e => setHash(e.target.value)} />
      </div>
    </div>
  );
};
```

## API

`const [hash, setHash] = useHash()`

Get latest url hash with `hash` and set url hash with `setHash`.

- `hash: string`: get current url hash. listen to `hashchange` event.
- `setHash: (newHash: string) => void`: change url hash. Invoke this method will trigger `hashchange` event.