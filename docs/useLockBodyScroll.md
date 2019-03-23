# `useLockBodyScroll`

React side-effect hook that locks scrolling on the body element. Useful for modal and other overlay components.

## Usage

```jsx
import {useLockBodyScroll, useToggle} from 'react-use';

const Demo = () => {
  const [locked, toggleLocked] = useToggle(false)

  useLockBodyScroll(locked);

  return (
    <div>
      <button onClick={() => toggleLocked()}>
        {locked ? 'Unlock' : 'Lock'}
      </button>
    </div>
  );
};
```

## Reference

```ts
useToggle(enabled?: boolean = true);
```

- `enabled` &mdash; Hook will lock scrolling on the body element if `true`, defaults to `true`
