import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useOrientation} from '..';
import ShowDocs from '../util/ShowDocs';

const Demo = () => {
  const state = useOrientation();

  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};

storiesOf('Sensors/useOrientation', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useOrientation.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
