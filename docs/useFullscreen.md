# `useFullscreen`

Display an element full-screen, optional fallback for fullscreen video on iOS.

## Usage

```jsx
import {useFullscreen, useToggle} from 'react-use';

const Demo = () => {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const [show, toggle] = useToggle(false);
  const isFullscreen = useFullscreen(ref, show, {
    onClose: () => toggle(false),
    video: videoRef
  });

  return (
    <div ref={ref} style={{ backgroundColor: "white" }}>
      <div>{isFullscreen ? "Fullscreen" : "Not fullscreen"}</div>
      <button onClick={() => toggle()}>Toggle</button>
      <video
        ref={videoRef}
        src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
        autoPlay
      />
    </div>
  );
};
```

## Reference

```ts
useFullscreen(ref, show, {onClose, video})
```
