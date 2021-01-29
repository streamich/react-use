import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useLocalSyncedState } from '../src';
import ShowDocs from './util/ShowDocs';

const WINDOW_CHILD_NAME = 'child';

const Demo = () => {
  const [value, setValue] = useLocalSyncedState('value', 0);

  const isParent = window.parent.name !== WINDOW_CHILD_NAME;

  function openWindow() {
    window.open(window.parent.location.href, WINDOW_CHILD_NAME);
  }

  function changeValue() {
    isParent ? setValue(value + 1) : setValue(value - 1);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: '20px' }}>Current Value: {value}</div>
      <button style={{ cursor: 'pointer', marginBottom: '20px' }} onClick={changeValue}>
        Click me to {isParent ? 'increase' : 'decrease'} value!
      </button>
      <div>
        <button style={{ cursor: 'pointer' }} onClick={openWindow}>
          Click me to open a new window!
        </button>
      </div>
    </div>
  );
};

storiesOf('Side effects/useLocalSyncedState', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useLocalSyncedState.md')} />)
  .add('Demo', () => <Demo />);
