# `useMount`

React lifecycle hook that call `mount` callback, when
component is mounted.


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
useMount(mount);
```
