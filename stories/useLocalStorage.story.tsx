import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useLocalStorage } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [value, setValue] = useLocalStorage('hello-key', 'foo');
  const [removableValue, setRemovableValue, remove] = useLocalStorage('removeable-key');

  return (
    <div>
      <div>Value: {value}</div>
      <button onClick={() => setValue('bar')}>bar</button>
      <button onClick={() => setValue('baz')}>baz</button>
      <br />
      <br />
      <div>Removable Value: {removableValue}</div>
      <button onClick={() => setRemovableValue('foo')}>foo</button>
      <button onClick={() => setRemovableValue('bar')}>bar</button>
      <button onClick={() => remove()}>Remove</button>
    </div>
  );
};

storiesOf('Side effects/useLocalStorage', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useLocalStorage.md')} />)
  .add('Demo', () => <Demo />);
