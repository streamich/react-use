import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useMap} from '..';
import ShowDocs from '../util/ShowDocs';

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

storiesOf('State|useMap', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useMap.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
