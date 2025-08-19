# `useRafEffect`

React effect hook that runs inside a `window.requestAnimationFrame()` call. The signature and behavior is exactly the same as the `useEffect` hook.

The [`DOMHighResTimeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp) from `window.requestAnimationFrame()` is forwarded
as an argument to the provided callback.

## Differences from other `rAF` hooks

Animations may either be triggered by events/state changes, or started automatically.

If you want your animations to be triggred by state or data changes, consider `useRafEffect` and `useRafState`. This will trigger a single animation frame for each effect or state event.

- `useRafEffect` is best for changes from props, context, and hooks like `useMemo`. It pairs well with hooks for state management (Redux) or data fetching (SWR). For example, `useRafEffect` can render fetched data to a `<canvas>`.
- `useRafState` is best when that same component owns the state. For example, a browser event like `mousemove` on an `<svg>` may use `useRafState` and trigger other DOM changes (like element positioning or style). This wraps a regular `setState` in a `rAF`, with added intelligence.

If you want your animation start automatically or run continuously automatically, consider `useRaf` and `useRafLoop`. These hooks continuously re-render the component on each `rAF` tick, ideally at ~60fps. This is the opposite pattern from the above hooks; here the hook starts and stops the animation.

- `useRaf` runs for a specific, limited time period. For example, it can run an animation on for 5 seconds starting 1 second after mount.
- `useRafLoop` runs forever with start/stop callbacks, and a flag to start on mount.

## Usage

```jsx
import React from 'react';
import { useRefEffect } from 'react-use';

const Demo = ({ color }) => {
  const ref = React.useRef(); // for canvas demo; not required

  useRafEffect(
    (time) => {
      console.log('timestamp from window.requestAnimationFrame() start is ' + time);
      if (ref.current) {
        const canvasContext = ref.current.getContext('2d');
        canvasContext.clearRect(0, 0, 100, 100);
        canvasContext.fillStyle = '#f0f';
        canvasContext.fillRect(50, 50, 100, 100);
        canvasContext.fillStyle = '#0f0';
        canvasContext.fillRect(0, 0, 50, 50);
      }
      return (time) => {
        console.log('timestamp from window.requestAnimationFrame() cleanup is ' + time);
        // *OPTIONAL*
        // do something on unmount
      };
    },
    [color]
  ); // you can include deps array if necessary

  return <canvas ref={ref} width={100} height={100}></canvas>;
};
```
