import { storiesOf } from "@storybook/react";
import React, { FC } from "react";
import { createGlobalState } from "../src";
import ShowDocs from "./util/ShowDocs";

const useMyGlobalState = createGlobalState<number>(0);

const SetValueDirectly: FC = () => {
  const [value, setValue] = useMyGlobalState(2);

  return (
    <div>
      <p>{value}</p>
      <div>
        <button onClick={() => setValue(value + 1)}>+</button>
        <button onClick={() => setValue(value - 1)}>-</button>
      </div>
    </div>
  );
};

const SetValueWithFunctionalUpdate: FC = () => {
  const [value, setValue] = useMyGlobalState(3);

  return (
    <div>
      <p>{value}</p>
      <div>
        <button onClick={() => setValue(val => val + 1)}>+</button>
        <button onClick={() => setValue(val => val - 1)}>-</button>
      </div>
    </div>
  );
};

const Demo: FC = () => {
  const [value] = useMyGlobalState(1);
  return (
    <div>
      <p>{value}</p>
      <SetValueDirectly />
      <SetValueWithFunctionalUpdate />
    </div>
  );
};

storiesOf("State|createGlobalState", module)
  .add("Docs", () => <ShowDocs md={require("../docs/createGlobalState.md")} />)
  .add("Demo", () => <Demo />);
