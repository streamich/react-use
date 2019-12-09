import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useLocalStorage } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [value, setValue] = useLocalStorage('hello-key', 'foo');

  return (
    <div>
      <div>Value: {value}</div>
      <button onClick={() => setValue('bar')}>bar</button>
      <button onClick={() => setValue('baz')}>baz</button>
    </div>
  );
};

storiesOf('Side effects|useLocalStorage', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useLocalStorage.md')} />)
  .add('Demo', () => <Demo />);
