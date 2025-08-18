import { useEffect, useRef, useState } from 'react';

export interface UseBroadcastChannelOptions {
  name: string;
}

export function useBroadcastChannel<T>(
  options: UseBroadcastChannelOptions
): UseBroadcastChannelReturns<T> {
  const { name } = options;
  const channelRef = useRef<BroadcastChannel | null>(null);

  const [error, setError] = useState<Event | null>(null);
  const [receive, setReceive] = useState<T | null>(null);
  const [isClosed, setIsClosed] = useState(false);

  if (!(window && 'BroadcastChannel' in window)) {
    throw new Error('BroadcastChannel is not supported');
  }

  const send = (data: T | null) => {
    channelRef.current?.postMessage(data);
  };

  const close = () => {
    channelRef.current?.close();
    setIsClosed(true);
  };

  useEffect(() => {
    setError(null);
    channelRef.current = new BroadcastChannel(name);

    channelRef.current.addEventListener(
      'message',
      (event: MessageEvent) => {
        setReceive(event.data);
      },
      { passive: true }
    );

    channelRef.current.addEventListener(
      'messageerror',
      (event: MessageEvent) => {
        setError(event);
      },
      { passive: true }
    );

    channelRef.current.addEventListener('close', () => {
      setIsClosed(true);
    });

    return () => {
      channelRef.current?.close();
    };
  }, [name]);

  return { receive, send, close, error, isClosed, channel: channelRef.current };
}

export interface UseBroadcastChannelReturns<T> {
  receive: T | null;
  send: (data: T | null) => void;
  close: () => void;
  error: Event | null;
  isClosed: boolean;
  channel: BroadcastChannel | null;
}
