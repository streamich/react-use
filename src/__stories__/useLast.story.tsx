import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useLast } from '..';
import ShowDocs from './util/ShowDocs';

const notZero = num => num !== 0;

const Demo = () => {
  const [count, setCount] = React.useState(1);
  const lastNonZeroCount = useLast(count, notZero);

  return (
    <div>
      <p>
        Now: {count}, last non-zero: {String(lastNonZeroCount)}
      </p>
      <button onClick={() => setCount(value => value + 1)}>+</button>
      <button onClick={() => setCount(value => value - 1)}>-</button>
    </div>
  );
};

storiesOf('State|useLast', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useLast.md')} />)
  .add('Demo', () => <Demo />);
