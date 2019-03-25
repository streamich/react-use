# `useKeyPressEvent`

React UI sensor hook that detects when the user is pressing a specific
key on their keyboard and fires a specified keyup and/or keydown effect. If
you only need to retrieve the state, see [useKeyPress](useKeyPress.md).

Complex bindings like detecting when multiple keys are held down at the same
time or requiring them to be held down in a specified order are also available
via [KeyboardJS key combos](https://github.com/RobertWHurst/KeyboardJS).
Check its documentation for further details on how to make combo strings.

The first argument is the key(s) to watch. If only a second argument
(a function) is passed, it will be used in the keydown event. On the other hand,
if a second and third argument are passed, the second will be used in the keyup
event and the third in the keydown event. Essentially, keydown takes precedence.

Requires `keyboardjs`:

```bash
npm add keyboardjs
# or
yarn add keyboardjs
```

## Usage

```jsx
import React, { useState } from React;
import { useKeyPressEvent } from "react-use";

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
useKeyPressEvent('<key>', onKeydown);
useKeyPressEvent('<key>', onKeyup, onKeydown);
```
