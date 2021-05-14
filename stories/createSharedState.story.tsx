import { storiesOf } from "@storybook/react";
import React, { FC } from "react";
import { createSharedState } from "../src";
import ShowDocs from "./util/ShowDocs";

const useSharedValue = createSharedState<number>(0);

const CompA: FC = () => {
  const [value, setValue] = useSharedValue();

  return <button onClick={() => setValue(value + 1)}>+</button>;
};

const CompB: FC = () => {
  const [value, setValue] = useSharedValue();

  return <button onClick={() => setValue(value - 1)}>-</button>;
};

const Demo: FC = () => {
  const [value] = useSharedValue();
  return (
    <div>
      <p>{value}</p>
      <CompA />
      <CompB />
    </div>
  );
};

storiesOf("State/createSharedState", module)
  .add("Docs", () => <ShowDocs md={require("../docs/createSharedState.md")} />)
  .add("Demo", () => <Demo />);
