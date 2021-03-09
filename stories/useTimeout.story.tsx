import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useTimeout } from '../src';
import ShowDocs from './util/ShowDocs';

function TestComponent(props: { ms?: number } = {}) {
  const ms = props.ms || 5000;
  const [isReady, cancel] = useTimeout(ms);

  return (
    <div>
      {isReady() ? "I'm reloaded after timeout" : `I will be reloaded after ${ms / 1000}s`}
      {isReady() === false ? <button onClick={cancel}>Cancel</button> : ''}
    </div>
  );
}

const Demo = () => {
  return (
    <div>
      <TestComponent />
      <TestComponent ms={10000} />
    </div>
  );
};

storiesOf('Animation/useTimeout', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useTimeout.md')} />)
  .add('Demo', () => <Demo />);
