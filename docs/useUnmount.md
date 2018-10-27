# `useUnmount`

React lifecycle hook that call `unmount` callback, when
component is un-mounted.


## Usage

```jsx
import {useUnmount} from 'react-use';

const Demo = () => {
  useUnmount(() => console.log('UNMOUNTED'));
  return null;
};
```


## Reference

```js
useUnmount(mount);
```
