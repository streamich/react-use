import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useIdle} from '..';

const Demo = () => {
  const isIdle = useIdle(3e3);

  return (
    <div>
      <div>Use is idle: {isIdle ? 'Yes' : 'No'}</div>
    </div>
  );
};

storiesOf('useIdle', module)
  .add('Example', () =>
    <Demo/>
  )
