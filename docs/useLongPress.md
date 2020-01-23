# `useLongPress`

React sensor hook that fires a callback after long pressing.

## Usage

```jsx
import { useLongPress } from 'react-use';

const Demo = () => {
  const onLongPress = () => {
    console.log('calls callback after long pressing 300ms');
  };

  const defaultDelay = 300;
  const longPressEvent = useLongPress(onLongPress, defaultDelay);

  return <button {...longPressEvent}>useLongPress</button>;
};
```

## Reference

```ts
const {
  onMouseDown,
  onTouchStart,
  onMouseUp,
  onMouseLeave,
  onTouchEnd
} = useLongPress(
  callback: (e: TouchEvent | MouseEvent) => void,
  delay?: number = 300
)
```

- `callback` &mdash; callback function.
- `delay` &mdash; delay in milliseconds after which to calls provided callback, defaults to `300`.
