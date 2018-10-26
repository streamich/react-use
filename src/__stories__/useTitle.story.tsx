import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useTitle} from '..';

const Demo = () => {
  useTitle('Hello world!');

  return null;
};

storiesOf('useTitle', module)
  .add('Example', () =>
    <Demo/>
  )
