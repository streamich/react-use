# `useEvent`

React sensor hook that subscribes a `handler` to events.


## Usage

```jsx
import React from 'react';
import {useEvent, useList} from 'react-use';

const Demo = () => {
  const [list, {push, clear}] = useList();

  const onKeyDown = React.useCallback(({key}) => {
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
<!-- eslint-skip -->
```js
useEvent('keydown', handler)
useEvent('scroll', handler, window, {capture: true})
```
