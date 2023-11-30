import { storiesOf } from "@storybook/react";
import * as React from "react";
import { useDevicePixelRatio } from "../src";
import ShowDocs from "./util/ShowDocs";

const Demo = () => {
  const { ratio } = useDevicePixelRatio();

  return (
    <main>
      <article>
        <button>{ratio}</button>
      </article>
    </main>
  );
};

storiesOf("State/useDefault", module)
  .add("Docs", () => <ShowDocs md={require("../docs/useDevicePixelRatio.md")} />)
  .add("Demo", () => <Demo />);
