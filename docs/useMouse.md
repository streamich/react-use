# `useMouse` and `useMouseHovered`

React sensor hooks that re-render on mouse position changes. `useMouse` simply tracks
mouse position; `useMouseHovered` allows you to specify extra options:

- `bound` &mdash; to bind mouse coordinates within the element
- `whenHovered` &mdash; whether to attach `mousemove` event handler only when user hovers over the element

## Usage

```jsx
import {useMouse} from 'react-use';

const Demo = () => {
  const ref = React.useRef(null);
  const {docX, docY, posX, posY, elX, elY, elW, elH, dirty} = useMouse(ref);

  return (
    <div ref={ref}>
      {
        dirty ?
        <Fragment>
          <div>Mouse position in document - x:{docX} y:{docY}</div>
          <div>Mouse position in element - x:{elX} y:{elY}</div>
          <div>Element position- x:{posX} y:{posY}</div>
          <div>Element dimensions - {elW}x{elH}</div>
        </Fragment>
        : <div>Waiting for mouse to move...</div>
      }
    </div>
  );
};
```

## Reference

```ts
useMouse(ref);
useMouseHovered(ref, {bound: false, whenHovered: false});
```
