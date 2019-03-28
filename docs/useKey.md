# `useKey`

React UI sensor hook that executes a `handler` when a keyboard key is used.

## Usage

```jsx
import useKey from 'react-use/lib/useKey';

const Demo = () => {
  const [count, set] = useState(0);
  const increment = () => set(count => ++count);
  useKey('ArrowUp', increment);

  return (
    <div>
      Press arrow up: {count}
    </div>
  );
};
```


## Reference

```js
useKey(filter, handler, options?, deps?)
```


## Examples

```js
useKey('a', () => alert('"a" pressed'));

const predicate = (event) => event.key === 'a'
useKey(predicate, handler, {event: 'keyup'});
```
