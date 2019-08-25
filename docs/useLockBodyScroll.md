# `useLockBodyScroll`

React side-effect hook that locks scrolling on the body element. Useful for modal and other overlay components.

Accepts ref object pointing to any HTML element as second parameter. Parent body element will be found and it's scroll will be locked/unlocked. It is needed to proper iFrame handling.  
By default it uses body element of script's parent window. 

>Note: To improve performance you can pass body's or iframe's ref object, thus no parent lookup will be performed 

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
useLockBodyScroll(locked: boolean = true, elementRef?: RefObject<HTMLElement>);
```

- `locked` &mdash; Hook will lock scrolling on the body element if `true`, defaults to `true`
- `elementRef` &mdash; The element ref object to find the body element. Can be either a ref to body or iframe element.
