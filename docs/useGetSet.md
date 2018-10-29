# `useGetSet`

React state hook that returns state getter function instead of
raw state itself, this prevents subtle bugs when state is used
in nested functions.


## Usage

Below example uses `useGetSet` to increment a number after 1 second
on each click.

```jsx
import {useGetSet} from 'react-use';

const Demo = () => {
  const [get, set] = useGetSet(0);
  const onClick = () => {
    setTimeout(() => {
      set(get() + 1)
    }, 1_000);
  };

  return (
    <button onClick={onClick}>Clicked: {get()}</button>
  );
};
```

If you would do this example in a naive way using regular `useState`
hook, the counter would not increment correctly if you click fast multiple times.

```jsx
const DemoWrong = () => {
  const [cnt, set] = useState(0);
  const onClick = () => {
    setTimeout(() => {
      set(cnt + 1)
    }, 1_000);
  };

  return (
    <button onClick={onClick}>Clicked: {cnt}</button>
  );
};
```
