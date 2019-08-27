import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useDebounce } from '..';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [state, setState] = React.useState('Typing stopped');
  const [val, setVal] = React.useState('');
  const [debouncedValue, setDebouncedValue] = React.useState('');

  const { clear, flush } = useDebounce(
    () => {
      setState('Typing stopped');
      setDebouncedValue(val);
    },
    2000,
    [val]
  );

  return (
    <div>
      <input
        type="text"
        value={val}
        placeholder="Debounced input"
        onChange={({ currentTarget }) => {
          setState('Waiting for typing to stop...');
          setVal(currentTarget.value);
        }}
      />
      <div>{state}</div>
      <div>Debounced value: {debouncedValue}</div>
      <button onClick={clear} type="button">
        Clear
      </button>
      <button onClick={flush} type="button">
        Flush
      </button>
    </div>
  );
};

storiesOf('Side effects|useDebounce', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useDebounce.md')} />)
  .add('Demo', () => <Demo />);
