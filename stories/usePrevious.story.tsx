import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { usePrevious } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [count, setCount] = React.useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>
        Now: {count}, before: {String(prevCount)}
      </p>
      <button onClick={() => setCount((value) => value + 1)}>+</button>
      <button onClick={() => setCount((value) => value - 1)}>-</button>
    </div>
  );
};

storiesOf('State/usePrevious', module)
  .add('Docs', () => <ShowDocs md={require('../docs/usePrevious.md')} />)
  .add('Demo', () => <Demo />);
