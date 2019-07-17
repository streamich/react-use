# `useEvent`

React sensor hook that subscribes a `handler` to events.


## Usage

```jsx
import {useEvent, useList} from 'react-use';

const Demo = () => {
  const [list, {push, clear}] = useList();

  const onKeyDown = useCallback(({key}) => {
    if (key === 'r') clear();
    push(key);
  }, []);

  useEvent('keydown', onKeyDown);

  return (
    <div>
      <p>
        Press some keys on your keyboard, <code style={{color: 'tomato'}}>r</code> key resets the list
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
useEvent('scroll', handler, window, {capture: true})
```
