import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useLogger} from '..';

const Demo = (props) => {
  useLogger('Demo', props);
  return null;
};

storiesOf('useLogger', module)
  .add('Example', () =>
    <Demo/>
  )
