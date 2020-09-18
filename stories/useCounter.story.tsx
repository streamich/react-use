import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useCounter } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [initialValue, setInitialValue] = React.useState(5);
  const [min, { inc: incMin, dec: decMin }] = useCounter(1);
  const [max, { inc: incMax, dec: decMax }] = useCounter(10);
  const [value, { inc, dec, set, reset }] = useCounter(initialValue, max, min);

  return (
    <div>
      <div>
        current: {value} [min: {min}; max: {max}]
      </div>
      <br />
      Current value: <button onClick={() => inc()}>Increment</button>
      <button onClick={() => dec()}>Decrement</button>
      <button onClick={() => inc(5)}>Increment (+5)</button>
      <button onClick={() => dec(5)}>Decrement (-5)</button>
      <button onClick={() => set(100)}>Set 100</button>
      <button onClick={() => reset()}>Reset</button>
      <button onClick={() => reset(25)}>Reset (25)</button>
      <br />
      <br />
      Min value:
      <button onClick={() => incMin()}>Increment</button>
      <button onClick={() => decMin()}>Decrement</button>
      <br />
      <br />
      Max value:
      <button onClick={() => incMax()}>Increment</button>
      <button onClick={() => decMax()}>Decrement</button>
      <br />
      <br />
      Initial value: {initialValue}
      <button onClick={() => setInitialValue((v) => ++v)}>Increment</button>
      <button onClick={() => setInitialValue((v) => --v)}>Decrement</button>
    </div>
  );
};

storiesOf('State/useCounter', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useCounter.md')} />)
  .add('Demo', () => <Demo />);
