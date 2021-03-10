# `useMountedState`

> **NOTE!:** despite having `State` in its name **_this hook does not cause component re-render_**.  
> This component designed to be used to avoid state updates on unmounted components.

Lifecycle hook providing ability to check component's mount state.  
Returns a function that will return `true` if component mounted and `false` otherwise.

## Usage

```jsx
import * as React from 'react';
import {useMountedState} from 'react-use';

const Demo = () => {
  const isMounted = useMountedState();

  React.useEffect(() => {
    setTimeout(() => {
      if (isMounted()) {
        // ...
      } else {
        // ...
      }
    }, 1000);
  });
};
```
