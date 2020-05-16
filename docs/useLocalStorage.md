# `useLocalStorage`

React side-effect hook that manages a single `localStorage` key.

## Usage

```jsx
import { useLocalStorage } from 'react-use';

const Demo = () => {
  const [value, setValue, remove] = useLocalStorage('my-key', 'foo');

  return (
    <div>
      <div>Value: {value}</div>
      <button onClick={() => setValue('bar')}>bar</button>
      <button onClick={() => setValue('baz')}>baz</button>
      <button onClick={() => remove()}>Remove</button>
    </div>
  );
};
```

## Reference

```js
useLocalStorage(key);
useLocalStorage(key, initialValue);
useLocalStorage(key, initialValue, { raw: true });
useLocalStorage(key, initialValue, {
  raw: false,
  serializer: (value: T) => string,
  deserializer: (value: string) => T,
});
```

- `key` &mdash; `localStorage` key to manage.
- `initialValue` &mdash; initial value to set, if value in `localStorage` is empty.
- `raw` &mdash; boolean, if set to `true`, hook will not attempt to JSON serialize stored values.
- `serializer` &mdash; custom serializer (defaults to `JSON.stringify`)
- `deserializer` &mdash; custom deserializer (defaults to `JSON.parse`)
