import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useFullscreen} from '..';
import ShowDocs from '../util/ShowDocs';

const Demo = () => {
  const ref = React.useRef(null)
  const videoRef = React.useRef(null)
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

storiesOf('UI|useFullscreen', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useFullscreen.md')} />)
  .add('Demo', () => <Demo />)
