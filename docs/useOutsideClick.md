# `useOutsideClick`

React UI hook that triggers a callback when user
clicks outside the target element.


## Usage

```jsx
import {useOutsideClick} from 'react-use';

const Demo = () => {
  const ref = useRef(null);
  useOutsideClick(ref, () => {
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
