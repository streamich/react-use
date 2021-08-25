# `useKey`

React UI sensor hook that executes a `handler` when a keyboard key is used.

## Usage

```jsx
import {useKey} from 'react-use';

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

Or as render-prop:

```jsx
import UseKey from 'react-use/lib/component/UseKey';

<UseKey filter='a' fn={() => alert('"a" key pressed!')} />
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
