# `useWindowSize`

React sensor hook that tracks dimensions of the browser window.


## Usage

```jsx
import {useWindowSize} from 'react-use';

const Demo = () => {
  // Optional args
  const callback = ({ width, height }) =>
    console.log(`Width: ${width}, Height: ${height}`);
  const initialWidth = 0;
  const initialHeight = 0;

  const {width, height} = useWindowSize(initialWidth, initialHeight, callback);

  return (
    <div>
      <div>width: {width}</div>
      <div>height: {height}</div>
    </div>
  );
};
```
