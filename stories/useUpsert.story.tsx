import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useUpsert } from '../src';
import ShowDocs from './util/ShowDocs';

interface DemoType {
  id: string;
  text: string;
}

const initialItems: DemoType[] = [
  { id: '1', text: 'Sample' },
  { id: '2', text: '' },
];

const Demo = () => {
  const comparisonFunction = (a: DemoType, b: DemoType) => {
    return a.id === b.id;
  };
  const [list, { set, upsert, remove }] = useUpsert(comparisonFunction, initialItems);

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
      {list.map((item: DemoType, index: number) => (
        <div key={item.id}>
          <input value={item.text} onChange={(e) => upsert({ ...item, text: e.target.value })} />
          <button onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <button onClick={() => upsert({ id: (list.length + 1).toString(), text: '' })}>
        Add item
      </button>
      <button onClick={() => set([])}>Reset</button>
    </div>
  );
};

storiesOf('State/useUpsert', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useUpsert.md')} />)
  .add('Demo', () => <Demo />);
