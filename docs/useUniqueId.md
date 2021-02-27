# `useUniqueId`

React hook that returns a unique ID.

## Usage

```jsx
import {useUniqueId} from 'react-use';

const Demo = () => {
  const id = useUniqueId('name-input');

  return (
    <>
      <label htmlFor={id}>Name</label>
      <input id={id} type="text">
    </>
  );
};
```

## Reference

```ts
useUniqueId(prefix?: string, deps?: ReadonlyArray<any>);
```

- **`prefix`**_`: string`_ &mdash; optional string prefix for the ID.
- **`deps`**_`: ReadonlyArray<any>`_ &mdash; optional dependency array. The ID will change when a dependency is updates.
