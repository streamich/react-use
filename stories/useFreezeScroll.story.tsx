import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import { useFreezeScroll } from '../src/useFreezeScroll';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [isActive, setIsActive] = useState(false);
  useFreezeScroll(isActive);

  return (
    <div style={{ height: '5000px' }}>
      <div style={{ marginTop: '20px' }}>
        <p>Scroll should be frozen when enabled.</p>
        <p>Try scrolling to test the effect.</p>
      </div>
      <button onClick={() => setIsActive(!isActive)} style={{ position: 'sticky', top: '100px' }}>
        {isActive ? 'Disable Freeze Scroll' : 'Enable Freeze Scroll'}
      </button>
    </div>
  );
};

storiesOf('UI/useFreezeScroll', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useFreezeScroll.md')} />)
  .add('Demo', () => <Demo />);
