import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useSessionStorage } from '../src';
import ShowDocs from './util/ShowDocs';

const StorageKey = ({ storageKey }) => {
  const [value, setValue, remove] = useSessionStorage(storageKey);
  return (
    <div>
      <div>(Storage key: { storageKey }) Value: {value}</div>
      <button onClick={() => setValue('bar')}>Set to: bar</button>
      <button onClick={() => setValue('baz')}>Set to: baz</button>
      <button onClick={() => remove()}>Clear</button>
      <br />
    </div>
  );
}

const Demo = () => {
  useSessionStorage('hello-key', 'initialValue');
  useSessionStorage('no-initial-value');

  return (
    <div>
      <StorageKey storageKey="hello-key" />
      <StorageKey storageKey="hello-key" />
      <StorageKey storageKey="no-initial-value-key" />
    </div>
  );
};

storiesOf('Side effects|useSessionStorage', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useSessionStorage.md')} />)
  .add('Demo', () => <Demo />);
