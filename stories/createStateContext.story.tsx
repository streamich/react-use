import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { createStateContext } from '../src';
import ShowDocs from './util/ShowDocs';

const [useSharedText, SharedTextProvider] = createStateContext('');

const ComponentA = () => {
  const [text, setText] = useSharedText();
  return (
    <p>
      Component A:
      <br />
      <input type="text" value={text} onInput={(ev) => setText(ev.currentTarget.value)} />
    </p>
  );
};

const ComponentB = () => {
  const [text, setText] = useSharedText();
  return (
    <p>
      Component B:
      <br />
      <input type="text" value={text} onInput={(ev) => setText(ev.currentTarget.value)} />
    </p>
  );
};

const Demo = () => {
  return (
    <SharedTextProvider>
      <p>Those two fields share the same value.</p>
      <ComponentA />
      <ComponentB />
    </SharedTextProvider>
  );
};

storiesOf('State/createStateContext', module)
  .add('Docs', () => <ShowDocs md={require('../docs/createStateContext.md')} />)
  .add('Demo', () => <Demo />);
