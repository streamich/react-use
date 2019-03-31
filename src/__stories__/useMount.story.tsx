import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useMount} from '..';
import ShowDocs from '../util/ShowDocs';
import ConsoleStory from './util/ConsoleStory'

const Demo = () => {
  useMount(() => console.log('MOUNTED'));

  return <ConsoleStory />;
};

storiesOf('Lifecycles|useMount', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useMount.md')} />)
  .add('Demo', () => <Demo/>)
