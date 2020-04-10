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

Alternatively, an array of refs can be used
```jsx
import {useClickAway} from 'react-use';

const Demo = () => {
  const refOne = useRef(null);
  const refTwo = useRef(null);

  useClickAway([refOne, refTwo], () => {
    console.log('OUTSIDE CLICKED');
  });

  return (
    <React.Fragment>
      <div ref={refOne} style={{
        width: 200,
        height: 200,
        background: 'red',
      }} />
      <div ref={refTwo} style={{
        width: 200,
        height: 200,
        background: 'blue',
      }} />
    </React.Fragment>
  );
};
```

## Reference

```js
useClickAway(ref, onMouseEvent)
useClickAway([refOne, refTwo], onMouseEvent)
useClickAway(ref, onMouseEvent, ['click'])
useClickAway(ref, onMouseEvent, ['mousedown', 'touchstart'])
```
