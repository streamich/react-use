import { storiesOf } from '@storybook/react';
import * as React from 'react';
import useWindowFocus from '../src/useWindowFocus';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const defaultState = document.hasFocus();
  const isFocused = useWindowFocus(defaultState);

  return (
    <div>
      <p>Click outside this window or switch to another tab to see the focus state change.</p>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
        Window is {isFocused ? '✅ Focused' : '❌ Not Focused'}
      </div>
    </div>
  );
};

storiesOf('Sensors/useWindowFocus', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useWindowFocus.md')} />)
  .add('Demo', () => <Demo />);
