# `useSearchParam`

React sensor hook that tracks browser's location search param.


## Usage

```jsx
import {useSearchParam} from 'react-use';

const Demo = () => {
  const edit = useSearchParam('edit');

  return (
    <div>
      <div>edit: {edit || '🤷‍♂️'}</div>
      <div>
        <button onClick={() => history.pushState({}, '', location.pathname + '?edit=123')}>Edit post 123 (?edit=123)</button>
      </div>
      <div>
      <button onClick={() => history.pushState({}, '', location.pathname + '?edit=999')}>Edit post 999 (?edit=999)</button>
      </div>
      <div>
        <button onClick={() => history.pushState({}, '', location.pathname)}>Close modal</button>
      </div>
    </div>
  );
};
```
