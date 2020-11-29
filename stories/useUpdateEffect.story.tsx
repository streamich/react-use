import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useUpdateEffect } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [count, setCount] = React.useState(0);
  const [didUpdate, setDidUpdate] = React.useState(false);

  useUpdateEffect(() => {
    setDidUpdate(true);
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount((currentCount) => currentCount + 1)}>Count: {count}</button>
      <p>Updated: {didUpdate}</p>
    </div>
  );
};

storiesOf('Lifecycle/useUpdateEffect', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useUpdateEffect.md')} />)
  .add('Demo', () => <Demo />);
