# `useRefMounted`

>**DEPRECATED**  
>This method is obsolete, use `useMountedState` instead.

Lifecycle hook that tracks if component is mounted. Returns a ref, which has a
boolean `.current` property.


## Usage

```jsx
import {useRefMounted} from 'react-use';

const Demo = () => {
  const refMounted = useRefMounted();

  useEffect(() => {
    setTimeout(() => {
      if (refMounted.current) {
        // ...
      } else {
        // ...
      }
    }, 1000);
  });
};
```
