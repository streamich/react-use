import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useWindowSize} from '..';

const Demo = () => {
  const {width, height} = useWindowSize();

  return (
    <div>
      <div>width: {width}</div>
      <div>height: {height}</div>
    </div>
  );
};

storiesOf('useWindowSize', module)
  .add('Example', () =>
    <Demo/>
  )
