import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {createMemo} from '..';
import ShowDocs from '../util/ShowDocs';

const fibonacci = n => {
  if (n === 0) return 1;
  if (n === 1) return 2;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

const useMemoFibonacci = createMemo(fibonacci);

const Demo = () => {
  const result = useMemoFibonacci(10);

  return (
    <div>
      fib(10) = {result}
    </div>
  );
};

storiesOf('State/createMemo', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/createMemo.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
