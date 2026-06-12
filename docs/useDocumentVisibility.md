# `useDocumentVisibility`

React sensor hook that tracks document visibility state using the [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API).

## Usage

```jsx
import {useDocumentVisibility} from 'react-use';

const Demo = () => {
  const defaultState = document.visibilityState === 'visible';
  const isVisible = useDocumentVisibility(defaultState);

  return (
    <div>
      Document is {isVisible ? 'visible' : 'hidden'}
    </div>
  );
};
```

## Reference

```js
const isVisible = useDocumentVisibility(initialState);
```

- `initialState` &mdash; `boolean`, optional initial state before the actual visibility is determined, defaults to `false`.
- `isVisible` &mdash; `boolean`, whether the document is currently visible (tab is in foreground).
