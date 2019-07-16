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
