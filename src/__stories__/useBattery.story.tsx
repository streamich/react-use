import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useBattery} from '..';

const Demo = () => {
  const state = useBattery();

  return (
    <div>
      <pre>
        {JSON.stringify(state, null, 2)}
      </pre>
    </div>
  );
};

storiesOf('useBattery', module)
  .add('Example', () =>
    <Demo/>
  )
