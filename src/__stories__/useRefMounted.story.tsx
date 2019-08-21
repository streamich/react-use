import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useRaf, useRefMounted } from '..';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const refMounted = useRefMounted();

  useRaf();
  return (
    <div>
      <h3>**DEPRECATED**</h3>
      <h4>This method is obsolete, use `useMountedState` instead.</h4>
      <span>is mounted: {refMounted.current ? '👍' : '👎'}</span>
    </div>
  );
};

storiesOf('Lifecycle|useRefMounted', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useRefMounted.md')} />)
  .add('Demo', () => <Demo />);
