import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useLocalStorage } from '../src';
import ShowDocs from './util/ShowDocs';

const StorageKey = ({ storageKey }) => {
  const [value, setValue, remove] = useLocalStorage(storageKey);
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
  useLocalStorage('hello-key', 'initialValue');
  useLocalStorage('no-initial-value');

  return (
    <div>
      <StorageKey storageKey="hello-key" />
      <StorageKey storageKey="hello-key" />
      <StorageKey storageKey="no-initial-value-key" />
    </div>
  );
};

storiesOf('Side effects|useLocalStorage', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useLocalStorage.md')} />)
  .add('Demo', () => <Demo />);
