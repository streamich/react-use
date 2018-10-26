import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useToggle} from '..';

const Demo = () => {
  const [on, toggle] = useToggle(true);

  return (
    <div>
      <div>{on ? 'ON' : 'OFF'}</div>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
};

storiesOf('useToggle', module)
  .add('Example', () =>
    <Demo/>
  )
