import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useAsyncFn } from '..';
import ShowDocs from './util/ShowDocs';

const fn = () =>
  new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        reject(new Error('Random error!'));
      } else {
        resolve('RESOLVED');
      }
    }, 1000);
  });

const Demo = () => {
  const [{ loading, error, value }, callback] = useAsyncFn<string>(fn);

  return (
    <div>
      {loading ? <div>Loading...</div> : error ? <div>Error: {error.message}</div> : value && <div>Value: {value}</div>}
      <button onClick={() => callback()}>Start</button>
    </div>
  );
};

storiesOf('Side effects|useAsyncFn', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useAsyncFn.md')} />)
  .add('Demo', () => <Demo />);
