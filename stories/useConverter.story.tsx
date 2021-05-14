import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useConverter } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [input, setInput, output] = useConverter((data) => btoa(data), 'Hello World');

  return (
    <div>
      <textarea value={input} onChange={(event) => setInput(event.target.value)} />
      <pre>{output}</pre>
    </div>
  );
};

storiesOf('State/useConverter', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useConverter.md')} />)
  .add('Demo', () => <Demo />);
