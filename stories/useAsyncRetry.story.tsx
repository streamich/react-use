import { number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useAsyncRetry } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = ({ delay }) => {
  const state = useAsyncRetry<string>(
    () =>
      new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.5) {
            resolve('✌️');
          } else {
            reject(new Error('A pseudo random error occurred'));
          }
        }, delay);
      }),
    [delay]
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
      <button onClick={() => state.retry()}>Retry</button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};

storiesOf('Side effects/useAsyncRetry', module)
  .addDecorator(withKnobs)
  .add('Docs', () => <ShowDocs md={require('../docs/useAsyncRetry.md')} />)
  .add('Demo', () => {
    const delay = number('delay', 1000, { range: true, min: 100, max: 5000, step: 100 });
    return <Demo delay={delay} />;
  });
