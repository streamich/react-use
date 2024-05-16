import React from 'react';
import { Meta, storiesOf } from '@storybook/react';
import { useBroadcastChannel } from '../src/useBroadcastChannel';
import ShowDocs from './util/ShowDocs';

export default {
  title: 'Hooks/useBroadcastChannel',
  component: () => null,
} as Meta;

const Demo = () => {
  const { send, receive, close, isClosed } = useBroadcastChannel({
    name: 'test-channel',
  });

  return (
    <div>
      <button onClick={() => send(Math.random())}> Send Message </button>
      <p>Received Message: {receive}</p>
      <button onClick={() => close()}> Close Channel </button>
      <p>Channel Closed: {isClosed.toString()}</p>
    </div>
  );
};

storiesOf('Side-effects/useBroadcastChannel', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useBroadcastChannel.md')} />)
  .add('Demo', () => <Demo />);
