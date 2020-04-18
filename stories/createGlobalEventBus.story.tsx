import { storiesOf } from "@storybook/react";
import React, { FC, useState } from "react";
import { createGlobalEventBus } from "../src";
import ShowDocs from "./util/ShowDocs";

const useEventbus = createGlobalEventBus();

const CompA: FC = () => {
  const emit = useEventbus();

  return (
    <p>
      This component can{" "}
      <button onClick={() => emit(Date.now())}>emit an event</button>.
    </p>
  );
};

const CompB: FC = () => {
  const [latestEvent, setLatestEvent] = useState();

  useEventbus(time => {
    setLatestEvent(time);
  });

  return (
    <p>
      This component keeps track of the latest event:{" "}
      {latestEvent || <em>none</em>}
    </p>
  );
};

const CompC: FC = () => {
  const [latestEvent, setLatestEvent] = useState();

  const emit = useEventbus(time => {
    setLatestEvent(time);
  });

  return (
    <p>
      This component does both. The latest event is:{" "}
      {latestEvent || <em>none</em>} and{" "}
      <button onClick={() => emit("hello")}>emit 'hello'</button>
    </p>
  );
};

const Demo: FC = () => {
  return (
    <div>
      <CompA />
      <CompB />
      <CompC />
    </div>
  );
};

storiesOf("Side effects|createGlobalEventBus", module)
  .add("Docs", () => (
    <ShowDocs md={require("../docs/createGlobalEventBus.md")} />
  ))
  .add("Demo", () => <Demo />);
