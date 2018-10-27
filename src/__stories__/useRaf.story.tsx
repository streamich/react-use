import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useRaf} from '..';

const Demo = () => {
  const frames = useRaf(5000, 1000);

  return (
    <div>
      Frames: {frames}
    </div>
  );
};

storiesOf('useRaf', module)
  .add('Example', () =>
    <Demo/>
  )
