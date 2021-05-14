# `useStateDelayed`

React state hook that loads initialState once when some value was updated and in the meantime returns defaultState.
Usefull for displaying temporary value and updating it when async request finishes with data that is used for initialState.

## Usage

```jsx
import {useState, useEffect} from 'react';
import {useStateDelayed} from 'react-use';

const Demo = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handle = setTimeout(() => {
      setLoading(false);
    }, 500)
  });

  const [state, setState] = useStateDelayed(getInitialState, !loading)

  return null;

  function getInitialState() {
    // ...
    return '';
  }
}
```

## Reference

```ts
const [state, setState] = useStateDelayed<S>(initialState: S || ( () => S ) , watchInput: Boolean, defaultState?: S || ( () => S ))
```

When `watchInput` changes to `true`, the state is updated once to `initialState`. Before that happens the `defaultState` value is returned.

- **state** - current state value
- **setState** - update state value (note: if you manually update the state before `watchInput` changes to `true` the `initialState` will be ignored)