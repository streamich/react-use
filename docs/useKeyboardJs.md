# `useKeyboardJs`

React UI sensor hook that detects complex key combos like detecting when
multiple keys are held down at the same time or requiring them to be held down in a specified order.

Via [KeyboardJS key combos](https://github.com/RobertWHurst/KeyboardJS).
Check its documentation for further details on how to make combo strings.


## Usage

```jsx
import useKeyboardJs from 'react-use/lib/useKeyboardJs';

const Demo = () => {
  const isPressed = useKeyboardJs('a + b');

  return (
    <div>
      [a + b] pressed: {isPressed ? 'Yes' : 'No'}
    </div>
  );
};
```


## Examples

```js
const isPressed = useKeyboardJs('a + b');
```
