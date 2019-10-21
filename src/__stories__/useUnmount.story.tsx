import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import * as React from 'react';
import { useUnmount } from '..';
import ActionsTabStory from './util/ActionsTabStory';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  useUnmount(action('UNMOUNTED'));

  return <ActionsTabStory />;
};

storiesOf('Lifecycle|useUnmount', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useUnmount.md')} />)
  .add('Demo', () => <Demo />);
