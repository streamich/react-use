# `useObservable`

React state hook that tracks the latest value of an `Observable`.


## Usage

```jsx
import {useObservable} from 'react-use';

const counter$ = new BehaviorSubject(0);
const Demo = () => {
  const value = useObservable(counter$, 0);

  return (
    <button onClick={() => counter$.next(value + 1)}>
      Clicked {value} times
    </button>
  );
};
```
