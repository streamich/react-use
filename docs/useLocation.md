# `useLocation`

React sensor hook that tracks brower's location.

For Internet Explorer you need to [install a polyfill](https://github.com/streamich/react-use/issues/73).


## Usage

```jsx
import {useLocation} from 'react-use';

const Demo = () => {
  const state = useLocation();

  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};
```
