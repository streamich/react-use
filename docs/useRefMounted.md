# `useRefMounted`

Lifecycle hook that tracks if component is mounted. Returns a ref, which has a
boolean `.current` property.


## Usage

```jsx
import {useRefMounted} from 'react-use';

const Demo = () => {
  const refMounted = useRefMounted();

  useEffect(() => {
    setTimeout(() => {
      if (refMounted.currrent) {
        // ...
      } else {
        // ...
      }
    }, 1000);
  });
};
```
