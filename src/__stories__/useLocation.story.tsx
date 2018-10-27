import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useLocation} from '..';

const Demo = () => {
  const state = useLocation();

  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};

storiesOf('useLocation', module)
  .add('Example', () =>
    <Demo/>
  )
