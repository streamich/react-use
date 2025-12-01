import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useInputState } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [name, setName] = useInputState('');
  return (
    <label>
      Name
      <input value={name} onChange={setName} />;
    </label>
  );
};

storiesOf('State/useInputState', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useInputState.md')} />)
  .add('Demo', () => <Demo />);
