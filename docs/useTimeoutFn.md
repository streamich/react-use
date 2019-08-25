# `useTimeoutFn`

Calls given function after specified amount of milliseconds.  
**Note:** this hook does not re-render component by itself.

Automatically cancels timeout on component unmount.
Automatically resets timeout on delay change.

## Usage

```jsx
import * as React from 'react';
import { useTimeoutFn } from 'react-use';

const Demo = () => {
  const [state, setState] = React.useState('Not called yet');

  function fn() {
    setState(`called at ${Date.now()}`);
  }

  const [isReady, cancel, reset] = useTimeoutFn(fn, 5000);
  const cancelButtonClick = useCallback(() => {
    if (isReady() === false) {
      cancel();
      setState(`cancelled`);
    } else {
      reset();
      setState('Not called yet');
    }
  }, []);

  const readyState = isReady();

  return (
    <div>
      <div>{readyState !== null ? 'Function will be called in 5 seconds' : 'Timer cancelled'}</div>
      <button onClick={cancelButtonClick}> {readyState === false ? 'cancel' : 'restart'} timeout</button>
      <br />
      <div>Function state: {readyState === false ? 'Pending' : readyState ? 'Called' : 'Cancelled'}</div>
      <div>{state}</div>
    </div>
  );
};
```

## Reference

```ts 
const [
    isReady: () => boolean | null,
    cancel: () => void,
    reset: () => void,
] = useTimeoutFn(fn: Function, ms: number = 0);
```

- **`fn`**_`: Function`_ - function that will be called;
- **`ms`**_`: number`_ - delay in milliseconds;
- **`isReady`**_`: ()=>boolean|null`_ - function returning current timeout state:
    - `false` - pending
    - `true` - called
    - `null` - cancelled
- **`cancel`**_`: ()=>void`_ - cancel the timeout
- **`reset`**_`: ()=>void`_ - reset the timeout

