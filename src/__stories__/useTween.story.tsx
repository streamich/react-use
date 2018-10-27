import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useTween} from '..';

const Demo = () => {
  const t = useTween();

  return (
    <div>
      Tween: {t}
    </div>
  );
};

storiesOf('useTween', module)
  .add('Example', () =>
    <Demo/>
  )
