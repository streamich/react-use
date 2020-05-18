# `useRendersCount`

Tracks component's renders count including the first render.

## Usage

```typescript jsx
import * as React from 'react';
import { useRendersCount } from "react-use";  

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

```typescript
const rendersCount: number = useRendersCount();
```
