import { useEffect, useState } from 'react';
import { isNavigator, off, on } from './misc/util';
import { IHookStateInitAction } from './misc/hookState';

export interface INetworkInformation extends EventTarget {
  readonly downlink: number;
  readonly downlinkMax: number;
  readonly effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
  readonly rtt: number;
  readonly saveData: boolean;
  readonly type:
    | 'bluetooth'
    | 'cellular'
    | 'ethernet'
    | 'none'
    | 'wifi'
    | 'wimax'
    | 'other'
    | 'unknown';

  onChange: (event: Event) => void;
}

export interface IUseNetworkState {
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
  downlink: INetworkInformation['downlink'] | undefined;
  /**
   * @desc Maximum downlink speed, in megabits per second (Mbps), for the
   * underlying connection technology
   */
  downlinkMax: INetworkInformation['downlinkMax'] | undefined;
  /**
   * @desc Effective type of the connection meaning one of 'slow-2g', '2g', '3g', or '4g'.
   * This value is determined using a combination of recently observed round-trip time
   * and downlink values.
   */
  effectiveType: INetworkInformation['effectiveType'] | undefined;
  /**
   * @desc Estimated effective round-trip time of the current connection, rounded
   * to the nearest multiple of 25 milliseconds
   */
  rtt: INetworkInformation['rtt'] | undefined;
  /**
   * @desc {true} if the user has set a reduced data usage option on the user agent.
   */
  saveData: INetworkInformation['saveData'] | undefined;
  /**
   * @desc The type of connection a device is using to communicate with the network.
   * It will be one of the following values:
   *  - bluetooth
   *  - cellular
   *  - ethernet
   *  - none
   *  - wifi
   *  - wimax
   *  - other
   *  - unknown
   */
  type: INetworkInformation['type'] | undefined;
}

const nav:
  | (Navigator &
      Partial<Record<'connection' | 'mozConnection' | 'webkitConnection', INetworkInformation>>)
  | undefined = isNavigator ? navigator : undefined;
const conn: INetworkInformation | undefined =
  nav && (nav.connection || nav.mozConnection || nav.webkitConnection);

function getConnectionState(previousState?: IUseNetworkState): IUseNetworkState {
  const online = nav?.onLine;
  const previousOnline = previousState?.online;

  return {
    online,
    previous: previousOnline,
    since: online !== previousOnline ? new Date() : previousState?.since,
    downlink: conn?.downlink,
    downlinkMax: conn?.downlinkMax,
    effectiveType: conn?.effectiveType,
    rtt: conn?.rtt,
    saveData: conn?.saveData,
    type: conn?.type,
  };
}

export default function useNetworkState(
  initialState?: IHookStateInitAction<IUseNetworkState>
): IUseNetworkState {
  const [state, setState] = useState(initialState ?? getConnectionState);

  useEffect(() => {
    const handleStateChange = () => {
      setState(getConnectionState);
    };

    on(window, 'online', handleStateChange, { passive: true });
    on(window, 'offline', handleStateChange, { passive: true });

    if (conn) {
      on(conn, 'change', handleStateChange, { passive: true });
    }

    return () => {
      off(window, 'online', handleStateChange);
      off(window, 'offline', handleStateChange);

      if (conn) {
        off(conn, 'change', handleStateChange);
      }
    };
  }, []);

  return state;
}
