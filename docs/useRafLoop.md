# `useRafLoop`
React hook that calls given function inside the RAF loop without re-rendering parent component if not needed. Loop stops automatically on component unmount.  
Provides controls to stop and start loop manually.

2nd parameter is dependencies list as in `useEffect` hook.

## Usage
```jsx
import * as React from 'react';
import { useRafLoop } from 'react-use';

const Demo = () => {
  const [ticks, setTicks] = React.useState(0);

  const [loopStop, isActive, loopStart] = useRafLoop(() => {
    setTicks(ticks + 1);
  });

  return (
    <div>
      <div>RAF triggered: {ticks} (times)</div>
      <br />
      <button onClick={isActive ? loopStop : loopStart}>{isActive ? 'STOP' : 'START'}</button>
    </div>
  );
};
```

## Reference
```ts
const [stopLoop, isActive, startLoop] = useRafLoop(callback: CallableFunction, deps?: DependencyList);
```
* `callback` - function to call each RAF tick

