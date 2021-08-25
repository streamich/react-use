import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useDropArea } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [bond, state] = useDropArea({
    onFiles: action('onFiles'),
    onUri: action('onUri'),
    onText: action('onText'),
  });

  const style: React.CSSProperties = {
    width: 300,
    height: 200,
    margin: '50px auto',
    border: '1px solid #000',
    textAlign: 'center',
    lineHeight: '200px',
    ...(state.over
      ? {
          border: '1px solid green',
          outline: '3px solid yellow',
          background: '#f8f8f8',
        }
      : {}),
  };

  return (
    <div>
      <div {...bond} style={style}>
        Drop here
      </div>
      <div style={{ maxWidth: 300, margin: '0 auto' }}>
        <ul style={{ margin: 0, padding: '10px 18px' }}>
          <li>
            See logs in <code>Actions</code> tab.
          </li>
          <li>Drag in and drop files.</li>
          <li>
            <code>Cmd + V</code> paste text here.
          </li>
          <li>Drag in images from other tabs.</li>
          <li>Drag in link from navigation bar.</li>
          <li>Below is state returned by the hook:</li>
        </ul>
        <pre>{JSON.stringify(state, null, 4)}</pre>
      </div>
    </div>
  );
};

storiesOf('UI/useDropArea', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useDrop.md')} />)
  .add('Default', () => <Demo />);
