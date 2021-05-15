# `useDevicePixelRatio`

React sensor hook that tracks pixel ratio of the device.

## Usage

```jsx
import { useDevicePixelRatio } from 'react-use';

const Demo = () => {
  const pixelRatio = useDevicePixelRatio();

  return (
    <div>
      <div>pixelRatio: {pixelRatio}</div>
    </div>
  );
};
```
