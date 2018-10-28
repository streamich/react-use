import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useNetwork} from '..';
import ShowDocs from '../util/ShowDocs';

const Demo = () => {
  const state = useNetwork();

  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};

storiesOf('useNetwork', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useNetwork.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
