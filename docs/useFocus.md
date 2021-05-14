# `useFocus`

React UI sensor hooks that track if an element is focused. `useFocus` accepts a React element and sets its `onFocus` and `onBlur` events.

## Usage

```jsx
import {useFocus} from 'react-use';

const Demo = () => {
  const element = (focused) => (
    <div>
      <label htmlFor="useFocus" style={{fontWeight: focused ? 'bold' : 'normal'}}>Click here</label>
      <input type="text" id="useFocus" value="Focus here" />
    </div>
  );

  const [input, focused] = useFocus(element);

  return (
    <div>
      {input}
      <div>{focused ? 'Input is on focus!' : ''}</div>
    </div>
  );
};
```

## Examples

```js
const [el, focused] = useFocus(element)
```