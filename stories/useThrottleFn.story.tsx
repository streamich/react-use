import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useCounter, useThrottleFn } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [value, setValue] = React.useState('');
  const throttledValue = useThrottleFn((defaultValue) => defaultValue, 2000, [value]);
  const [lastThrottledValue, setLastThrottledValue] = React.useState(throttledValue);
  const [count, { inc }] = useCounter();

  React.useEffect(() => {
    if (lastThrottledValue !== throttledValue) {
      setLastThrottledValue(throttledValue);
      inc();
    }
  });

  return (
    <div style={{ width: 300, margin: '40px auto' }}>
      <input
        type="text"
        value={value}
        placeholder="Throttled input"
        style={{ width: '100%' }}
        onChange={({ currentTarget }) => {
          setValue(currentTarget.value);
        }}
      />
      <br />
      <br />
      <div>Throttled value: {throttledValue}</div>
      <div>Times updated: {count}</div>
    </div>
  );
};

storiesOf('Side effects/useThrottleFn', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useThrottle.md')} />)
  .add('Demo', () => <Demo />);
