import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useTimeout} from '..';

const Demo = () => {
  const ready = useTimeout(2e3);

  return (
    <div>
      Ready: {ready ? 'Yes' : 'No'}
    </div>
  );
};

storiesOf('useTimeout', module)
  .add('Example', () =>
    <Demo/>
  )
