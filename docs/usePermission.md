# `usePermission`

React side-effect hook to query permission status of browser APIs.

## Usage

```jsx
import {usePermission} from 'react-use';

const Demo = () => {
  // type PermissionName = "geolocation" | "notifications" | "persistent-storage" | "push" | "screen-wake-lock" | "xr-spatial-tracking";
  const state = usePermission({ name: 'notifications' });

  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};
```
