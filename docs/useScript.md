# `useScript`

load script by hook.

## Usage

```typescript jsx
import * as React from 'react';
import { useScript } from 'react-use';

const Demo = () => {
    const { ready, failed } = useScript('https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.5.1.js', {
    onLoad: () => console.log('load success'),
    onError: (...args) => console.log(args),
    id: `jquery`,
  })

  const w: Window & { $?: any } = window;
  const hasJquery = !!w.$;
  return (
    <div>
      <span>script ready: {ready.toString()}</span>
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
  onLoad: (e: event) => console.log('load success'),
  onError: (e: ErrorEvent) => console.log(e),
  onAbort: (e: UIEvent) => console.log(args),
};
const { ready, failed } = useScript('https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.5.1.js', options);
```

- **`ready`**_`: boolean`_ - whether script loaded.
- **`failed`**_`: boolean`_ - whether script load failed.
- **`options`** - an optional parameter containing load script options, same as [HTMLScriptElement](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)'s properties.
  - **`id`**_`: string | null`_ - The id of script tag;
  - **`type`**_`: string`_ - representing the MIME type of the script.
  - **`async`**_`: boolean = true`_ -By default, async will set to true, and the script will be executed asynchronously as soon as it downloads.
  - **`crossOrigin`**_`: string | null`_ - For scripts from other origins, this controls if error information will be exposed.
  - **`defer`**_`: boolean`_ -This Boolean attribute is set to indicate to a browser that the script is meant to be executed after the document has been parsed, but before firing DOMContentLoaded.
  - **`integrity`**_`: string`_ - This attribute contains inline metadata that a user agent can use to verify that a fetched resource has been delivered free of unexpected manipulation.
  - **`defer`**_`: boolean`_ -This Boolean attribute is set to indicate that the script should not be executed in browsers that support ES2015 modules — in effect, this can be used to serve fallback scripts to older browsers that do not support modular JavaScript code.
  - **`nonce`**_`: string`_ - A cryptographic nonce (number used once) to whitelist scripts in a script-src Content-Security-Policy. The server must generate a unique nonce value each time it transmits a policy. It is critical to provide a nonce that cannot be guessed as bypassing a resource's policy is otherwise trivial.
  - **`referrerpolicy`**_`: string`_ - Indicates which referrer to send when fetching the script, or resources fetched by the script.
  - **`charset `**_`: string`_ - If present, its value must be an ASCII case-insensitive match for "utf-8".
