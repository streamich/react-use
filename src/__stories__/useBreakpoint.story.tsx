import { number, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import { useBreakpoint } from "..";
import ShowDocs from "./util/ShowDocs";
const Demo = () => {
  const breakpoint = useBreakpoint();
  const breakpointB = useBreakpoint({ mobileM: 350, laptop: 1024, tablet: 768 });
  return (
    <div>
      <p>{"try resize your window"}</p>
      <p>{"useBreakpoint() #default : { laptopL: 1440, laptop: 1024, tablet: 768 }"}</p>
      <p>{breakpoint}</p>
      <p>{"useBreakpoint({ mobileM: 350, laptop: 1024, tablet: 768 })"}</p>
      <p>{breakpointB}</p>
    </div>
  );
};

storiesOf("sensors|useBreakpoint", module)
  .addDecorator(withKnobs)
  .add("Docs", () => <ShowDocs md={require("../../docs/useBreakpoint.md")} />)
  .add("Demo", () => {
    return <Demo />;
  });
