# `usePermission`

React side-effect hook that query permission status from the user depends on the specific API.


## Usage

```jsx
import {usePermission} from 'react-use';

const Demo = () => {
  const state = usePermission({ name: 'microphone' });

  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};
```
