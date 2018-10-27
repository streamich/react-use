import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useNetwork} from '..';

const Demo = () => {
  const state = useNetwork();

  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};

storiesOf('useNetwork', module)
  .add('Example', () =>
    <Demo/>
  )
