# `useUnmount`

React lifecycle hook that calls a function when the component will unmount. Use `useLifecycles` if you need both a mount and unmount function.

## Usage

```jsx
import {useUnmount} from 'react-use';

const Demo = () => {
  useUnmount(() => alert('UNMOUNTED'));
  return null;
};
```

## Reference

```ts
useUnmount(fn: () => void | undefined);
```
