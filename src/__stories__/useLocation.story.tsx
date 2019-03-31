import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useLocation} from '..';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const state = useLocation();

  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};

storiesOf('Sensors|useLocation', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useLocation.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
