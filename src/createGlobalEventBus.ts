import { useLayoutEffect, useRef, useCallback } from 'react';
import useEffectOnce from './useEffectOnce';

export function createGlobalEventBus<E = any>() {
  const bus: {
    listeners: Array<(event: E) => void>;
    emit(event: E): void;
  } = {
    listeners: [],
    emit(event: E) {
      for (const listener of bus.listeners) {
        listener(event);
      }
    },
  };

  return function (listener?: (event: E) => void): (event: E) => void {
    const _latest = useRef(listener);
    _latest.current = listener;

    const _listener = useCallback((event: E) => {
      if (_latest.current) {
        _latest.current(event);
      }
    }, []);

    useEffectOnce(() => {
      return () => {
        bus.listeners = bus.listeners.filter((setter) => setter !== _listener);
      };
    });

    useLayoutEffect(() => {
      if (!bus.listeners.includes(_listener)) {
        bus.listeners.push(_listener);
      }
    });

    return bus.emit;
  };
}

export default createGlobalEventBus;
