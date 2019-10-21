import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import * as React from 'react';
import { useMount } from '..';
import ActionsTabStory from './util/ActionsTabStory';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  useMount(action('MOUNTED'));

  return <ActionsTabStory />;
};

storiesOf('Lifecycle|useMount', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useMount.md')} />)
  .add('Demo', () => <Demo />);
