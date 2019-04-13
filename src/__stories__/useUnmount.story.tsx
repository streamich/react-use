import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useUnmount } from '..';
import ConsoleStory from './util/ConsoleStory';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  useUnmount(() => console.log('UNMOUNTED'));

  return <ConsoleStory />;
};

storiesOf('Lifecycle|useUnmount', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useUnmount.md')} />)
  .add('Demo', () => <Demo />);
