import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useUnmount} from '..';

const Demo = () => {
  useUnmount(() => console.log('UNMOUNTED'));
  return null;
};

storiesOf('useUnmount', module)
  .add('Example', () =>
    <Demo/>
  )
