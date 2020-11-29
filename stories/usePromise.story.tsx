import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useBoolean, useNumber, usePromise } from '../src';
import ShowDocs from './util/ShowDocs';

const { useState, useEffect } = React;

const DemoInner = ({ promise }) => {
  const safePromise = usePromise();
  const [value, setValue] = useState<number>(-1);
  useEffect(() => {
    safePromise(promise).then(setValue);
  }, [promise]);

  return <div>{value === -1 ? 'Resolving value...' : 'Value: ' + value}</div>;
};

const Demo = () => {
  const [mounted, toggleMounted] = useBoolean(true);
  const [num, { inc }] = useNumber();
  const promise = new Promise((r) => setTimeout(() => r(num), 1_000));

  return (
    <div>
      <p>This demo provides a number in a promise that resolves in 1sec to a child component.</p>
      <button onClick={() => toggleMounted()}>{mounted ? 'Unmount' : 'Mount'}</button>
      <button onClick={() => inc()}>Increment ({num})</button>
      <br />
      {mounted && <DemoInner promise={promise} />}
    </div>
  );
};

storiesOf('Lifecycle/usePromise', module)
  .add('Docs', () => <ShowDocs md={require('../docs/usePromise.md')} />)
  .add('Demo', () => <Demo />);
