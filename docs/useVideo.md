# `useVideo`

Creates `<video>` element, tracks its state and exposes playback controls.


## Usage

```jsx
import {useVideo} from 'react-use';

const Demo = () => {
  const [video, state, controls, ref] = useVideo(
    <video src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" autoPlay />
  );

  return (
    <div>
      {video}
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={controls.pause}>Pause</button>
      <button onClick={controls.play}>Play</button>
      <br/>
      <button onClick={controls.mute}>Mute</button>
      <button onClick={controls.unmute}>Un-mute</button>
      <br/>
      <button onClick={() => controls.volume(.1)}>Volume: 10%</button>
      <button onClick={() => controls.volume(.5)}>Volume: 50%</button>
      <button onClick={() => controls.volume(1)}>Volume: 100%</button>
      <br/>
      <button onClick={() => controls.seek(state.time - 5)}>-5 sec</button>
      <button onClick={() => controls.seek(state.time + 5)}>+5 sec</button>
    </div>
  );
};
```


## Reference

```jsx
const [video, state, controls, ref] = useVideo(props);
const [video, state, controls, ref] = useVideo(<video {...props}/>);
```

`video` is React's `<video>` element that you have to insert somewhere in your
render tree, for example:

```jsx
<div>{video}</div>
```

`state` tracks the state of the video and has the following shape:

```json
{
  "buffered": [
    {
      "start": 0,
      "end": 425.952625
    }
  ],
  "time": 5.244996,
  "duration": 425.952625,
  "paused": false,
  "muted": false,
  "volume": 1
}
```

`controls` is a list collection of methods that allow you to control the
playback of the video, it has the following interface:

```ts
interface AudioControls {
  play: () => Promise<void> | void;
  pause: () => void;
  mute: () => void;
  unmute: () => void;
  volume: (volume: number) => void;
  seek: (time: number) => void;
}
```

`ref` is a React reference to HTML `<video>` element, you can access the element by
`ref.current`, note that it may be `null`.

And finally, `props` &mdash; all props that `<video>` accepts.