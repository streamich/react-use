import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useMotion} from '..';

const Demo = () => {
  const state = useMotion();

  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};

storiesOf('useMotion', module)
  .add('Example', () =>
    <Demo/>
  )
