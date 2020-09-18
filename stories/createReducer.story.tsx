import { storiesOf } from '@storybook/react';
import * as React from 'react';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { createReducer } from '../src';
import ShowDocs from './util/ShowDocs';

const useThunkReducer = createReducer(thunk, logger);

// React useReducer lazy initialization example: https://reactjs.org/docs/hooks-reference.html#lazy-initialization
function init(initialCount) {
  return { count: initialCount };
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

const Demo = ({ initialCount = 1 }) => {
  // Action creator to increment count, wait a second and then reset
  const addAndReset = React.useCallback(() => {
    return (dispatch2) => {
      dispatch2({ type: 'increment' });

      setTimeout(() => {
        dispatch2({ type: 'reset', payload: initialCount });
      }, 1000);
    };
  }, [initialCount]);

  const [state, dispatch] = useThunkReducer(reducer, initialCount, init);

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={() => dispatch(addAndReset())}>Add and reset</button>
      <button onClick={() => dispatch({ type: 'reset', payload: initialCount })}>Reset</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <p>Open your developer console to see actions logged by middleware</p>
    </div>
  );
};

storiesOf('State/createReducer', module)
  .add('Docs', () => <ShowDocs md={require('../docs/createReducer.md')} />)
  .add('Demo', () => <Demo />);
