# `useUnmount`

React lifecycle hook that calls a function when the component will unmount.

## Usage

```jsx
import {useUnmount} from 'react-use';

const Demo = () => {
  useUnmount(() => console.log('UNMOUNTED'));
  return null;
};
```

## Reference

```ts
useUnmount(fn: () => void | undefined);
```
