import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useUnmount} from '..';
import ShowDocs from '../util/ShowDocs';
import ConsoleStory from './util/ConsoleStory'

const Demo = () => {
  useUnmount(() => console.log('UNMOUNTED'));

  return <ConsoleStory />;
};

storiesOf('Lifecycles|useUnmount', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useUnmount.md')} />)
  .add('Demo', () => <Demo/>)

