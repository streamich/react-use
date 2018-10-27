# `useSize`

React sensor hook that tracks size of some HTML element.


## Usage

```jsx
import {useSize} from 'react-use';

const Demo = () => {
  const [sized, {width, height}] = useSize(
    <div style={{border: '1px solid red'}}>Size me up!</div>
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
