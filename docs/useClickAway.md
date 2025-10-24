# `useClickAway`

React UI hook that triggers a callback when user
clicks outside the target element or elements.


## Usage

```jsx
import {useClickAway} from 'react-use';

const Demo = () => {
 const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  useClickAway<MouseEvent>(ref, action('outside clicked'));
  useClickAway<MouseEvent>([ref1, ref2], action('outside clicked blue or green box'));

  return (
    <>
    <div
      ref={ref}
      style={{
        width: 200,
        height: 200,
        background: 'red',
      }}
    />
    <div
      ref={ref1}
      style={{
        width: 200,
        height: 200,
        background: 'green',
      }}
    />
    <div
      ref={ref2}
      style={{
        width: 200,
        height: 200,
        background: 'blue',
      }}
    />
    </>
  );
};
```

## Reference

```js
useClickAway(ref, onMouseEvent)
useClickAway(ref, onMouseEvent, ['click'])
useClickAway(ref, onMouseEvent, ['mousedown', 'touchstart'])
useClickAway([ref1, ref2], onMouseEvent)
```
