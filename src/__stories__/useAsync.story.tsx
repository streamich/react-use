import { number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useAsync } from '..';
import ShowDocs from './util/ShowDocs';

const Demo = ({ delay }) => {
  const { loading, error, value } = useAsync<string>(
    () =>
      new Promise<string>(resolve => {
        setTimeout(() => resolve('RESOLVED'), delay);
      }),
    [delay]
  );

  return (
    <div>{loading ? <div>Loading...</div> : error ? <div>Error: {error.message}</div> : <div>Value: {value}</div>}</div>
  );
};

storiesOf('Side effects|useAsync', module)
  .addDecorator(withKnobs)
  .add('Docs', () => <ShowDocs md={require('../../docs/useAsync.md')} />)
  .add('Demo', () => {
    const delay = number('delay', 1000, { range: true, min: 100, max: 5000, step: 100 });
    return <Demo delay={delay} />;
  });
