import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useResetState } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [state, setState, resetState] = useResetState({
    foo: '',
    count: 0,
  });

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={(prev) => setState((prev) => ({ foo: 'bar', count: prev.count + 1 }))}>
        set bar and count ++
      </button>
      <button onClick={() => resetState()}>resetState</button>
    </div>
  );
};

storiesOf('State/useResetState', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useResetState.md')} />)
  .add('Demo', () => <Demo />);
