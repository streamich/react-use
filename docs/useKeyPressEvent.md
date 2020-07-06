# `useKeyPressEvent`

This hook fires `keydown` and `keyup` callbacks, similar to how [`useKey`](./useKey.md)
hook does, but it only triggers each callback once per press cycle. For example,
if you press and hold a key, it will fire `keydown` callback only once.


## Usage

```jsx
import React, { useState } from React;
import {useKeyPressEvent} from 'react-use';

const Demo = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count => ++count);
  const decrement = () => setCount(count => --count);
  const reset = () => setCount(count => 0);

  useKeyPressEvent(']', increment, increment);
  useKeyPressEvent('[', decrement, decrement);
  useKeyPressEvent('r', reset);

  return (
    <div>
      <p>
        Try pressing <code>[</code>, <code>]</code>, and <code>r</code> to
        see the count incremented and decremented.</p>
      <p>Count: {count}</p>
    </div>
  );
};
```


## Reference

```js
useKeyPressEvent('<key>', keydown);
useKeyPressEvent('<key>', keydown, keyup);
useKeyPressEvent('<key>', keydown, keyup, useKeyPress);
```
