import { storiesOf } from "@storybook/react";
import * as React from "react";
import {useKey} from "..";
import ShowDocs from "../util/ShowDocs";
import {CenterStory} from "./util/CenterStory";

const Demo = () => {
  const [count, setCount] = React.useState(0);

  const increment = () => setCount(count => ++count);
  const decrement = () => setCount(count => --count);
  const reset = () => setCount(count => 0);

  useKey(']', increment);
  useKey('[', decrement);
  useKey('r', reset);

  return (
    <CenterStory>
      <style dangerouslySetInnerHTML={{__html: `code {color: red}`}} />
      <p>
        Try pressing <code>[</code>, <code>]</code>, and <code>r</code> to
        see the count incremented and decremented.</p>
      <p>Count: {count}</p>
    </CenterStory>
  );
};

const Demo2 = () => {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount(count => ++count);
  useKey('ArrowUp', increment);

  return (
    <div>
      Press arrow up: {count}
    </div>
  );
};

storiesOf("Sensors/useKey", module)
  .add("Docs", () => <ShowDocs md={require("../../docs/useKeyPressEvent.md")} />)
  .add("Demo", () => <Demo />)
  .add("Simple counter", () => <Demo2 />);
