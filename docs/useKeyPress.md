# `useKeyPress`

React UI sensor hook that detects when the user is pressing a specific
key on their keyboard.

Complex bindings like detecting when multiple keys are held down at the same
time or requiring them to be held down in a specified order are also available
via [KeyboardJS key combos](https://github.com/RobertWHurst/KeyboardJS).
Check its documentation for further details on how to make combo strings.

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
  const hasPressedWord = useKeyPress("q + w + e + r + t + y", {
    useKeyboardJS: true
  });

  return (
    <div>
      Try pressing each one of these at a time: <code>Q W E R T Y</code>
      {!hasPressedWord && (
        <div>
          {hasPressedQ && "Q"}
          {hasPressedW && "W"}
          {hasPressedE && "E"}
          {hasPressedR && "R"}
          {hasPressedT && "T"}
          {hasPressedY && "Y"}
        </div>
      )}
      <div>And now press them all at once!</div>
      <div>{hasPressedWord && "Q + W + E + R + T + Y"}</div>
    </div>
  );
};
```

## Reference

```js
const hasPressedSingleKey = useKeyPress("<key>");
const hasPressedKeyCombo = useKeyPress("<key combo>", {
  useKeyboardJS: true
});
```
