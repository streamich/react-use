import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useRafLoop, useUpdate } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [ticks, setTicks] = React.useState(0);
  const [lastCall, setLastCall] = React.useState(0);
  const update = useUpdate();

  const [loopStop, loopStart, isActive] = useRafLoop((time) => {
    setTicks((ticks) => ticks + 1);
    setLastCall(time);
  });

  return (
    <div>
      <div>RAF triggered: {ticks} (times)</div>
      <div>Last high res timestamp: {lastCall}</div>
      <br />
      <button
        onClick={() => {
          isActive() ? loopStop() : loopStart();
          update();
        }}>
        {isActive() ? 'STOP' : 'START'}
      </button>
    </div>
  );
};

storiesOf('Side effects/useRafLoop', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useRafLoop.md')} />)
  .add('Demo', () => <Demo />);
