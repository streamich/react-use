import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useLatest } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [count, setCount] = React.useState(0);
  const latestCount = useLatest(count);
  const timeoutMs = 3000;

  function handleAlertClick() {
    setTimeout(() => {
      alert(`Latest count value: ${latestCount.current}`);
    }, timeoutMs);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={handleAlertClick}>Show alert in {timeoutMs / 1000}s</button>
    </div>
  );
};

storiesOf('State/useLatest', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useLatest.md')} />)
  .add('Demo', () => <Demo />);
