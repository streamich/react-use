# `useRendersCount`

Tracks component's renders count including the first render.

## Usage

```jsx
import {useRendersCount, useUpdate} from 'react-use';

const Demo = () => {
  const update = useUpdate();
  const rendersCount = useRendersCount();

  return (
    <div>
      <span>Renders count: {rendersCount}</span>
      <br />
      <button onClick={update}>re-render</button>
    </div>
  );
};
```

## Reference
<!-- eslint-skip -->
```ts
const rendersCount: number = useRendersCount();
```
