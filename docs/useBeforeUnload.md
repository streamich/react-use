# `useBeforeUnload`

React side-effect hook that shows browser alert when user try to reload or close the page.


## Usage

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
