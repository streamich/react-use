import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useSet } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [set, { add, has, remove, reset, toggle }] = useSet(new Set(['hello']));

  return (
    <div>
      <button onClick={() => add(String(Date.now()))}>Add</button>
      <button onClick={() => reset()}>Reset</button>
      <button onClick={() => remove('hello')} disabled={!has('hello')}>
        Remove 'hello'
      </button>
      <button onClick={() => toggle('hello')}>Toggle 'hello'</button>
      <pre>{JSON.stringify(Array.from(set), null, 2)}</pre>
    </div>
  );
};

storiesOf('State/useSet', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useSet.md')} />)
  .add('Demo', () => <Demo />);
