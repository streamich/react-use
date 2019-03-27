# `useThrottle`

React hook that throttles a value.

## Usage

```jsx
import React, { useState } from 'react';
import { useThrottle } from 'react-use';

const Demo = ({value}) => {
  const throttledValue = useThrottle(value);

  return (
    <>
      <div>Value: {value}</div>
      <div>Throttled value: {throttledValue}</div>
    </>
  );
};
```

## Reference

```ts
useThrottle(value, ms?: number);
```
