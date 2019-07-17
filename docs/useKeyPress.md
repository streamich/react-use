# `useKeyPress`

React UI sensor hook that detects when the user is pressing a specific
key on their keyboard.


## Usage

```jsx
import {useKeyPress} from 'react-use';

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

const Demo = () => {
  const states = [];
  for (const key of keys) states.push(useKeyPress(key)[0]);

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
