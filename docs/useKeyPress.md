# `useKeyPress`

React UI sensor hook that detects when the user is pressing a specific
key on their keyboard.

## Usage

```jsx
import { useKeyPress } from "react-use";

const Demo = () => {
  const hasPressedQ = useKeyPress("q");
  const hasPressedW = useKeyPress("w");
  const hasPressedE = useKeyPress("e");
  const hasPressedR = useKeyPress("r");
  const hasPressedT = useKeyPress("t");
  const hasPressedY = useKeyPress("y");
  return (
    <div>
      Try pressing one of these: <code>Q W E R T Y</code>
      <div>
        {hasPressedQ && "Q"}
        {hasPressedW && "W"}
        {hasPressedE && "E"}
        {hasPressedR && "R"}
        {hasPressedT && "T"}
        {hasPressedY && "Y"}
      </div>
    </div>
  );
};
```

## Reference

```js
const hasPressed = useKeyPress('key');
```
