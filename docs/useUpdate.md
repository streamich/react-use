# `useUpdate`

React utility hook that returns a function that forces component
to re-render when called.


## Usage

```jsx
import {useUpdate} from 'react-use';

const Demo = () => {
  const update = useUpdate();
  return (
    <>
      <div>Time: {Date.now()}</div>
      <button onClick={update}>Update</button>
    </>
  );
};
```
