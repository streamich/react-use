import {useMemo, DependencyList} from 'react';
import useEvent, {UseEventTarget} from './useEvent';

export type KeyPredicate = (event: KeyboardEvent) => boolean;
export type KeyFilter = null | undefined | string | ((event: KeyboardEvent) => boolean);
export type Handler = (event: KeyboardEvent) => void;
export interface UseKeyOptions {
  event?: 'keydown' | 'keypress' | 'keyup',
  target?: UseEventTarget,
  options?: any,
}

const noop = () => {};
const createKeyPredicate = (keyFilter: KeyFilter): KeyPredicate =>
  typeof keyFilter === 'function'
    ? keyFilter
    : typeof keyFilter === 'string'
      ? (event: KeyboardEvent) => event.key === keyFilter
      : keyFilter
        ? () => true
        : () => false;

const useKey = (key: KeyFilter, fn: Handler = noop, opts: UseKeyOptions = {}, deps: DependencyList = [key]) => {
  const {event = 'keydown', target, options} = opts;
  const handler = useMemo(() => {
    const predicate: KeyPredicate = createKeyPredicate(key);
    const handler: Handler = (event) => {
      if (predicate(event)) return fn(event);
    };
    return handler;
  }, deps);
  useEvent(event, handler, target, options);
};

export default useKey;
