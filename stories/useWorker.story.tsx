import * as React from 'react';
import ShowDocs from './util/ShowDocs';
import { storiesOf } from '@storybook/react';
import { useEffect } from 'react';
import { useWorker } from '../src';

const Demo = () => {
  const { instance, data, error, isLoading } = useWorker<string>(new Worker('./worker.js'));

  useEffect(() => {
    instance.postMessage('hello');
  }, [instance]);

  return (
    <div>
      <div>{isLoading ? data : 'loading'}</div>
    </div>
  );
};

storiesOf('Sensors/useWindowSize', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useWindowSize.md')} />)
  .add('Demo', () => <Demo />);
