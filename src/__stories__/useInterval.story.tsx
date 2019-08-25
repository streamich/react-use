import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useInterval } from '..';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [count, setCount] = React.useState(0);
  const [delay, setDelay] = React.useState(1000);

  useInterval(() => {
    setCount(count + 1);
  }, delay);

  function handleDelayChange(e) {
    setDelay(Number(e.target.value));
  }

  return (
    <div>
      <div>
        delay: <input value={delay} onChange={handleDelayChange} />
      </div>
      <h1>count: {count}</h1>
      <div>
        <button onClick={() => setDelay(delay ? null : 1000)}>{delay ? 'stop' : 'start'}</button>
      </div>
    </div>
  );
};

storiesOf('Animation|useInterval', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useInterval.md')} />)
  .add('Demo', () => <Demo />);
