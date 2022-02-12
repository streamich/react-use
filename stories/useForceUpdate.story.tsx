import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useForceUpdate } from '../src';
import Docs from './util/ShowDocs';

let timeoutRef = 0;
let rendersCount = 0;

const Demo = () => {
  const valueRef = React.useRef('');
  const forceUpdate = useForceUpdate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeoutRef);
    valueRef.current = event.target.value;
    timeoutRef = setTimeout(() => forceUpdate(), 800);
  };

  return (
    <div>
      <h4>Number of renders: {++rendersCount}</h4>
      <br />
      <button onClick={() => forceUpdate()}>FOrce re-render</button>
      <p>or</p>
      <div>
        <input placeholder="Type a value" onChange={handleChange} />
        <p>Value after timeout of 800ms: {valueRef.current}</p>
      </div>
    </div>
  );
};

storiesOf('Side effects/useForceUpdate', module)
  .add('Docs', () => <Docs md={require('../docs/useForceUpdate.md')} />)
  .add('Demo', () => <Demo />);
