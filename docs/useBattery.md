# `useBattery`

React sensor hook that tracks batter status.

[![](https://img.shields.io/badge/demo-useBattery-green.svg)](https://codesandbox.io/s/qlvn662zww)


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
