import { DependencyList, useMemo } from 'react';
import useEvent, { UseEventTarget } from './useEvent';
import { noop } from './misc/util';

export type KeyPredicate = (event: KeyboardEvent) => boolean;
export type KeyFilter = null | undefined | string | ((event: KeyboardEvent) => boolean);
export type Handler = (event: KeyboardEvent) => void;

export interface UseKeyOptions {
  event?: 'keydown' | 'keypress' | 'keyup';
  target?: UseEventTarget;
  options?: any;
}

const createKeyPredicate = (keyFilter: KeyFilter): KeyPredicate =>
  typeof keyFilter === 'function'
    ? keyFilter
    : typeof keyFilter === 'string'
    ? (event: KeyboardEvent) => event.key === keyFilter
    : keyFilter
    ? () => true
    : () => false;

const useKey = (
  key: KeyFilter,
  fn: Handler = noop,
  opts: UseKeyOptions = {},
  deps: DependencyList = [key]
) => {
  const { event = 'keydown', target, options } = opts;
  const useMemoHandler = useMemo(() => {
    const predicate: KeyPredicate = createKeyPredicate(key);
    const handler: Handler = (handlerEvent) => {
      if (predicate(handlerEvent)) {
        return fn(handlerEvent);
      }
    };
    return handler;
  }, deps);
  useEvent(event, useMemoHandler, target, options);
};

export default useKey;
