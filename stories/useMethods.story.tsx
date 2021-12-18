import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useMethods } from '../src';
import ShowDocs from './util/ShowDocs';

const initialState = {
  count: 0,
};

function createMethods(state) {
  return {
    reset() {
      return initialState;
    },
    increment() {
      return { ...state, count: state.count + 1 };
    },
    decrement() {
      return { ...state, count: state.count - 1 };
    },
  };
}

const Demo = () => {
  const [state, methods] = useMethods(createMethods, initialState);

  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={methods.decrement}>-</button>
      <button onClick={methods.increment}>+</button>
    </>
  );
};

storiesOf('State/useMethods', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useMethods.md')} />)
  .add('Demo', () => <Demo />);
