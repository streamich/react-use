import { storiesOf } from '@storybook/react';
import * as React from 'react';
import useDocumentVisibility from '../src/useDocumentVisibility';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const defaultState = document.visibilityState === 'visible';
  const isVisible = useDocumentVisibility(defaultState);

  return (
    <div>
      <p>Switch to another browser tab to see the visibility state change.</p>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
        Document is {isVisible ? '👁️ Visible' : '🙈 Hidden'}
      </div>
    </div>
  );
};

storiesOf('Sensors/useDocumentVisibility', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useDocumentVisibility.md')} />)
  .add('Demo', () => <Demo />);
