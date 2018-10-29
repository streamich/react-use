# `useTimeout`

Returns `true` after a specified number of milliseconds.

## Usage

```jsx
import { useTimeout } from 'react-use';

const Demo = () => {
  const ready = useTimeout(2000);

  return <div>Ready: {ready ? 'Yes' : 'No'}</div>;
};
```
