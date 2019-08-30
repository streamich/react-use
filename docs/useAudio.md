# `useAudio`

Creates `<audio>` element, tracks its state and exposes playback controls.


## Usage

```jsx
import {useAudio} from 'react-use';

const Demo = () => {
  const [audio, state, controls, ref] = useAudio({
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    autoPlay: true,
  });

  return (
    <div>
      {audio}
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
const [audio, state, controls, ref] = useAudio(props);
const [audio, state, controls] = useAudio(<audio {...props}/>);
```

`audio` is React's `<audio>` element that you have to insert somewhere in your
render tree, for example:

```jsx
<div>{audio}</div>
```

`state` tracks the state of the audio and has the following shape:

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
playback of the audio, it has the following interface:

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

`ref` is a React reference to HTML `<audio>` element, you can access the element by
`ref.current`, note that it may be `null`.

And finally, `props` &mdash; all props that `<audio>` accepts.