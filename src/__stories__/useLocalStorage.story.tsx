import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useLocalStorage} from '..';

const Demo = () => {
  const value = useLocalStorage('key');

  return (
    <div>
      <div>Value: {value}</div>
      <button onClick={() => {(window.localStorage as any)['key'] = String(Date.now())}}>Update</button>
    </div>
  );
};

storiesOf('useLocalStorage', module)
  .add('Example', () =>
    <Demo/>
  )
