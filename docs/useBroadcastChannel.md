# `useBroadcastChannel`

This is a react hook based on the [BroadcastChannel](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API) interface, used for communication between different tabs of the same origin.

## Usage

```tsx
import { useBroadcastChannel } from "react-use";

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

```
