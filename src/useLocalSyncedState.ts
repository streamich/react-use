import { useEffect, useRef, useState } from 'react';

const ROLES = ['receiver', 'sender', 'both'] as const;
type Roles = typeof ROLES[number];

type DataCb<T = any> = (d: T) => void;

type Connector = {
  onData: <T = any>(key: string, cb: DataCb<T>) => void;
  sendData: <T = any>(key: string, data: T) => void;
};

function createConnector(): Connector {
  const channels: Record<string, BroadcastChannel> = {};

  function getChannel(key: string): BroadcastChannel {
    if (channels[key]) return channels[key];
    const newChannel = new BroadcastChannel(key);
    channels[key] = newChannel;
    return newChannel;
  }

  function sendData<T = any>(key: string, data: T) {
    const channel = getChannel(key);
    channel.postMessage(data);
  }

  function onData<T = any>(key: string, cb: DataCb<T>) {
    const channel = getChannel(key);
    channel.onmessage = (ev) => void cb(ev.data);
  }
  return { sendData, onData };
}

const connector = createConnector();

/**
 * Creates a state that can be synced between contexts on the same browser running on the same machine:
 * tabs, windows, iframes can keep a state synced between them.
 * A state must have an identifier, and any other state with the same identifier will keep synced to it.
 * It can be either a receiver, a sender or both.
 * @param identifier string identifier shared between synced states
 * @param baseValue starting value of the state
 * @param role sender, receiver or both, defines if the state will update, get updated or both
 */
export function useLocalSyncedState<T = any>(identifier: string, baseValue: T | null = null, role: Roles = 'both') {
  const componentIsMounted = useRef<boolean>(false);
  const [value, setValue] = useState<T | null>(baseValue);

  useEffect(() => {
    componentIsMounted.current = true;
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  const isSender = role === 'sender' || role === 'both';
  const isReceiver = role === 'receiver' || role === 'both';

  if (isReceiver) {
    connector.onData(identifier, (d) => componentIsMounted.current && setValue(d));
  }

  function setData(newVal: T) {
    setValue(newVal);
    if (isSender) {
      connector.sendData(identifier, newVal);
    }
  }

  return [value, setData] as const;
}
