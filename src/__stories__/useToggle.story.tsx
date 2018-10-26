import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useToggle} from '..';

const Demo = () => {
  const [on, toggle, set] = useToggle(true);

  return (
    <div>
      <div>{on ? 'ON' : 'OFF'}</div>
      <button onClick={toggle}>Toggle</button>
      <button onClick={() => set(true)}>set ON</button>
      <button onClick={() => set(false)}>set OFF</button>
    </div>
  );
};

storiesOf('useToggle', module)
  .add('Example', () =>
    <Demo/>
  )
