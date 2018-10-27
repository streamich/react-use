import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useCounter} from '..';

const Demo = () => {
  const [value, inc, set] = useCounter();

  return (
    <div>
      <div>{value}</div>
      <button onClick={() => inc()}>Increment</button>
      <button onClick={() => set(100)}>Set 100</button>
    </div>
  );
};

storiesOf('useCounter', module)
  .add('Example', () =>
    <Demo/>
  )
