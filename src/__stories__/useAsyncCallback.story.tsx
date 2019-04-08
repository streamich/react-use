import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useAsyncCallback} from '..';
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
  const [{loading, error, value}, callback] = useAsyncCallback<string>(fn);

  return (
    <div>
      {loading
        ? <div>Loading...</div>
        : error
          ? <div>Error: {error.message}</div>
          : value && <div>Value: {value}</div>
      }
      <button onClick={() => callback()}>Start</button>
    </div>
  );
};

storiesOf('Side effects|useAsyncCallback', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useAsyncCallback.md')} />)
  .add('Demo', () => <Demo/>)
