# `useFullscreen`

Display an element full-screen, optional fallback for fullscreen video on iOS.

## Usage

```jsx
import React, { useRef } from 'react';
import { useFullscreen } from 'react-use';

const Demo = () => {
  const ref = useRef(null)
  const videoRef = useRef(null)
  const [fullscreen, toggle] = useFullscreen(ref, videoRef);

  return (
    <div ref={ref} style={{backgroundColor: 'white'}}>
      <div>{fullscreen ? 'Fullscreen' : 'Not fullscreen'}</div>
      <button onClick={() => toggle()}>Toggle</button>
      <button onClick={() => toggle(true)}>set ON</button>
      <button onClick={() => toggle(false)}>set OFF</button>
      <video ref={videoRef} src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" autoPlay />
    </div>
  );
};
```

## Reference

```ts
useFullscreen(
  ref: RefObject<Element>,
  videoRef?: RefObject<HTMLVideoElement>
): [boolean, (value?: boolean) => void];
```
