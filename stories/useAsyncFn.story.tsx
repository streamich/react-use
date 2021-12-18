import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useAsyncFn } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [state, callback] = useAsyncFn<string>(
    () =>
      new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.5) {
            resolve('✌️');
          } else {
            reject(new Error('A pseudo random error occurred'));
          }
        }, 1000);
      })
  );

  return (
    <div>
      {state.loading ? (
        <p>Loading...</p>
      ) : state.error ? (
        <p>Error: {state.error.message}</p>
      ) : (
        <p>Value: {state.value}</p>
      )}
      <button onClick={() => callback()}>Start</button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};

storiesOf('Side effects/useAsyncFn', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useAsyncFn.md')} />)
  .add('Demo', () => <Demo />);
