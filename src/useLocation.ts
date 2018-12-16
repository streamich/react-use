import {useState, useEffect} from 'react';
import {isClient, on, off} from './util';

const patchHistoryMethod = (method) => {
  const original = history[method];

  history[method] = function (state) {
    const result = original.apply(this, arguments);
    const event = new Event(method.toLowerCase());

    (event as any).state = state;

    window.dispatchEvent(event);

    return result;
  };
};

if (isClient) {
  patchHistoryMethod('pushState');
  patchHistoryMethod('replaceState');
}

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

const useLocation = (): LocationSensorState => {
  const buildState = (trigger: string) => {
    const {
      state,
      length
    } = history;

    const {
      hash,
      host,
      hostname,
      href,
      origin,
      pathname,
      port,
      protocol,
      search
    } = location;

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
      search
    };
  };

  const [state, setState] = useState(isClient
    ? buildState('load')
    : {
      trigger: 'load',
      length: 1
    }
  );

  const onChange = (trigger: string) =>
    setState(buildState(trigger));

  const onPopstate = () => onChange('popstate');
  const onPushstate = () => onChange('pushstate');
  const onReplacestate = () => onChange('replacestate');

  useEffect(() => {
    on(window, 'popstate', onPopstate);
    on(window, 'pushstate', onPushstate);
    on(window, 'replacestate', onReplacestate);

    return () => {
      off(window, 'popstate', onPopstate);
      off(window, 'pushstate', onPushstate);
      off(window, 'replacestate', onReplacestate);
    };
  }, [0]);

  return state;
};

export default useLocation;
