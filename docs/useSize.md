# `useSize`

React sensor hook that tracks size of an HTML element.

## Usage

```jsx
import {useSize} from 'react-use';

const Demo = () => {
  const [sized, {width, height}] = useSize(
    ({width}) => <div style={{border: '1px solid red'}}>Size me up! ({width}px)</div>,
    { width: 100, height: 100 }
  );

  return (
    <div>
      {sized}
      <div>width: {width}</div>
      <div>height: {height}</div>
    </div>
  );
};
```

## Reference

```js
useSize(element, initialSize);
```

- `element` &mdash; sized element.
- `initialSize` &mdash; initial size containing a `width` and `height` key.
