import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useTitle } from '../src';
import NewTabStory from './util/NewTabStory';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  useTitle('Hello world!');

  return <NewTabStory>Title should be "Hello world!"</NewTabStory>;
};

storiesOf('Side effects/useTitle', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useTitle.md')} />)
  .add('Demo', () => <Demo />);
