# `usePromise`

React Lifecycle hook that returns a helper function for wrapping promises.
Promises wrapped with this function will resolve only when component is mounted.


## Usage

```jsx
import React from 'react';
import {usePromise} from 'react-use';

const Demo = ({promise}) => {
  const mounted = usePromise();
  const [value, setValue] = React.useState();

  React.useEffect(() => {
    (async () => {
      const value = await mounted(promise);
      // This line will not execute if <Demo> component gets unmounted.
      setValue(value);
    })();
  });
};
```
