import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useMount } from '..';
import ConsoleStory from './util/ConsoleStory';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  useMount(() => console.log('MOUNTED'));

  return <ConsoleStory />;
};

storiesOf('Lifecycle|useMount', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useMount.md')} />)
  .add('Demo', () => <Demo />);
