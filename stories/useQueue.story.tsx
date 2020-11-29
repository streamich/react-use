import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useQueue } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const { add, remove, first, last, size } = useQueue();
  return (
    <div>
      <ul>
        <li>first: {first}</li>
        <li>last: {last}</li>
        <li>size: {size}</li>
      </ul>
      <button onClick={() => add((last || 0) + 1)}>Add</button>
      <button onClick={() => remove()}>Remove</button>
    </div>
  );
};

storiesOf('State/useQueue', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useQueue.md')} />)
  .add('Demo', () => <Demo />);
