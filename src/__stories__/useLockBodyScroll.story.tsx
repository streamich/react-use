import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useLockBodyScroll, useToggle } from '..';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [locked, toggleLocked] = useToggle(false);
  useLockBodyScroll(locked);

  return (
    <div style={{ height: '200vh' }}>
      <button onClick={() => toggleLocked()} style={{ position: 'fixed', left: 0 }}>
        {locked ? 'Unlock' : 'Lock'}
      </button>
    </div>
  );
};

const AnotherComponent = () => {
  const [locked, toggleLocked] = useToggle(false);
  useLockBodyScroll(locked);

  return (
    <button onClick={() => toggleLocked()} style={{ position: 'fixed', left: 0, top: 40 }}>
      {locked ? 'Unlock' : 'Lock'}
    </button>
  );
};

storiesOf('Side effects|useLockBodyScroll', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useLockBodyScroll.md')} />)
  .add('Demo', () => <Demo />)
  .add('Two hooks on page', () => (
    <>
      <AnotherComponent />
      <Demo />
    </>
  ));
