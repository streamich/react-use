import * as React from "react";
import useWindowSize from "../../useWindowSize"

const WindowComponent = () => {
  const { width, height } = useWindowSize();
  return (
    <div>
      <p>
        <span>width - </span>
        <span data-testid="width">{width}</span>
      </p>
      <p>
        <span>height - </span>
        <span data-testid="height">{height}</span>
      </p>
    </div>
  );
}

export default WindowComponent