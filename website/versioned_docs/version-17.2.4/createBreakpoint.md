# createBreakpoint

## Usage

### use default breakpoint

```jsx
import React from "react";
import { createBreakpoint } from "react-use";

const useBreakpoint = createBreakpoint();

const Demo = () => {
  const breakpoint = useBreakpoint();

  if (breakpoint === "laptopL") return <div> This is very big Laptop </div>;
  else if (breakpoint == "laptop") return <div> This is Laptop</div>;
  else if (breakpoint == "tablet") return <div> This is Tablet</div>;
  else return <div> Too small!</div>;
};
```

:::info
laptopL: 1440, laptop: 1024, tablet: 768
:::

### use custom breakpoint

```jsx
import React from "react";
import { createBreakpoint } from "react-use";

const useBreakpoint = createBreakpoint({ XL: 1280, L: 768, S: 350 });

const Demo = () => {
  const breakpoint = useBreakpoint();

  if (breakpoint === "XL") return <div> XL </div>;
  else if (breakpoint == "L") return <div> LoL</div>;
  else if (breakpoint == "S") return <div> Sexyy</div>;
  else return <div> Wth</div>;
};
```

:::info
XL: 1280, L: 768, S: 350
:::
