import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useMap } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [map, { set, remove, reset }] = useMap({
    hello: 'there',
  });

  return (
    <div>
      <button onClick={() => set(String(Date.now()), new Date().toJSON())}>Add</button>
      <button onClick={() => reset()}>Reset</button>
      <button onClick={() => remove('hello')} disabled={!map.hello}>
        Remove 'hello'
      </button>
      <pre>{JSON.stringify(map, null, 2)}</pre>
    </div>
  );
};

storiesOf('State/useMap', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useMap.md')} />)
  .add('Demo', () => <Demo />);
