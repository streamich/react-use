import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useCountdown } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [countdown1, action1] = useCountdown(6);
  const [countdown2, action2] = useCountdown(60);
  return (
    <div>
      <div>countdown1: {countdown1}</div>
      <br />
      <button onClick={action1.start}>start</button>
      <button onClick={action1.stop}>stop</button>
      <button onClick={action1.pause}>pause</button>
      <br />
      <br />
      <div>countdown2: {countdown2}</div>
      <br />
      <button onClick={action2.start}>start</button>
      <button onClick={action2.stop}>stop</button>
      <button onClick={action2.pause}>pause</button>
    </div>
  );
};

storiesOf('State|useCountdown', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useCountdown.md')} />)
  .add('Demo', () => <Demo />);
