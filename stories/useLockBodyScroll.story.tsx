import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useRef } from 'react';
import Frame from 'react-frame-component';
import { useLockBodyScroll, useToggle } from '../src';
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

const IframeComponent = () => {
  const [mainLocked, toggleMainLocked] = useToggle(false);
  const [iframeLocked, toggleIframeLocked] = useToggle(false);
  const iframeElementRef = useRef<HTMLIFrameElement>(null);

  useLockBodyScroll(mainLocked);
  useLockBodyScroll(iframeLocked, iframeElementRef);

  return (
    <div style={{ height: '200vh' }}>
      <Frame style={{ height: '50vh', width: '50vw' }}>
        <div style={{ height: '200vh' }} ref={iframeElementRef}>
          <button onClick={() => toggleMainLocked()} style={{ position: 'fixed', left: 0, top: 0 }}>
            {mainLocked ? 'Unlock' : 'Lock'} main window scroll
          </button>
          <button
            onClick={() => toggleIframeLocked()}
            style={{ position: 'fixed', left: 0, top: 64 }}>
            {iframeLocked ? 'Unlock' : 'Lock'} iframe window scroll
          </button>
        </div>
      </Frame>
    </div>
  );
};

storiesOf('Side effects/useLockBodyScroll', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useLockBodyScroll.md')} />)
  .add('Demo', () => <Demo />)
  .add('Two hooks on page', () => (
    <>
      <AnotherComponent />
      <Demo />
      <IframeComponent />
    </>
  ))
  .add('Iframe', () => <IframeComponent />);
