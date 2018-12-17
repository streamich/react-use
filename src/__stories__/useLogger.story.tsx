import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useLogger} from '..';
import ShowDocs from '../util/ShowDocs';

const Demo = (props) => {
  useLogger('Demo', props);
  return null;
};

storiesOf('Lifecycles/useLogger', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useLogger.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
