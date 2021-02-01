import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useFullscreen, useToggle } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [show, toggle] = useToggle(false);
  const ref = React.useRef(null);
  const videoRef = React.useRef(null);
  const isFullScreen = useFullscreen(ref, show, {
    onClose: () => toggle(false),
    video: videoRef,
  });

  const controls = (
    <div style={{ background: 'white', padding: '20px' }}>
      <div>{isFullScreen ? 'is full screen' : 'not full screen'}</div>
      <button onClick={() => toggle()}>Toggle</button>
      <button onClick={() => toggle(true)}>set ON</button>
      <button onClick={() => toggle(false)}>set OFF</button>
    </div>
  );

  return (
    <div>
      <div
        ref={ref}
        style={{
          backgroundColor: isFullScreen ? 'black' : 'grey',
          width: 400,
          height: 300,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <video
          ref={videoRef}
          style={{ width: '70%' }}
          src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
          autoPlay={true}
        />
        {isFullScreen && controls}
      </div>

      <br />
      <br />

      {!isFullScreen && controls}
    </div>
  );
};

storiesOf('UI/useFullscreen', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useFullscreen.md')} />)
  .add('Demo', () => <Demo />);
