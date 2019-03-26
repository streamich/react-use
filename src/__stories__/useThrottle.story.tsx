import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { useThrottle } from '..';
import ShowDocs from '../util/ShowDocs';

const Demo = () => {
  const [status, setStatus] = React.useState('Updating stopped');
  const [value, setValue] = React.useState('');
  const [throttledValue, setThrottledValue] = React.useState('');

  useThrottle(
    () => {
      setStatus('Waiting for input...');
      setThrottledValue(value);
    },
    2000,
    [value]
  );

  return (
    <div>
      <input
        type="text"
        value={value}
        placeholder="Throttled input"
        onChange={({ currentTarget }) => {
          setStatus('Updating stopped');
          setValue(currentTarget.value);
        }}
      />
      <div>{status}</div>
      <div>Throttled value: {throttledValue}</div>
    </div>
  );
};

storiesOf('Side effects|useThrottle', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useThrottle.md')} />)
  .add('Demo', () => <Demo />);
