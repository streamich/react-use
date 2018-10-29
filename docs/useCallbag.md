# `useCallbag`

React state hook that tracks the latest value of a callbag.


## Usage

```jsx
import {useCallbag} from 'react-use';
import interval from 'callbag-interval';

const Demo = () => {
  const count = useCallbag(() => interval(1000));
  return <span>{`Counter: ${count}`}</span>
};
```
