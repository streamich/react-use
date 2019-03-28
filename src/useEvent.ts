import {useEffect} from 'react';

export interface ListenerType1 {
  addEventListener (name: string, handler: (event?: any) => void, ...args: any[]);
  removeEventListener (name: string, handler: (event?: any) => void);
}

export interface ListenerType2 {
  on (name: string, handler: (event?: any) => void, ...args: any[]);
  off (name: string, handler: (event?: any) => void);
}

export type UseEventTarget = ListenerType1 | ListenerType2;

const defaultTarget = typeof window === 'object' ? window : null;

const useEvent = (name: string, handler?: null | undefined | ((event?: any) => void), target: null | UseEventTarget = defaultTarget, options?: any) => {
  useEffect(() => {
    console.log('adding event...');
    if (!handler) return;
    if (!target) return;
    ((target as ListenerType1).addEventListener || (target as ListenerType2).on).call(target, name, handler, options);
    return () => {
      ((target as ListenerType1).removeEventListener || (target as ListenerType2).off).call(target, name, handler, options);
    };
  }, [name, handler, target, JSON.stringify(options)]);
};

export default useEvent;
