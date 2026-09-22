# `useAllSearchParam`

React sensor hook that tracks all of the browser's location search params as an object.

## Usage

```jsx
import {useAllSearchParam} from 'react-use';

const Demo = () => {
  const params = useAllSearchParam();

  return (
    <div>
      <div>params: {JSON.stringify(params)}</div>
      <div>
        <button onClick={() => history.pushState({}, '', location.pathname + '?edit=123&foo=bar')}>Edit post 123 (?edit=123&foo=bar)</button>
      </div>
      <div>
        <button onClick={() => history.pushState({}, '', location.pathname)}>Clear params</button>
      </div>
    </div>
  );
};
```

## Caveats/Gotchas

- Only the first value is kept when a param is repeated (e.g. `?foo=bar&foo=baz` yields `{foo: 'bar'}`), matching the semantics of `useSearchParam`.
- When using a hash router, like `react-router`'s [`<HashRouter>`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/HashRouter.md), this hook won't be able to read the search parameters as they are considered part of the hash of the URL by browsers.
