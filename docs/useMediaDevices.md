# `useMediaDevices`

React sensor hook that tracks connected hardware devices.


## Usage

```jsx
import {useMediaDevices} from 'react-use';

const Demo = () => {
  const state = useMediaDevices();

  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};
```
