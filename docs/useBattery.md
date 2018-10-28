# `useBattery`

React sensor hook that tracks batter status.


## Usage

```jsx
import {useBattery} from 'react-use';

const Demo = () => {
  const state = useBattery();

  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};
```
