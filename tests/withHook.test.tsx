import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import withHook from '../src/withHook';

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

const ComponentToTest = withHook(Counter, useCounter);

it('should render the startAt passed prop', () => {
  const initialStartAt = 10;

  render(<ComponentToTest startAt={initialStartAt} />);

  expect(screen.getByText(`Started At: ${initialStartAt}`)).toBeDefined();
});

it('should render proper value of Counter', () => {
  render(<ComponentToTest startAt={10} />);

  expect(screen.getByText(`Counter: 10`)).toBeDefined();

  fireEvent.click(screen.getByText(/increment/i));
  expect(screen.getByText(`Counter: 11`)).toBeDefined();

  fireEvent.click(screen.getByText(/decrement/i));
  expect(screen.getByText(`Counter: 10`)).toBeDefined();
});
