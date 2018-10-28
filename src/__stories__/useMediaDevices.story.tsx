import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useMediaDevices} from '..';
import ShowDocs from '../util/ShowDocs';

const Demo = () => {
  const state = useMediaDevices();

  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};

storiesOf('useMediaDevices', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useMediaDevices.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
