# `useMedia`

React sensor hook that tracks state of a CSS media query.

## Usage

```jsx
import {useMedia} from 'react-use';

const Demo = () => {
  const isWide = useMedia('(min-width: 480px)');

  return (
    <div>
      Screen is wide: {isWide ? 'Yes' : 'No'}
    </div>
  );
};
```

## Reference

```ts
useMedia(query: string, defaultState: boolean = false): boolean;
```

The `defaultState` parameter is only used as a fallback for server side rendering.

When server side rendering, it is important to set this parameter because without it the server's initial state will fallback to false, but the client will initialize to the result of the media query. When React hydrates the server render, it may not match the client's state. See the [React docs](https://reactjs.org/docs/react-dom.html#hydrate) for more on why this is can lead to costly bugs 🐛.
