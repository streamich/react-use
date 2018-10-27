# `useLifecycles`

React lifecycle hook that call `mount` and `unmount` callbacks, when
component is mounted and un-mounted, respectively.


## Usage

```jsx
import {useLifecycles} from 'react-use';

const Demo = () => {
  useLifecycles(() => console.log('MOUNTED'), () => console.log('UNMOUNTED'));
  return null;
};
```


## Reference

```js
useLifecycles(mount, unmount);
```
