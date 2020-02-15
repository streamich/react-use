# `useBeforeUnload`

React side-effect hook that shows browser alert when user try to reload or close the page.


## Usage

### Boolean check

```jsx
import {useBeforeUnload} from 'react-use';

const Demo = () => {
  const [dirty, toggleDirty] = useToggle(false);
  useBeforeUnload(dirty, 'You have unsaved changes, are you sure?');

  return (
    <div>
      {dirty && <p>Try to reload or close tab</p>}
      <button onClick={() => toggleDirty()}>{dirty ? 'Disable' : 'Enable'}</button>
    </div>
  );
};
```

### Function check

Note: Since every `dirtyFn` change registers a new callback, you should use
[refs](https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback)
if your test value changes often.

```jsx
import {useBeforeUnload} from 'react-use';

const Demo = () => {
  const [dirty, toggleDirty] = useToggle(false);
  const dirtyFn = useCallback(() => {
    return dirty;
  }, [dirty]);
  useBeforeUnload(dirtyFn, 'You have unsaved changes, are you sure?');

  return (
    <div>
      {dirty && <p>Try to reload or close tab</p>}
      <button onClick={() => toggleDirty()}>{dirty ? 'Disable' : 'Enable'}</button>
    </div>
  );
};
```
