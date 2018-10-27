import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useLifecycles} from '..';

const Demo = () => {
  useLifecycles(() => console.log('MOUNTED'), () => console.log('UNMOUNTED'));
  return null;
};

storiesOf('useLifecycles', module)
  .add('Example', () =>
    <Demo/>
  )
