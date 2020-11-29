import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useHash, useMount } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [hash, setHash] = useHash();

  useMount(() => {
    setHash('#/path/to/page?userId=123');
  });

  return (
    <div>
      <div>window.location.href:</div>
      <div>
        <pre>{window.location.href}</pre>
      </div>
      <div>Edit hash: </div>
      <div>
        <input style={{ width: '100%' }} value={hash} onChange={(e) => setHash(e.target.value)} />
      </div>
    </div>
  );
};

storiesOf('Sensors/useHash', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useHash.md')} />)
  .add('Demo', () => <Demo />);
