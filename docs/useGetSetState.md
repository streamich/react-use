# `useGetSetState`

A mix of `useGetSet` and `useGetSetState`.


## Usage

```jsx
import {useGetSetState} from 'react-use';

const Demo = () => {
  const [get, setState] = useGetSetState({cnt: 0});
  const onClick = () => {
    setTimeout(() => {
      setState({cnt: get().cnt + 1})
    }, 1000);
  };

  return (
    <button onClick={onClick}>Clicked: {get().cnt}</button>
  );
};
```
