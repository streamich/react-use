# `useRafLoop`

This hook call given function within the RAF loop without re-rendering parent component.
Loop stops automatically on component unmount.

Additionally hook provides methods to start/stop loop and check current state.

## Usage

```jsx
import * as React from 'react';
import { useRafLoop, useUpdate } from 'react-use';

const Demo = () => {
  const [ticks, setTicks] = React.useState(0);
  const [lastCall, setLastCall] = React.useState(0);
  const update = useUpdate();

  const [loopStop, loopStart, isActive] = useRafLoop((time) => {
    setTicks(ticks => ticks + 1);
    setLastCall(time);
  });

  return (
    <div>
      <div>RAF triggered: {ticks} (times)</div>
      <div>Last high res timestamp: {lastCall}</div>
      <br />
      <button onClick={() => {
        isActive() ? loopStop() : loopStart();
        update();
      }}>{isActive() ? 'STOP' : 'START'}</button>
    </div>
  );
};
```

## Reference

```ts
const [stopLoop, startLoop, isActive] = useRafLoop(callback: FrameRequestCallback, initiallyActive = true);
```
* **`callback`**_: `(time: number)=>void`_ &mdash; function to call each RAF tick.
    * **`time`**_: `number`_ &mdash; DOMHighResTimeStamp, which indicates the current time (based on the number of milliseconds since time origin).
* **`initiallyActive`**_: `boolean`_ &mdash; whether loop should be started at initial render.
* Return
    * **`stopLoop`**_: `()=>void`_ &mdash; stop loop if it is active.
    * **`startLoop`**_: `()=>void`_ &mdash; start loop if it was inactive.
    * **`isActive`**_: `()=>boolean`_ &mdash; _true_ if loop is active.

