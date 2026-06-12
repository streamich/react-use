# `useGeolocation`

React sensor hook that tracks user's geographic location. This hook accepts [position options](https://developer.mozilla.org/docs/Web/API/PositionOptions).

## Usage

```jsx
import {useGeolocation} from 'react-use';

const Demo = () => {
  const state = useGeolocation();

  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};
```

## Reference

```ts
useGeolocation(options: PositionOptions)
```
## Types

If you need to use the return type of `useGeolocation`, you can import the `GeoLocationSensorState` type directly from the hook module:

```ts
import type { GeoLocationSensorState } from 'react-use/lib/useGeolocation';
```