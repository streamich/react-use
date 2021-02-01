import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useSetState } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [state, setState] = useSetState({});

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={() => setState({ hello: 'world' })}>hello</button>
      <button onClick={() => setState({ foo: 'bar' })}>foo</button>
      <button
        onClick={() => {
          setState((prevState) => ({
            count: prevState.count === undefined ? 0 : prevState.count + 1,
          }));
        }}>
        increment
      </button>
    </div>
  );
};

storiesOf('State/useSetState', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useSetState.md')} />)
  .add('Demo', () => <Demo />);
