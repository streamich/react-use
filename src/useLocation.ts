import { useEffect, useState } from 'react';
import { isBrowser, off, on } from './misc/util';

export interface LocationSensorState {
  trigger: string;
  state?: any;
  length?: number;
  hash?: string;
  host?: string;
  hostname?: string;
  href?: string;
  origin?: string;
  pathname?: string;
  port?: string;
  protocol?: string;
  search?: string;
}

const useLocationServer = (): LocationSensorState => ({
  trigger: 'load',
  length: 1,
});

const buildState = (trigger: string) => {
  const { state, length } = window.history;

  const { hash, host, hostname, href, origin, pathname, port, protocol, search } = window.location;

  return {
    trigger,
    state,
    length,
    hash,
    host,
    hostname,
    href,
    origin,
    pathname,
    port,
    protocol,
    search,
  };
};

const useLocationBrowser = (): LocationSensorState => {
  const [state, setState] = useState(buildState('load'));

  useEffect(() => {
    const onPopstate = () => setState(buildState('popstate'));
    const onPushstate = () => setState(buildState('pushstate'));
    const onReplacestate = () => setState(buildState('replacestate'));

    on(window, 'popstate', onPopstate);
    on(window, 'pushstate', onPushstate);
    on(window, 'replacestate', onReplacestate);

    return () => {
      off(window, 'popstate', onPopstate);
      off(window, 'pushstate', onPushstate);
      off(window, 'replacestate', onReplacestate);
    };
  }, []);

  return state;
};

const hasEventConstructor = typeof Event === 'function';

export default isBrowser && hasEventConstructor ? useLocationBrowser : useLocationServer;
