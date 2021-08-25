# `useNetworkState`

Tracks the state of browser's network connection.

As of the standard it is not guaranteed that browser connected to the _Internet_, it only guarantees the network
connection.

## Usage

```jsx
import {useNetworkState} from 'react-use';

const Demo = () => {
  const state = useNetworkState();

  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};
```

#### State interface:

```typescript
interface IUseNetworkState {
  /**
   * @desc Whether browser connected to the network or not.
   */
  online: boolean | undefined;
  /**
   * @desc Previous value of `online` property. Helps to identify if browser
   * just connected or lost connection.
   */
  previous: boolean | undefined;
  /**
   * @desc The {Date} object pointing to the moment when state change occurred.
   */
  since: Date | undefined;
  /**
   * @desc Effective bandwidth estimate in megabits per second, rounded to the
   * nearest multiple of 25 kilobits per seconds.
   */
  downlink: number | undefined;
  /**
   * @desc Maximum downlink speed, in megabits per second (Mbps), for the
   * underlying connection technology
   */
  downlinkMax: number | undefined;
  /**
   * @desc Effective type of the connection meaning one of 'slow-2g', '2g', '3g', or '4g'.
   * This value is determined using a combination of recently observed round-trip time
   * and downlink values.
   */
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g' | undefined;
  /**
   * @desc Estimated effective round-trip time of the current connection, rounded
   * to the nearest multiple of 25 milliseconds
   */
  rtt: number | undefined;
  /**
   * @desc Wheter user has set a reduced data usage option on the user agent.
   */
  saveData: boolen | undefined;
  /**
   * @desc The type of connection a device is using to communicate with the network.
   */
  type: 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown' | undefined;
}
```

#### Call signature

```typescript
function useNetworkState(initialState?: IUseNetworkState | (() => IUseNetworkState)): IUseNetworkState;
```
