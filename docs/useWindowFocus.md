# `useWindowFocus`

React sensor hook that tracks if the browser window is focused.

## Usage

```jsx
import {useWindowFocus} from 'react-use';

const Demo = () => {
  const defaultState = document.hasFocus();
  const isFocused = useWindowFocus(defaultState);

  return (
    <div>
      Window is {isFocused ? 'focused' : 'not focused'}
    </div>
  );
};
```

## Reference

```js
const isFocused = useWindowFocus(initialState);
```

- `initialState` &mdash; `boolean`, optional initial state before the actual focus is determined, defaults to `false`.
- `isFocused` &mdash; `boolean`, whether the browser window is currently focused.
