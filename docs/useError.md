# `useError`

React side-effect hook that returns an error dispatcher.

## Usage

```jsx
import { useError } from 'react-use';
import ErrorBoundary from 'src/.../ErrorBoundary';

const Demo = () => {
  const dispatchError = useError();

  const clickHandler = () => {
    dispatchError(new Error('Some error!'));
  };

  return <button onClick={clickHandler}>Click me to throw</button>;
};

// In parent app
const App = () => (
  <ErrorBoundary>
    <Demo />
  </ErrorBoundary>
);
```

## Reference
<!-- eslint-skip -->
```js
const dispatchError = useError();
```

- `dispatchError` &mdash; Callback of type `(err: Error) => void`
