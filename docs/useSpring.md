# `useSpring`

React animation hook that updates a single numeric value over time according
to spring dynamics.


## Usage

```jsx
import {useSpring} from 'react-use';

const Demo = () => {
  const [target, setTarget] = useState(50);
  const value = useSpring(target);

  return (
    <div>
      {value}
      <br />
      <button onClick={() => setTarget(0)}>Set 0</button>
      <button onClick={() => setTarget(100)}>Set 100</button>
    </div>
  );
};
```


# Reference


```js
const currentValue = useSpring(targetValue);
const currentValue = useSpring(targetValue, tension, friction);
```
