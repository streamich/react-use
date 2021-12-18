import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useCopyToClipboard } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [text, setText] = React.useState('');
  const [state, copyToClipboard] = useCopyToClipboard();

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button type="button" onClick={() => copyToClipboard(text)}>
        copy text
      </button>
      {state.error ? (
        <p>Unable to copy value: {state.error.message}</p>
      ) : (
        state.value && (
          <>
            <p>
              Copied {state.value} {state.noUserInteraction ? 'without' : 'with'} user interaction
            </p>
            <input type="text" placeholder="Paste it in here to check" />
          </>
        )
      )}
    </div>
  );
};

storiesOf('Side-effects/useCopyToClipboard', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useCopyToClipboard.md')} />)
  .add('Demo', () => <Demo />);
