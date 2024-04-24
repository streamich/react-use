import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useReducerWithEffects } from '../src';
import ShowDocs from './util/ShowDocs';

const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {state: {count: state.count + 1},
              documentTitle: "New Title"};
    case 'decrement':
      return {state: {count: state.count - 1},
              log: "Decremented"};
    default:
      throw new Error();
  }
}

const handlers = { log: (_, payload) => console.log(payload), 
                   documentTitle: (_, payload) => document.title = payload}

function Demo() {
  const [state, dispatch] = useReducerWithEffects(reducer, handlers, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}

storiesOf('State|useReducerWithEffects', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useReducerWithEffects.md')} />)
  .add('Demo', () => <Demo />);