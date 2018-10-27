# `useLocation`

React sensor hook that tracks brower's location.


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
