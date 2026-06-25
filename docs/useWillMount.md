# `useWillMount`

React lifecycle hook that calls a function before the component is mounted.

## Usage

```jsx
import {useWillMount} from 'react-use';

const Demo = () => {
  useWillMount(() => alert('WILL MOUNT'));
  return null;
};
```

## Reference

```ts
useWillMount(fn: () => void);
```
