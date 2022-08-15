# `useFirstMountState`

Returns `true` if component is just mounted (on first render) and `false` otherwise.

## Usage

```jsx
import {useFirstMountState, useUpdate} from 'react-use';

const Demo = () => {
  const isFirstMount = useFirstMountState();
  const update = useUpdate();

  return (
    <div>
      <span>This component is just mounted: {isFirstMount ? 'YES' : 'NO'}</span>
      <br />
      <button onClick={update}>re-render</button>
    </div>
  );
};
```

## Reference

```ts
const isFirstMount: boolean = useFirstMountState();
```
