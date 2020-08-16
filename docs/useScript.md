# `useScript`

load script by hook.

## Usage

```typescript jsx
import * as React from 'react';
import { useScript } from "react-use";  

const Demo = () => {
  const { ready, failed } = useScript('https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.5.1.js', {
    onload: () => console.log('load success'),
    onerror: (...args) => console.log(args),
    id: `jquery`
  })

  const w: Window & { $?: any } = window;
  const hasJquery = !!(w.$);
  return (
    <div>
      <span>sript ready: {ready.toString()}</span>
      <br />
      <span>script load failed: {failed.toString()}</span>
      <br />
      <span>juqery $ mounted: {hasJquery.toString()}</span>
    </div>
  );
};
```
