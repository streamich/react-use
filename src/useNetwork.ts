import {useState, useEffect} from 'react';
import {on, off} from './util';

export interface NetworkState {
  online?: boolean;
  since?: Date;
  downlink?: number;
  downlinkMax?: number;
  effectiveType?: string;
  rtt?: number;
  type?: string;
}

const getConnection = () => {
  if (typeof navigator !== 'object') {
    return null;
  }
  const nav = navigator as any;
  return nav.connection || nav.mozConnection || nav.webkitConnection;
};

const getConnectionState = (): NetworkState => {
  const connection = getConnection();
  if (!connection) {
    return {};
  }
  const {downlink, downlinkMax, effectiveType, type, rtt} = connection;
  return {
    downlink,
    downlinkMax,
    effectiveType,
    type,
    rtt
  };
}

const useNetwork = (initialState: NetworkState = {}) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    let localState = state;
    const localSetState = (patch) => {
      localState = {...localState, ...patch};
      setState(localState);
    };
    const connection = getConnection();

    const onOnline = () => {
      localSetState({
        online: true,
        since: new Date()
      });
    };
    const onOffline = () => {
      localSetState({
        online: false,
        since: new Date()
      });
    };
    const onConnectionChange = () => {
      localSetState(getConnectionState());
    };

    on(window, 'online', onOnline);
    on(window, 'offline', onOffline);
    if (connection) {
      on(connection, 'change', onConnectionChange);
      localSetState({
        ...state,
        online: navigator.onLine,
        since: undefined,
        ...getConnectionState(),
      });
    }

    return () => {
      off(window, 'online', onOnline);
      off(window, 'offline', onOffline);
      if (connection) {
        off(connection, 'change', onConnectionChange);
      }
    };
  }, []);

  return state;
};

export default useNetwork;
