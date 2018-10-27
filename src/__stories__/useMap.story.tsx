import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useMap} from '..';

const Demo = () => {
  const [map, {set, reset}] = useMap({
    hello: 'there',
  });

  return (
    <div>
      <pre>{JSON.stringify(map, null, 2)}</pre>
      <button onClick={() => set(String(Date.now()), (new Date()).toJSON())}>Add</button>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
};

storiesOf('useMap', module)
  .add('Example', () =>
    <Demo/>
  )
