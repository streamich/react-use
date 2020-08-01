# `usePermission`

React side-effect hook to query permission status of browser APIs.

## Usage

```jsx
import {usePermission} from 'react-use';

const Demo = () => {
  const state = usePermission({ name: 'microphone' });

  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};
```

## Support

The [`navigator.permissions` API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions) is not available in every browser, most notably Safari. In that case, the hook will return an empty value and no-op.
