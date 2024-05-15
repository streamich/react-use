# `use01`

React state hook that tracks value of a number which can be only equal to `0` or `1`.

## Usage

```jsx
import React from 'react';
import { use01 } from 'react-use';

const Demo = () => {
  // Most of time we only use num and toggle
  const [num, toggle, setNum] = use01();

  return (
    <div>
      <div>{num ? 'ON' : 'OFF'}</div>
      <button onClick={toggle}>Toggle</button>
      <button onClick={() => setNum(1)}>set ON</button>
      <button onClick={() => setNum(0)}>set OFF</button>
    </div>
  );
};
```
