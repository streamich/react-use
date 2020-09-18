import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { createMemo } from '../src';
import ShowDocs from './util/ShowDocs';

const fibonacci = (n) => {
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
};

const useMemoFibonacci = createMemo(fibonacci);

const Demo = () => {
  const result = useMemoFibonacci(10);

  return <div>fib(10) = {result}</div>;
};

storiesOf('State/createMemo', module)
  .add('Docs', () => <ShowDocs md={require('../docs/createMemo.md')} />)
  .add('Demo', () => <Demo />);
