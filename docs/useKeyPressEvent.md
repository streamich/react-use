# `useKeyPressEvent`

React UI sensor hook that detects when the user is pressing a specific
key on their keyboard and fires a specified keyup and/or keydown effect. If
you only need to retrieve the state, see [useKeyPress](#).

Complex bindings like detecting when multiple keys are held down at the same
time or requiring them to be held down in a specified order are also available
via [KeyboardJS key combos](https://github.com/RobertWHurst/KeyboardJS).
Check its documentation for further details on how to make combo strings.

The first argument is the key(s) to watch. If only a second argument
(a function) is passed, it will be used in the keydown event. On the other hand,
if a second and third argument are passed, the second will be used in the keyup
event and the third in the keydown event. Essentially, keydown takes precedence.

## Usage

```jsx
import React, { useState } from React;
import { useKeyPressEvent } from "react-use";

const Demo = () => {
  const [count, setCount] = useState(0);

  const onKeyup = keys => {
    console.log(`onKeyup: ${keys}`);
  };

  const onKeydown = keys => {
    console.log(`onKeydown: ${keys}`);
    setCount(count => ++count);
  };

  useKeyPressEvent('h', onKeyup, onKeydown);

  useKeyPressEvent('l', () => {
    console.log(`onKeydown for 'l'`);
    setCount(count => ++count);
  });

  return (
    <div>
      <p>Try pressing <code>h</code> or <code>l</code> to see the count increment</p>
      <p>Count: {countOfPressed}</p>
    </div>
  );
};
```

## Reference

```js
useKeyPressEvent('<key>', onKeydown);

useKeyPressEvent('<key>', onKeyup, onKeydown);
```
