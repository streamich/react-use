import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useUnmount} from '..';
import ShowDocs from '../util/ShowDocs';

const Demo = () => {
  useUnmount(() => console.log('UNMOUNTED'));
  return null;
};

storiesOf('Lifecycles/useUnmount', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useUnmount.md')} />)
  .add('Demo', () =>
    <Demo/>
  )

