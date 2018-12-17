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
  const {loading, value} = useAsync<string>(fn);

  return (
    <div>
      {loading
        ? <div>Loading...</div>
        : <div>Value: {value}</div>
      }
    </div>
  );
};

storiesOf('useAsync', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useAsync.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
