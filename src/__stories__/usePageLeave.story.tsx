import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {usePageLeave} from '..';

const Demo = () => {
  usePageLeave(action('onPageLeave'));

  return (
    <div>
      Try leaving the page and see logs in <code>Actions</code> tab.
    </div>
  );
};

storiesOf('Sensors|usePageLeave', module).add('Default', () => <Demo />);
