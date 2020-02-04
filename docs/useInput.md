# `useInput`

React UI hook that simple to use controlled component.


## Usage

```jsx
import {useInput} from 'react-use';

const Demo = () => {
  const [email, onEmailChange] = useInput('')
  const [count, onCountChange, setCount] = useInput(0, (event) => {
    const v = +event.currentTarget.value
    if (!isNaN(v)) {
      setCount(v)
    }
  })

  const handleClickAdd = () => {
    setCount(+count + 10)
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="please input email"
          value={email}
          onChange={onEmailChange}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="please input number"
          value={count}
          onChange={onCountChange}
        />
        <button onClick={handleClickAdd}>add 10</button>
      </div>
    </div>
  );
};
```


## Reference

```js
useInput(initValue[, onChange]);
```

- `initValue` Input init value.
- `onChange` onChange handle function.
