import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useUpdate } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const update = useUpdate();
  return (
    <>
      <div>Time: {Date.now()}</div>
      <button onClick={update}>Update</button>
    </>
  );
};

storiesOf('Animation/useUpdate', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useUpdate.md')} />)
  .add('Demo', () => <Demo />);
