# `useMount`

React lifecycle hook that calls a function after the component is mounted. Use `useEffectOnce` if you need both a mount and unmount function.

## Usage

```jsx
import {useMount} from 'react-use';

const Demo = () => {
  useMount(() => alert('MOUNTED'));
  return null;
};
```

## Reference

```ts
useMount(fn: () => void);
```
