import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useIdle } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [idleDelay, setIdleDelay] = React.useState(3e3);
  const isIdle = useIdle(idleDelay);

  return (
    <div>
      Idle delay ms:{' '}
      <input
        type="number"
        value={idleDelay}
        onChange={({ target }) => setIdleDelay(+target.value)}
      />
      <div>User is idle: {isIdle ? 'Yes' : 'No'}</div>
    </div>
  );
};

storiesOf('Sensors/useIdle', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useIdle.md')} />)
  .add('Demo', () => <Demo />);
