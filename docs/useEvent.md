# `useEvent`

React sensor hook that subscribes a `handler` to events.


## Usage

```jsx
import useEvent from 'react-use/lib/useEvent';
import useList from 'react-use/lib/useList';

const Demo = () => {
  const [list, {push}] = useList();
  const onkeydown = ({key}) => {
    push(key);
  };
  useEvent('keydown', useCallback(onkeydown, []));

  return (
    <div>
      <p>
        Press some keys on your keyboard.
      </p>
      <pre>
        {JSON.stringify(list, null, 4)}
      </pre>
    </div>
  );
};
```


## Examples

```js
useEvent('keydown', handler)
useEvent('scroll', handler, window, {useCapture: true})
```
