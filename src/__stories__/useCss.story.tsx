import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useCss} from '..';

const Demo = () => {
  const className = useCss({
    color: 'red',
    border: '1px solid red',
    '&:hover': {
      color: 'blue',
    },
  });

  return (
    <div className={className}>
      hello
    </div>
  );
};

storiesOf('useCss', module)
  .add('Example', () =>
    <Demo/>
  )
