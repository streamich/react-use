import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useAsync} from '..';
import ShowDocs from '../util/ShowDocs';

const fn = () => new Promise<string>((resolve) => {
  setTimeout(() => {
    resolve('RESOLVED');
  }, 1000);
});

const Demo = () => {
  const {loading, error, value} = useAsync<string>(fn);

  return (
    <div>
      {loading
        ? <div>Loading...</div>
        : error
          ? <div>Error: {error.message}</div>
          : <div>Value: {value}</div>
      }
    </div>
  );
};

storiesOf('Side effects|useAsync', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useAsync.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
