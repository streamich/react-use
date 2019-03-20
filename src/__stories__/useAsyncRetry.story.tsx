import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useAsyncRetry} from '..';
import ShowDocs from '../util/ShowDocs';

const fnRetry = () =>
  new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        reject(new Error('Random error!'));
      } else {
        resolve('RESOLVED');
      }
    }, 1000);
  });

const DemoRetry = () => {
  const { loading, value, error, retry } = useAsyncRetry<string>(fnRetry);

  return (
    <div>
      {loading?
        <div>Loading...</div>
        : error?
        <div>Error: {error.message}</div>
        : <div>Value: {value}</div>
      }
      <a href='javascript:void 0' onClick={() => retry()}>Retry</a>
    </div>
  );
};

storiesOf('Side effects|useAsyncRetry', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useAsyncRetry.md')} />)
  .add('Demo', () => <DemoRetry />);
