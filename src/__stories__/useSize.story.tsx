import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useSize} from '..';

const Demo = () => {
  const [sized, {width, height}] = useSize(
    <div style={{border: '1px solid red'}}>Size me up!</div>
  );

  return (
    <div>
      {sized}
      <div>width: {width}</div>
      <div>height: {height}</div>
    </div>
  );
};

storiesOf('useSize', module)
  .add('Example', () =>
    <Demo/>
  )
