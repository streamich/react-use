# `useMouse`

React sensor hook that re-renders on mouse position changes.

## Usage

```jsx
import {useMouse} from 'react-use';

const Demo = () => {
  const ref = React.useRef(null);
  const {docX, docY, posX, posY, elX, elY, elW, elH} = useScroll(ref);

  return (
    <div ref={element}>
      <div>Mouse position in document - x:{docX} y:{docY}</div>
      <div>Mouse position in element - x:{posX} y:{posY}</div>
      <div>Element position - x:{elX} y:{elY}</div>
      <div>Element dimensions - {elW}x{elH}</div>
    </div>
  );
};
```
