import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useList } from '..';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [list, { clear, filter, push, remove, set, sort, updateAt }] = useList();

  return (
    <div>
      <button onClick={() => set([1, 2, 3])}>Set to [1, 2, 3]</button>
      <button onClick={() => push(Date.now())}>Push timestamp</button>
      <button onClick={() => updateAt(1, Date.now())}>Update value at index 1</button>
      <button onClick={() => remove(1)}>Remove element at index 1</button>
      <button onClick={() => filter(item => item % 2 === 0)}>Filter even values</button>
      <button onClick={() => sort((a, b) => a - b)}>Sort ascending</button>
      <button onClick={() => sort((a, b) => b - a)}>Sort descending</button>
      <button onClick={() => clear()}>Clear</button>
      <pre>{JSON.stringify(list, null, 2)}</pre>
    </div>
  );
};

storiesOf('State|useList', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useList.md')} />)
  .add('Demo', () => <Demo />);
