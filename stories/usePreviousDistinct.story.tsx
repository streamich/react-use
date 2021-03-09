import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { usePreviousDistinct, useCounter } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [count, { inc: relatedInc }] = useCounter(0);
  const [unrelatedCount, { inc }] = useCounter(0);
  const prevCount = usePreviousDistinct(count);

  return (
    <p>
      Now: {count}, before: {prevCount}
      <button onClick={() => relatedInc()}>Increment</button>
      Unrelated: {unrelatedCount}
      <button onClick={() => inc()}>Increment Unrelated</button>
    </p>
  );
};

storiesOf('State/usePreviousDistinct', module)
  .add('Docs', () => <ShowDocs md={require('../docs/usePreviousDistinct.md')} />)
  .add('Demo', () => <Demo />);
