import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useGeolocation} from '..';

const Demo = () => {
  const state = useGeolocation();

  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};

storiesOf('useGeolocation', module)
  .add('Example', () =>
    <Demo/>
  )
