import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useLatest } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [count, setCount] = React.useState(0);
  const latestCount = useLatest(count);

  function handleAlertClick() {
    setTimeout(() => {
      alert(`Latest count value: ${latestCount.current}`);
    }, 3000);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={handleAlertClick}>Show alert</button>
    </div>
  );
};

storiesOf('State|useLatest', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useLatest.md')} />)
  .add('Demo', () => <Demo />);
