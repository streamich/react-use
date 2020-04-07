import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import { withHook } from '../src';
import ShowDocs from './util/ShowDocs';

const Counter = props => {
  return (
    <div>
      <div>Started At: {props.startAt}</div>
      <div>Counter: {props.count}</div>
      <button onClick={props.increment}>Increment</button>
      <button onClick={props.decrement}>Decrement</button>
    </div>
  );
};

const useCounter = props => {
  const [count, setCount] = useState(props.startAt);

  return {
    count,
    increment: () => setCount(prev => prev + 1),
    decrement: () => setCount(prev => prev - 1),
  };
};

const Demo = withHook(Counter, useCounter);

storiesOf('Side effects|withHook', module)
  .add('Docs', () => <ShowDocs md={require('../docs/withHook.md')} />)
  .add('Demo', () => <Demo startAt={10} />);
