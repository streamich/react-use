import { storiesOf } from '@storybook/react';
import * as React from 'react';
import ShowDocs from './util/ShowDocs';
import { useRafLoop } from '..';

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

storiesOf('Side effects|useRafLoop', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useRafLoop.md')} />)
  .add('Demo', () => <Demo />);
