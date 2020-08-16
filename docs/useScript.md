# `useScript`

load script by hook.

## Usage

```typescript jsx
import * as React from 'react';
import { useScript } from 'react-use';

const Demo = () => {
  const { ready, failed } = useScript('https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.5.1.js', {
    onload: () => console.log('load success'),
    onerror: (...args) => console.log(args),
    id: `jquery`,
  });

  const w: Window & { $?: any } = window;
  const hasJquery = !!w.$;
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

## Reference

```typescript
const options = {
  id: `jquery`,
  type: 'text/javascript',
  async: true,
  crossOrigin: null,
  onload: () => console.log('load success'),
  onerror: (...args) => console.log(args),
  onabort: (...args) => console.log(args),
};
const { ready, failed } = useScript('https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.5.1.js', options);
```

- **`ready`**_`: boolean`_ - whether script loaded;
- **`failed`**_`: boolean`_ - whether script load failed;
- **`options`** - an optional parameter containing load script options, same as HTMLScriptElement's properties;
  - **`id`**_`: string | null`_ - The id of script tag;
  - **`type`**_`: string`_ - representing the MIME type of the script;
  - **`async`**_`: boolean = true`_ -By default, async will set to true, and the script will be executed asynchronously as soon as it downloads.;
  - **`crossOrigin`**_`: string | null`_ - For scripts from other origins, this controls if error information will be exposed;
