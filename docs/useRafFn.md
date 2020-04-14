# `useRafFn`

React animation hook that based on `requestAnimationFrame` encapsulates a series of methods for controlling the operation of animation.

## Usage

```jsx
import { useRafFn } from 'react-use';

const Demo = () => {
  const [elapsed, rafProps] = useRafFn(5000);

  rafProps.useOnComplete(() => {
    console.log('animate completed');
  })

  return (
    <div>
      <div
        style={{
          width: 50,
          height: 50,
          backgroundColor: '#3cf',
          transform: `translateX(${elapsed * 500}px)`
        }} />
      <ul>
        <li>elapsed: {elapsed}</li>
        <li>paused: {rafProps.paused.toString()}</li>
        <li>completed: {rafProps.completed.toString()}</li>
      </ul>
      <div>
        <input
          type="range"
          min={0} max={1} step={0.01}
          value={elapsed}
          onChange={e => rafProps.seek(+e.target.value)}
        />
      </div>
      <button onClick={rafProps.play}>play</button>
      <button onClick={rafProps.pause}>pause</button>
      <button onClick={rafProps.stop}>stop</button>
      <button onClick={rafProps.restart}>restart</button>
      <button onClick={rafProps.reverse}>reverse</button>
    </div>
  );
};
```

## Reference

```ts
const [
  elapsed: number,
  {
    play: () => void,
    pause: () => void,
    restart: () => void,
    stop: () => void,
    seek: (currentElapsed: number) => void,
    reverse: () => void,
    completed: boolean,
    paused: boolean,
    useOnComplete: (fn: () => void) => void
  }
] = useRafFn(ms?: number, autoPlay?: boolean);

```

- `ms` &mdash; milliseconds for how long to keep re-rendering component, defaults to `1000`.
- `autoPlay` &mdash; Whether to automatically run animation, defaults to `false`.
