import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useWakeLock } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [ status, error, requestLock, releaseLock ] = useWakeLock({
      timeOut:5000
  });

  return (
    <div>
      <div>Lock status: {status}</div>
      <div>Lock error: {error}</div>
      <button
        onClick={() => {
          if (status === 'acquired') {
            releaseLock();
          } else {
            requestLock();
          }
        }}
      >{status === 'acquired' ? 'Acquired Lock' : 'Get Lock'}</button>
    </div>
  );
};

storiesOf('Sensors/useWakeLock', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useWakeLock.md')} />)
  .add('Demo', () => <Demo />);
