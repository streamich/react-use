import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useBattery} from '..';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const state = useBattery();

  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};

storiesOf('Sensors|useBattery', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useBattery.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
