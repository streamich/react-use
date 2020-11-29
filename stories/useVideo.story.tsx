import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useVideo } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [video, state, controls, ref] = useVideo(
    <video src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" autoPlay={true} />
  );

  return (
    <div>
      {video}
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={controls.pause}>Pause</button>
      <button onClick={controls.play}>Play</button>
      <br />
      <button onClick={controls.mute}>Mute</button>
      <button onClick={controls.unmute}>Un-mute</button>
      <br />
      <button onClick={() => controls.volume(0.1)}>Volume: 10%</button>
      <button onClick={() => controls.volume(0.5)}>Volume: 50%</button>
      <button onClick={() => controls.volume(1)}>Volume: 100%</button>
      <br />
      <button onClick={() => controls.seek(state.time - 5)}>-5 sec</button>
      <button onClick={() => controls.seek(state.time + 5)}>+5 sec</button>
    </div>
  );
};

storiesOf('UI/useVideo', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useVideo.md')} />)
  .add('Demo', () => <Demo />);
