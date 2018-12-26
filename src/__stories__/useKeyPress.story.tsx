import { storiesOf } from "@storybook/react";
import * as React from "react";
import { useKeyPress } from "..";
import ShowDocs from "../util/ShowDocs";

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

storiesOf("Sensors/useKeyPress", module)
  .add("Docs", () => <ShowDocs md={require("../../docs/useKeyPress.md")} />)
  .add("Demo", () => <Demo />);
