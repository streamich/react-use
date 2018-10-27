# `useHover`

React sensor hook that tracks size of some HTML element.


## Usage

```jsx
import {useHover} from 'react-use';

const Demo = () => {
  const element = (hovered) =>
    <div>
      Hover me! {hovered && 'Thanks!'}
    </div>;
  const [hoverable, hovered] = useHover(element);

  return (
    <div>
      {hoverable}
      <div>{hovered ? 'HOVERED' : ''}</div>
    </div>
  );
};
```
