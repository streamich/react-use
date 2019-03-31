# `useMount`

React lifecycle hook that calls a function after the component is mounted.

## Usage

```jsx
import {useMount} from 'react-use';

const Demo = () => {
  useMount(() => console.log('MOUNTED'));
  return null;
};
```

## Reference

```js
useMount(fn: () => void);
```
