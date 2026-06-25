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

### Sharing variables between `mount` and `unmount` callbacks.
Sometimes, in `unmount` callback, you want to use something declared in `mount` callback. In this case you can return value from `mount` callback and it will be passed to `unmount` as an argument. See example below.

```jsx
import {useLifecycles} from 'react-use';
import { subscribe, unsubscribe } from 'a-pub-sub-library';

const Demo = () => {
  useLifecycles(
    () => {
      const subscription = subscribe();

      return subscription;
    },
    (subscription) => {
      unsubscribe(subscription);
    },
  );
};
```


## Reference

```js
useLifecycles(mount, unmount);
```
