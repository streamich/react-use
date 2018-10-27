import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useAsync} from '..';

const fn = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve('RESOLVED');
  }, 1000);
});

const Demo = () => {
  const {loading, value} = useAsync(fn);

  return (
    <div>
      {loading
        ? <div>Loading...</div>
        : <div>Value: {value}</div>
      }
    </div>
  );
};

storiesOf('useAsync', module)
  .add('Example', () =>
    <Demo/>
  )
