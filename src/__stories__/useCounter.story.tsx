import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useCounter} from '..';
import ShowDocs from '../util/ShowDocs';

const Demo = () => {
  const [value, {inc, dec, get, set, reset}] = useCounter(5);

  return (
    <div>
      <div>{value} is {get()}</div>
      <button onClick={() => inc()}>Increment</button>
      <button onClick={() => dec()}>Decrement</button>
      <button onClick={() => inc(5)}>Increment (+5)</button>
      <button onClick={() => dec(5)}>Decrement (-5)</button>
      <button onClick={() => set(100)}>Set 100</button>
      <button onClick={() => reset()}>Reset</button>
      <button onClick={() => reset(25)}>Reset (25)</button>
    </div>
  );
};

storiesOf('State|useCounter', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useCounter.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
