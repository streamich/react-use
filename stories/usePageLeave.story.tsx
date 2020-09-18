import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { usePageLeave } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  usePageLeave(action('onPageLeave'));

  return (
    <div>
      Try leaving the page and see logs in <code>Actions</code> tab.
    </div>
  );
};

storiesOf('Sensors/usePageLeave', module)
  .add('Docs', () => <ShowDocs md={require('../docs/usePageLeave.md')} />)
  .add('Default', () => <Demo />);
