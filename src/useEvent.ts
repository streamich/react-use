import { useEffect } from 'react';
import { isClient } from './util';

export interface ListenerType1 {
  addEventListener(name: string, handler: (event?: any) => void, ...args: any[]);

  removeEventListener(name: string, handler: (event?: any) => void);
}

export interface ListenerType2 {
  on(name: string, handler: (event?: any) => void, ...args: any[]);

  off(name: string, handler: (event?: any) => void);
}

export type UseEventTarget = ListenerType1 | ListenerType2;

const defaultTarget = isClient ? window : null;

const useEvent = (
  name: string,
  handler?: null | undefined | ((event?: any) => void),
  target: null | UseEventTarget = defaultTarget,
  options?: any
) => {
  useEffect(() => {
    if (!handler) {
      return;
    }
    if (!target) {
      return;
    }
    const fn: any = (target as ListenerType1).addEventListener || (target as ListenerType2).on;
    fn.call(target, name, handler, options);
    return () => {
      const cleanFn: any = (target as ListenerType1).removeEventListener || (target as ListenerType2).off;
      cleanFn.call(target, name, handler, options);
    };
  }, [name, handler, target, JSON.stringify(options)]);
};

export default useEvent;
