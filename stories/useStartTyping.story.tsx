import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useStartTyping } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const input = React.useRef(null);
  useStartTyping(() => {
    if (input.current) {
      input.current.focus();
    }
  });

  return (
    <div>
      <p>Start typing, and below field will get focused.</p>
      <input ref={input} />

      <br />
      <hr />

      <p>Try focusing below elements and see what happens.</p>
      <button>When button is focused, it will lose it.</button>
      <br />
      <br />
      <input />
      <br />
      <br />
      <textarea>Editable textarea</textarea>
      <br />
      <br />
      <div contentEditable={true}>Editable DIV</div>
    </div>
  );
};

storiesOf('Sensors/useStartTyping', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useStartTyping.md')} />)
  .add('Demo', () => <Demo />);
