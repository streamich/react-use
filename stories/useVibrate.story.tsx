import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useVibrate, useToggle } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [vibrating, toggleVibrating] = useToggle(false);

  useVibrate(vibrating, [300, 100, 200, 100, 1000, 300]);

  return (
    <div>
      <button onClick={toggleVibrating}>{vibrating ? 'Stop' : 'Vibrate'}</button>
    </div>
  );
};

storiesOf('UI/useVibrate', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useVibrate.md')} />)
  .add('Demo', () => <Demo />);
