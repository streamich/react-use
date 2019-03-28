# `useKeyPress`

React UI sensor hook that detects when the user is pressing a specific
key on their keyboard.

Complex bindings like detecting when multiple keys are held down at the same
time or requiring them to be held down in a specified order are also available
via [KeyboardJS key combos](https://github.com/RobertWHurst/KeyboardJS).
Check its documentation for further details on how to make combo strings.


## Usage

```jsx
import useKeyPress from 'react-use/lib/useKeyPress';

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

const Demo = () => {
  const states = [];
  for (const key of keys) states.push(useKeyPress(key));

  return (
    <div style={{textAlign: 'center'}}>
      Try pressing numbers
      <br />
      {states.reduce((s, pressed, index) => s + (pressed ? (s ? ' + ' : '') + keys[index] : ''), '')}
    </div>
  );
};
```


## Examples

```js
const isPressed = useKeyPress('a');

const predicate = (event) => event.key === 'a';
const isPressed = useKeyPress(predicate);
```
