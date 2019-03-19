import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useTitle} from '..';
import ShowDocs from '../util/ShowDocs';

const Demo = () => {
  useTitle('Hello world!');

  return null;
};

storiesOf('Side effects|useTitle', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useTitle.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
