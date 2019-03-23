# `useScroll`

React sensor hook that re-renders on when scroll position in a DOM element changes.

## Usage

```jsx
import {useScroll} from 'react-use';

const Demo = () => {
  const element = React.useRef(null);
  const {x, y} = useScroll(element);

  return (
    <div ref={element}>
      <div>x: {x}</div>
      <div>y: {y}</div>
    </div>
  );
};
```
