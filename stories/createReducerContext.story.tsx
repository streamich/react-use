import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { createReducerContext } from '../src';
import ShowDocs from './util/ShowDocs';

type Action = 'increment' | 'decrement';

const reducer = (state: number, action: Action) => {
  switch (action) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      throw new Error();
  }
};

const [useSharedCounter, SharedCounterProvider] = createReducerContext(reducer, 0);

const ComponentA = () => {
  const [count, dispatch] = useSharedCounter();
  return (
    <p>
      Component A &nbsp;
      <button type="button" onClick={() => dispatch('decrement')}>
        -
      </button>
      &nbsp;{count}&nbsp;
      <button type="button" onClick={() => dispatch('increment')}>
        +
      </button>
    </p>
  );
};

const ComponentB = () => {
  const [count, dispatch] = useSharedCounter();
  return (
    <p>
      Component B &nbsp;
      <button type="button" onClick={() => dispatch('decrement')}>
        -
      </button>
      &nbsp;{count}&nbsp;
      <button type="button" onClick={() => dispatch('increment')}>
        +
      </button>
    </p>
  );
};

const Demo = () => {
  return (
    <SharedCounterProvider>
      <p>Those two counters share the same value.</p>
      <ComponentA />
      <ComponentB />
    </SharedCounterProvider>
  );
};

storiesOf('State/createReducerContext', module)
  .add('Docs', () => <ShowDocs md={require('../docs/createReducerContext.md')} />)
  .add('Demo', () => <Demo />);
