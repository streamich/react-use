# `useClickAway`

React UI hook that triggers a callback when user
clicks outside the target element.


## Usage

```jsx
import {useClickAway} from 'react-use';

const Demo = () => {
  const ref = useRef(null);
  useClickAway(ref, () => {
    console.log('OUTSIDE CLICKED');
  });

  return (
    <div ref={ref} style={{
      width: 200,
      height: 200,
      background: 'red',
    }} />
  );
};
```

## Reference

```js
useClickAway(ref, onMouseEvent)
useClickAway(ref, onMouseEvent, ['click'])
useClickAway(ref, onMouseEvent, ['mousedown', 'touchstart'])
```
