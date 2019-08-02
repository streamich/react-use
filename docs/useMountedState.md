# `useMountedState`

Lifecycle hook providing ability to check component's mount state.  
Gives a function that will return `true` if component mounted and `false` otherwise.

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
