import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useMount} from '..';

const Demo = () => {
  useMount(() => console.log('MOUNTED'));
  return null;
};

storiesOf('useMount', module)
  .add('Example', () =>
    <Demo/>
  )
