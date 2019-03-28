import { storiesOf } from "@storybook/react";
import * as React from "react";
import { useKeyPressEvent } from "..";
import ShowDocs from "../util/ShowDocs";

const Demo = () => {
  const [count, setCount] = React.useState(0);

  const increment = () => {
    console.log('INCREMENT');
    setCount(count => ++count);
  };
  const decrement = () => {
    console.log('DECREMENT');
    setCount(count => --count);
  };
  const reset = () => setCount(() => 0);

  useKeyPressEvent(']', increment, increment);
  useKeyPressEvent('[', decrement, decrement);
  useKeyPressEvent('r', reset);

  return (
    <div>
      <style dangerouslySetInnerHTML={{__html: `code {color: red}`}} />
      <p>
        Try pressing <code>[</code>, <code>]</code>, and <code>r</code> to
        see the count incremented and decremented.</p>
      <p>Count: {count}</p>
    </div>
  );
};

storiesOf("Sensors/useKeyPressEvent", module)
  .add("Docs", () => <ShowDocs md={require("../../docs/useKeyPressEvent.md")} />)
  .add("Demo", () => <Demo />);
