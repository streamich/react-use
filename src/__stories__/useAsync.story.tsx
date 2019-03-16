import * as React from "react";
import { storiesOf } from "@storybook/react";
import { useAsync } from "..";
import ShowDocs from "../util/ShowDocs";

const fn = () =>
  new Promise<string>(resolve => {
    setTimeout(() => {
      resolve("RESOLVED");
    }, 1000);
  });

const Demo = () => {
  const { loading, value } = useAsync<string>(fn);

  return (
    <div>{loading ? <div>Loading...</div> : <div>Value: {value}</div>}</div>
  );
};

const fnRetry = () =>
  new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) {
        reject(new Error("Random error!"));
      } else {
        resolve("RESOLVED");
      }
    }, 1000);
  });

const DemoRetry = () => {
  const { loading, value, error, retry } = useAsync<string>(fnRetry);

  return (
    <>
      <div>
        {loading ? <div>Loading...</div> : <div>Value: {value || "?"}</div>}
      </div>
      {error ? (
        <div>
          <p>Errored: {error.message}</p>
          <a href="javascript:void 0" onClick={() => retry()}>
            Retry?
          </a>
        </div>
      ) : null}
    </>
  );
};

storiesOf("Side effects|useAsync", module)
  .add("Docs", () => <ShowDocs md={require("../../docs/useAsync.md")} />)
  .add("Demo", () => <Demo />)
  .add("Demo: retry", () => <DemoRetry />);
