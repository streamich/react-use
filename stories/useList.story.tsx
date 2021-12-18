import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useList } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [
    list,
    { set, push, updateAt, insertAt, update, updateFirst, sort, filter, removeAt, clear, reset },
  ] = useList([1, 2, 3, 4, 5]);

  return (
    <div>
      <button onClick={() => set([1, 2, 3])}>Set to [1, 2, 3]</button>
      <br />
      <button onClick={() => push(Date.now())}>Push timestamp</button>
      <br />
      <button onClick={() => insertAt(1, Date.now())}>Insert new value at index 1</button>
      <br />
      <button onClick={() => updateAt(1, Date.now())}>Update value at index 1</button>
      <br />
      <button onClick={() => removeAt(1)}>Remove element at index 1</button>
      <br />
      <button onClick={() => filter((item) => item % 2 === 0)}>Filter even values</button>
      <br />
      <button onClick={() => update((item) => item % 2 === 0, Date.now())}>
        Update all even values with timestamp
      </button>
      <br />
      <button onClick={() => updateFirst((item) => item % 2 === 0, Date.now())}>
        Update first even value with timestamp
      </button>
      <br />
      <button onClick={() => sort((a, b) => a - b)}>Sort ascending</button>
      <br />
      <button onClick={() => sort((a, b) => b - a)}>Sort descending</button>
      <br />
      <button onClick={clear}>Clear</button>
      <br />
      <button onClick={reset}>Reset</button>
      <br />
      <pre>{JSON.stringify(list, null, 2)}</pre>
    </div>
  );
};

interface UpsertDemoType {
  id: string;
  text: string;
}

const upsertPredicate = (a: UpsertDemoType, b: UpsertDemoType) => a.id === b.id;
const upsertInitialItems: UpsertDemoType[] = [
  { id: '1', text: 'Sample' },
  { id: '2', text: 'Example' },
];
const UpsertDemo = () => {
  const [list, { upsert, reset, removeAt }] = useList(upsertInitialItems);

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
      {list.map((item, index) => (
        <div key={item.id}>
          <input
            value={item.text}
            onChange={(e) => upsert(upsertPredicate, { ...item, text: e.target.value })}
          />
          <button onClick={() => removeAt(index)}>Remove</button>
        </div>
      ))}
      <button
        onClick={() => upsert(upsertPredicate, { id: (list.length + 1).toString(), text: '' })}>
        Add item
      </button>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
};

storiesOf('State/useList', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useList.md')} />)
  .add('Demo', () => <Demo />)
  .add('Upsert Demo', () => <UpsertDemo />);
