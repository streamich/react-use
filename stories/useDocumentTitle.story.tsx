import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useDocumentTitle } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [count, setCount] = React.useState(0);

  // Update document title whenever count changes
  useDocumentTitle(`Clicked ${count} times`);

  return (
    <div>
      <h3>Click the button to update document title</h3>
      <button onClick={() => setCount((c) => c + 1)}>Clicked {count} times</button>
    </div>
  );
};

storiesOf('SideEffects/useDocumentTitle', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useDocumentTitle.md')} />)
  .add('Demo', () => <Demo />);
