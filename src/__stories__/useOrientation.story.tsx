import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useOrientation} from '..';

const Demo = () => {
  const state = useOrientation();

  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};

storiesOf('useOrientation', module)
  .add('Example', () =>
    <Demo/>
  )
