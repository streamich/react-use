import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useLayoutLatestRef } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [count, setCount] = React.useState(0);
  const latestCount = useLayoutLatestRef(count);
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

storiesOf('State/useLayoutLatestRef', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useLayoutLatestRef.md')} />)
  .add('Demo', () => <Demo />);
